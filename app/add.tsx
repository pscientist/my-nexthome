import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';

// Storage key
const LISTINGS_STORAGE_KEY = '@househunt_listings';

// Types
interface ListingFormValues {
    title: string;
    location: string;
    priceRange: string;
    rooms: string;
    notes: string;
}

interface StoredListing extends ListingFormValues {
    id: string;
    createdAt: string;
    updatedAt: string;
    synced: boolean;
}

// Validation schema
const listingValidationSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, 'Title must be at least 3 characters')
        .required('Title is required'),
    location: Yup.string()
        .min(3, 'Location must be at least 3 characters')
        .required('Location is required'),
    priceRange: Yup.string()
        .required('Price range is required'),
    rooms: Yup.string()
        .matches(/^[0-9]+$/, 'Must be a valid number')
        .required('Number of rooms is required'),
    notes: Yup.string()
});

export default function Add() {
    const [isConnected, setIsConnected] = useState<boolean | null>(null);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
            console.log('Network state changed:', state.isConnected);
            console.log('Network type:', state.type);
        });

        return () => unsubscribe();
    }, []
    );


    const initialValues: ListingFormValues = {
        title: '',
        location: '',
        priceRange: '',
        rooms: '',
        notes: '',
    };

    const handleSubmit = async (values: ListingFormValues, { resetForm }: any) => {
        try {
            // Create a new listing with metadata
            const newListing: StoredListing = {
                ...values,
                id: Date.now().toString(), // Simple ID generation
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                synced: false, // Not yet synced to server
            };

            // Get existing listings from AsyncStorage
            const existingData = await AsyncStorage.getItem(LISTINGS_STORAGE_KEY);
            const listings: StoredListing[] = existingData ? JSON.parse(existingData) : [];

            // Add new listing to the array
            listings.push(newListing);

            // Save back to AsyncStorage
            await AsyncStorage.setItem(LISTINGS_STORAGE_KEY, JSON.stringify(listings));

            console.log('Listing saved successfully:', newListing);

            // Show success message
            Alert.alert(
                'Success',
                'Listing saved locally! It will be synced to the server later.',
                [{ text: 'OK' }]
            );

            // Reset the form
            resetForm();
        } catch (error) {
            console.error('Error saving listing:', error);
            Alert.alert(
                'Error',
                'Failed to save listing. Please try again.',
                [{ text: 'OK' }]
            );
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Formik
                initialValues={initialValues}
                validationSchema={listingValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                    <ScrollView contentContainerStyle={styles.content}
                        showsVerticalScrollIndicator={false}>
                        <Text style={styles.screenTitle}>Add / Edit Listing</Text>

                        <View style={styles.formCard}>
                            <View style={styles.fieldGroup}>
                                <Text style={styles.label}>Title</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. Charming Loft in Downtown"
                                    placeholderTextColor="#B79C7F"
                                    onChangeText={handleChange('title')}
                                    onBlur={handleBlur('title')}
                                    value={values.title}
                                />
                                {touched.title && errors.title && (
                                    <Text style={styles.errorText}>{errors.title}</Text>
                                )}
                            </View>

                            <View style={styles.fieldGroup}>
                                <Text style={styles.label}>Location</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. 42 Maple Street"
                                    placeholderTextColor="#B79C7F"
                                    onChangeText={handleChange('location')}
                                    onBlur={handleBlur('location')}
                                    value={values.location}
                                />
                                {touched.location && errors.location && (
                                    <Text style={styles.errorText}>{errors.location}</Text>
                                )}
                            </View>

                            <View style={styles.fieldGroup}>
                                <Text style={styles.label}>Price Range</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. $1,800 - $2,200"
                                    placeholderTextColor="#B79C7F"
                                    onChangeText={handleChange('priceRange')}
                                    onBlur={handleBlur('priceRange')}
                                    value={values.priceRange}
                                />
                                {touched.priceRange && errors.priceRange && (
                                    <Text style={styles.errorText}>{errors.priceRange}</Text>
                                )}
                            </View>

                            <View style={styles.fieldGroup}>
                                <Text style={styles.label}>Number of Rooms</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. 3"
                                    placeholderTextColor="#B79C7F"
                                    keyboardType="numeric"
                                    onChangeText={handleChange('rooms')}
                                    onBlur={handleBlur('rooms')}
                                    value={values.rooms}
                                />
                                {touched.rooms && errors.rooms && (
                                    <Text style={styles.errorText}>{errors.rooms}</Text>
                                )}
                            </View>

                            <View style={styles.fieldGroup}>
                                <View style={styles.fieldHeader}>
                                    <Text style={styles.label}>Images</Text>
                                    <Pressable style={styles.uploadButton} onPress={() => { }}>
                                        <Text style={styles.uploadButtonText}>Upload Image</Text>
                                    </Pressable>
                                </View>
                                <View style={styles.imageGrid}>
                                    <View style={styles.imagePlaceholder}>
                                        <Text style={styles.imagePlaceholderText}>Image 1</Text>
                                    </View>
                                    <View style={styles.imagePlaceholder}>
                                        <Text style={styles.imagePlaceholderText}>Image 2</Text>
                                    </View>
                                    <View style={styles.imagePlaceholder}>
                                        <Text style={styles.imagePlaceholderText}>Image 3</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.fieldGroup}>
                                <Text style={styles.label}>Notes</Text>
                                <TextInput
                                    style={[styles.input, styles.notesInput]}
                                    placeholder="Add viewing notes, highlights, or questions"
                                    placeholderTextColor="#B79C7F"
                                    multiline
                                    textAlignVertical="top"
                                    onChangeText={handleChange('notes')}
                                    onBlur={handleBlur('notes')}
                                    value={values.notes}
                                />
                                {touched.notes && errors.notes && (
                                    <Text style={styles.errorText}>{errors.notes}</Text>
                                )}
                            </View>

                            <Pressable style={styles.submitButton} onPress={() => handleSubmit()}>
                                <Text style={styles.submitButtonText}>Save Listing</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                )}
            </Formik>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F2E9DC",
    },
    content: {
        padding: 24,
        gap: 20,
    },
    screenTitle: {
        fontSize: 28,
        fontWeight: "700",
        color: "#3A2F2F",
    },
    formCard: {
        backgroundColor: "#FFF6EC",
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E0D0BD",
        shadowColor: "#B79C7F",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 3,
        gap: 20,
    },
    fieldGroup: {
        gap: 8,
    },
    fieldHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
    },
    label: {
        fontSize: 15,
        fontWeight: "600",
        color: "#4A3B31",
        letterSpacing: 0.5,
        textTransform: "uppercase",
    },
    uploadButton: {
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 999,
        backgroundColor: "#D8A05E",
        borderWidth: 1,
        borderColor: "#C28949",
    },
    uploadButtonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#3A2F2F",
        letterSpacing: 0.5,
        textTransform: "uppercase",
    },
    imageGrid: {
        flexDirection: "row",
        gap: 12,
    },
    imagePlaceholder: {
        flex: 1,
        aspectRatio: 1,
        borderRadius: 16,
        borderWidth: 2,
        borderStyle: "dashed",
        borderColor: "#D8A05E",
        backgroundColor: "#FFF1E1",
        alignItems: "center",
        justifyContent: "center",
    },
    imagePlaceholderText: {
        fontSize: 14,
        color: "#B07945",
        fontWeight: "500",
    },
    input: {
        backgroundColor: "#FFF1E1",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E8CDAA",
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontSize: 16,
        color: "#47372C",
    },
    notesInput: {
        minHeight: 120,
        lineHeight: 22,
    },
    errorText: {
        color: '#D32F2F',
        fontSize: 13,
        marginTop: 4,
        fontWeight: '500',
    },
    submitButton: {
        backgroundColor: "#D8A05E",
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderWidth: 1,
        borderColor: "#C28949",
        alignItems: 'center',
        marginTop: 8,
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#3A2F2F",
        letterSpacing: 0.5,
        textTransform: "uppercase",
    },
});

