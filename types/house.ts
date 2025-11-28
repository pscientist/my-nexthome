import { ImageSourcePropType } from 'react-native';

export interface House {
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

export interface ApiHouse {
    id: number;
    title: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    openHomeTime: string;
    price: string;
    listingId: number;
    pictureHref: string;
}

