// Environment configuration for API keys and sensitive data
// This file should be added to .gitignore to keep credentials secure

export const CONFIG = {
    EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME: "dj1sitbx0",
    EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET: "unsigned",
};

// Development vs Production configuration
export const isDevelopment = __DEV__;

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
