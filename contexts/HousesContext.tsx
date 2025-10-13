// contexts/HousesContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ImageSourcePropType } from 'react-native';

interface House {
    id: string;
    title: string;
    price: string;
    location: string;
    image?: ImageSourcePropType;
    createdAt: string;
    updatedAt: string;
    notes: string;
}

interface HousesContextType {
    houses: House[];
    addHouse: (house: Omit<House, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateHouse: (id: string, updates: Partial<House>) => void;
    deleteHouse: (id: string) => void;
    saveHouses: (houses: House[]) => void;
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
            house.id === id
                ? { ...house, ...updates, updatedAt: new Date().toISOString() }
                : house
        );
        saveHouses(updatedHouses);
    };

    const deleteHouse = (id: string) => {
        const filteredHouses = houses.filter(house => house.id !== id);
        saveHouses(filteredHouses);
    };

    return (
        <HousesContext.Provider value={{ houses, addHouse, updateHouse, deleteHouse, saveHouses }}>
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