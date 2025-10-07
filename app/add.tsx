import { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import RNPickerSelect from 'react-native-picker-select';

export default function Add() {
    const [selectedRooms, setSelectedRooms] = useState<string>("");

    const roomOptions = [
        { label: '1 Room', value: 1 },
        { label: '2 Rooms', value: 2 },
        { label: '3 Rooms', value: 3 },
        { label: '4 Rooms', value: 4 },
        { label: '5 Rooms', value: 5 },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.screenTitle}>Add / Edit Listing</Text>

                <View style={styles.formCard}>
                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Title</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. Charming Loft in Downtown"
                            placeholderTextColor="#B79C7F"
                        />
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Location</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. 42 Maple Street"
                            placeholderTextColor="#B79C7F"
                        />
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Price Range</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. $1,800 - $2,200"
                            placeholderTextColor="#B79C7F"
                        />
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Number of Rooms</Text>
                        <View style={styles.pickerWrapper}>
                            <RNPickerSelect
                                onValueChange={(value) => setSelectedRooms(value)}
                                items={roomOptions}
                                placeholder={{
                                    label: 'Select...',
                                    value: null,
                                    color: '#9EA0A4',
                                }}
                                style={pickerSelectStyles}
                                value={selectedRooms}
                            />
                        </View>
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
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});


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
    pickerWrapper: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E8CDAA",
        backgroundColor: "#FFF1E1",
        overflow: "hidden",
    },
    picker: {
        height: 52,
        color: "#47372C",
    },
    notesInput: {
        minHeight: 120,
        lineHeight: 22,
    },
});

