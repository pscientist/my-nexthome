// contexts/HousesContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { MMKV } from 'react-native-mmkv';

// Create storage instance (optionally with encryption)
const storage = new MMKV({
    id: 'househunt-storage',
    // encryptionKey: 'your-encryption-key' // Optional: for sensitive data
});

interface House {
    id: string;
    title: string;
    price: string;
    location: string;
    image?: string;
    createdAt: string;
    updatedAt: string;
}

interface HousesContextType {
    houses: House[];
    addHouse: (house: Omit<House, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateHouse: (id: string, updates: Partial<House>) => void;
    deleteHouse: (id: string) => void;
}

const HousesContext = createContext<HousesContextType | undefined>(undefined);

const HOUSES_KEY = 'houses';

export function HousesProvider({ children }: { children: React.ReactNode }) {
    const [houses, setHouses] = useState<House[]>([]);

    // Load houses on mount
    useEffect(() => {
        loadHouses();
    }, []);

    const loadHouses = () => {
        try {
            const data = storage.getString(HOUSES_KEY);
            if (data) {
                setHouses(JSON.parse(data));
            }
        } catch (error) {
            console.error('Error loading houses:', error);
        }
    };

    const saveHouses = (newHouses: House[]) => {
        try {
            storage.set(HOUSES_KEY, JSON.stringify(newHouses));
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
        <HousesContext.Provider value={{ houses, addHouse, updateHouse, deleteHouse }}>
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