// contexts/HousesContext.tsx
import { getApiBaseUrl } from '@/config/env';
import { ApiHouse, House } from '@/types/house';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface HousesContextType {
    houses: House[];
    loading: boolean;
    fetchError: string | null;
    addHouse: (house: Omit<House, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateHouse: (id: string, updates: Partial<House>) => void;
    deleteHouse: (id: string) => void;
    saveHouses: (houses: House[]) => void;
    // TODO: not sure why I don't need a "async" here. It's a promise, but it's not being awaited.
    syncToServer: () => Promise<{ success: boolean, errorMsg?: string }>
}

const HousesContext = createContext<HousesContextType | undefined>(undefined);

const HOUSES_KEY = 'houses';
const API_URL = `${getApiBaseUrl()}/api/open-homes`;

export function HousesProvider({ children }: { children: React.ReactNode }) {
    const [houses, setHouses] = useState<House[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [loadingFrmServer, setLoadingFrmServer] = useState(false);
    const prevConnectedRef = useRef<boolean | null>(null);

    // Load houses on mount
    useEffect(() => {
        loadHouses();
    }, []);

    // Network detection and auto-sync when network becomes available
    useEffect(() => {
        // Get initial network state
        NetInfo.fetch().then(state => {
            prevConnectedRef.current = state.isConnected;
        });

        const unsubscribe = NetInfo.addEventListener(state => {
            const wasConnected = prevConnectedRef.current;
            const isNowConnected = state.isConnected;

            console.log('Network state changed:', isNowConnected);
            console.log('Network type:', state.type);

            // Sync when network becomes available (transition from disconnected to connected)
            if (!wasConnected && isNowConnected) {
                console.log('Network reconnected, syncing notes and houses...');
                syncToServer().then(result => {
                    if (result.success) {
                        console.log('Notes and houses synced successfully after reconnection');
                    } else {
                        console.error('Failed to sync after reconnection:', result.errorMsg);
                    }
                }).catch(error => {
                    console.error('Error syncing after reconnection:', error);
                });
            }

            prevConnectedRef.current = isNowConnected;
        });

        return () => unsubscribe();
    }, []); // Empty deps - listener created once

    // Transform API data to House format
    const transformHousesFunc = (apiHouses: ApiHouse[]) => {

        // Transform API data to House format
        return apiHouses.map((apiHouse) => {
            // Parse openHomeTime ISO string
            const openHomeDate = new Date(apiHouse.openHomeTime);

            // console.log(apiHouse);
            console.log(openHomeDate);

            // Check if date is valid
            let open_date: string;
            let open_time: string;

            if (isNaN(openHomeDate.getTime())) {
                console.warn(`Invalid date for house ${apiHouse.id}: ${apiHouse.openHomeTime}`);
                // Use current date/time as fallback
                const fallbackDate = new Date();
                open_date = fallbackDate.toISOString().split('T')[0]; // YYYY-MM-DD
                const hours = fallbackDate.getHours().toString().padStart(2, '0');
                const minutes = fallbackDate.getMinutes().toString().padStart(2, '0');
                open_time = `${hours}:${minutes}`; // HH:MM
            } else {
                open_date = openHomeDate.toISOString().split('T')[0]; // YYYY-MM-DD
                const hours = openHomeDate.getHours().toString().padStart(2, '0');
                const minutes = openHomeDate.getMinutes().toString().padStart(2, '0');
                open_time = `${hours}:${minutes}`; // HH:MM
            }

            const now = new Date().toISOString();

            return {
                id: apiHouse.id.toString(),
                title: apiHouse.title,
                location: apiHouse.location,
                rooms: apiHouse.bedrooms,
                price: apiHouse.price,
                notes: "", // Default empty, will be merged with local notes
                image: { uri: apiHouse.pictureHref },
                open_date: open_date,  // YYYY-MM-DD
                open_time: open_time,  // HH:MM
                createdAt: now,
                updatedAt: now,
            };
        });

    }; // end function transformHousesFunc

    const loadHouses = async () => {
        setLoading(true);
        setFetchError(null);

        console.log('Loading houses locally...');

        let localHouses: House[] = [];

        try {
            const data = await AsyncStorage.getItem(HOUSES_KEY);

            // Local first
            if (data) {
                try {
                    console.log('Local data found. Parsing houses from storage...');
                    localHouses = JSON.parse(data);
                    setHouses(localHouses);
                    setLoading(false);

                } catch (parseError) {
                    console.error('Error parsing houses from storage:', parseError);
                }
            }

        } catch (storageError) {
            console.error('Error loading houses from storage:', storageError);

        } finally {
            setLoading(false);
        }

        // Then, always fetch from server in the background to get fresh data
        try {
            // Fetch from server
            setLoadingFrmServer(true);
            console.log('Fetching houses from server...');

            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error(`Failed to fetch houses: ${response.status}`);
            }

            const apiHouses: ApiHouse[] = await response.json();

            const transformedHouses = transformHousesFunc(apiHouses);

            // Merge notes from local houses into transformed houses
            const mergedHouses = transformedHouses.map(transformedHouse => {
                const localHouse = localHouses.find(lh => lh.id === transformedHouse.id);
                return {
                    ...transformedHouse,
                    notes: localHouse?.notes || transformedHouse.notes || ""
                };
            });

            await saveHouses(mergedHouses);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch houses';
            setFetchError(errorMessage);
            console.error('Error fetching houses from server:', error);

        } finally {
            setLoadingFrmServer(false);
            setLoading(false);

        }
    };

    const saveHouses = async (newHouses: House[]) => {
        try {
            await AsyncStorage.setItem(HOUSES_KEY, JSON.stringify(newHouses));
            setHouses(newHouses);
        } catch (error) {
            console.error('Error saving houses:', error);
        }
    };

    const addHouse = (houseData: Omit<House, 'id' | 'createdAt' | 'updatedAt'>) => {
        const newHouse: House = {
            ...houseData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        saveHouses([...houses, newHouse]);
    };

    const updateHouse = (id: string, updates: Partial<House>) => {
        const updatedHouses = houses.map(house =>
            String(house.id) === String(id)
                ? { ...house, ...updates, updatedAt: new Date().toISOString() }
                : house
        );
        saveHouses(updatedHouses);
    };

    const deleteHouse = (id: string) => {
        const filteredHouses = houses.filter(house => house.id !== id);
        saveHouses(filteredHouses);
    };

    const syncToServer = async (): Promise<{ success: boolean, errorMsg?: string }> => {

        // find the houses with no sync time or was updated    
        const housesToSync = houses.filter((house) => {
            return !house.syncedAt || new Date(house.updatedAt) > new Date(house.syncedAt);
        });

        // get the IDs
        const housesToSyncIDs = housesToSync.map((h) => h.id);

        if (housesToSync.length === 0) {
            return { success: true }; // auto-wrapped in Promise
        }

        try {
            const DUMMY_URL = "https://dummyjson.com/posts";

            const response = await fetch(DUMMY_URL,
                {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'POST',
                    body: JSON.stringify(housesToSync)
                }
            );

            if (!response.ok) {
                throw new Error(`Server response ${response.status}`);
            }

            // update the houses array with new synced timesamp
            const updatedHouses = houses.map((house) => {
                const wasSynced = housesToSyncIDs.some(id => id === house.id);
                if (wasSynced) {
                    return { ...house, syncedAt: new Date().toISOString() }
                }
                return house;
            });

            await saveHouses(updatedHouses);

            console.log(`${housesToSyncIDs.length} houses synced`);

            return { success: true };

        } catch (e) {

            return { success: false, errorMsg: e instanceof Error ? e.message : 'Unknown error' }

        }
    };

    return (
        <HousesContext.Provider value={{ houses, loading, fetchError, addHouse, updateHouse, deleteHouse, saveHouses, syncToServer }}>
            {children}
        </HousesContext.Provider>
    );
}

export function useHouses() {
    const context = useContext(HousesContext);
    if (!context) {
        throw new Error('useHouses must be used within HousesProvider');
    }
    return context;
}