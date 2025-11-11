// contexts/HousesContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ImageSourcePropType } from 'react-native';

interface House {
    id: string;
    title: string;
    price: string;
    location: string;
    rooms: number;
    image?: ImageSourcePropType;
    open_date: string; // it'll be an array later
    open_time: string;
    createdAt: string;
    updatedAt: string;
    notes: string;
    syncedAt?: string;
}

interface HousesContextType {
    houses: House[];
    addHouse: (house: Omit<House, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateHouse: (id: string, updates: Partial<House>) => void;
    deleteHouse: (id: string) => void;
    saveHouses: (houses: House[]) => void;
    // TODO: not sure why I don't need a "async" here. It's a promise, but it's not being awaited.
    syncToServer: () => Promise<{ success: boolean, errorMsg?: string }>
}

const HousesContext = createContext<HousesContextType | undefined>(undefined);

const HOUSES_KEY = 'houses';

export function HousesProvider({ children }: { children: React.ReactNode }) {
    const [houses, setHouses] = useState<House[]>([]);

    // Load houses on mount
    useEffect(() => {
        loadHouses();
    }, []);

    const loadHouses = async () => {
        try {
            const data = await AsyncStorage.getItem(HOUSES_KEY);
            if (data) {
                setHouses(JSON.parse(data));
            }
        } catch (error) {
            console.error('Error loading houses:', error);
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
        <HousesContext.Provider value={{ houses, addHouse, updateHouse, deleteHouse, saveHouses, syncToServer }}>
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