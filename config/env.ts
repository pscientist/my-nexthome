// Environment configuration for API keys and sensitive data
// This file should be added to .gitignore to keep credentials secure

import { Platform } from 'react-native';

export const CONFIG = {
    EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME: "dj1sitbx0",
    EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET: "unsigned",
    EXPO_PUBLIC_SUPABASE_URL: "https://yrgozmtnlhqcavgjxyam.supabase.co",
    EXPO_PUBLIC_SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyZ296bXRubGhxY2F2Z2p4eWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNDAzODYsImV4cCI6MjA3OTkxNjM4Nn0.p9wgIzGOcpQg5EE9b_gL45kXI45pSMTKz3SXl0bry2Y",
    EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_test_dmFzdC13aGFsZS05NS5jbGVyay5hY2NvdW50cy5kZXYk"
};

// Development vs Production configuration
export const isDevelopment = __DEV__;

// Get API base URL based on platform
// - iOS Simulator: localhost works
// - Android Emulator: use 10.0.2.2 (special IP that maps to host machine)
// - Physical devices: use your computer's local IP address (e.g., 192.168.x.x)
export const getApiBaseUrl = (): string => {
    if (isDevelopment) {
        // For Android emulator, use 10.0.2.2 instead of localhost
        if (Platform.OS === 'android') {
            return 'http://10.0.2.2:4000';
        }
        // For iOS simulator, localhost works
        return 'http://localhost:4000';
        // return 'http://192.168.1.141:4000';
    }
    // Production URL - update this with your production API URL
    return 'http://192.168.1.141:4000';
};

// You can also use environment-specific configs
export const getConfig = () => {
    if (isDevelopment) {
        return {
            ...CONFIG,
            // Override with development-specific values if needed
            // GOOGLE_API_KEY: 'dev_key_here',
        };
    }

    return CONFIG;
};

export default CONFIG;
