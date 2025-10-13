import { useHouses } from "@/contexts/HousesContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HouseDetails() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { houses, updateHouse } = useHouses();
    const [textNotes, setTextNotes] = useState("");

    const house = houses.find(h => h.id === id);

    if (!house) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <Text>House not found</Text>
            </SafeAreaView>
        );
    }

    const { title, price, location, image, notes } = house;

    useEffect(() => {
        if (house) {
            setTextNotes(house.notes || "");
        }
    }, [house]);

    const saveNotes = () => {
        updateHouse(id as string, { notes: textNotes });
        router.back();
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.headerRow}>
                    <Pressable onPress={() => router.back()} style={styles.backBtn}>
                        <MaterialIcons name="arrow-back" size={24} color="#3A2F2F" />
                    </Pressable>
                    <Text style={styles.headerTitle}>Details</Text>
                    <View style={{ width: 40 }} />
                </View>

                <View style={styles.photoBox}>
                    <Image
                        resizeMode="cover"
                        source={image}
                        style={styles.photo}
                    />
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.price}>{price}</Text>
                    <View style={styles.metaRow}>
                        <Text style={styles.metaText}>{location}</Text>
                    </View>
                </View>

                <View style={styles.notesCard}>
                    <Text style={styles.notesTitle}>Notes</Text>
                    <TextInput
                        placeholder="Enter your notes"
                        value={textNotes || ""}
                        style={styles.notesInput}
                        multiline
                        numberOfLines={4}
                        onChangeText={setTextNotes}
                    />
                </View>

                {/* <View style={styles.mapCard}>
                    <Text style={styles.mapTitle}>Location</Text>
                    <View style={styles.mapPlaceholder}>
                        <MapView
                            style={styles.map}
                            initialRegion={region}
                            showsUserLocation={false}
                            showsCompass={false}
                        >
                            <Marker
                                coordinate={{ latitude: -36.8485, longitude: 174.7633 }}
                                title="Sample Home"
                                description="123 Queen Street, Auckland"
                            />
                        </MapView>
                    </View>
                </View> */}
                <View style={styles.saveButtonContainer}>
                    <TouchableOpacity onPress={saveNotes}>
                        <Text style={styles.saveButton}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    safeArea: { flex: 1, backgroundColor: "#F2E9DC" },
    content: { padding: 24, gap: 20 },
    headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    backBtn: {
        width: 40, height: 40, borderRadius: 12, backgroundColor: "#FFF6EC",
        alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#E0D0BD"
    },
    headerTitle: { fontSize: 18, fontWeight: "700", color: "#3A2F2F" },

    photoBox: {
        height: 180,
        borderRadius: 16,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#D8C6B2",
        backgroundColor: "#E0D0BD"
    },
    photo: { width: "100%", height: "100%" },
    photoPlaceholder: {
        height: 240, borderRadius: 16, backgroundColor: "#E0D0BD",
        alignItems: "center", justifyContent: "center",
        borderWidth: 1, borderColor: "#D8C6B2"
    },

    infoCard: {
        backgroundColor: "#FFF6EC", borderRadius: 16, padding: 16,
        borderWidth: 1, borderColor: "#E0D0BD",
        shadowColor: "#B79C7F", shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12, shadowRadius: 12, elevation: 3
    },
    title: { fontSize: 22, fontWeight: "700", color: "#47372C", marginBottom: 8 },
    price: { fontSize: 18, fontWeight: "700", color: "#C97A40", marginBottom: 10 },
    metaRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    metaText: { fontSize: 16, color: "#7C6655" },

    map: {
        width: '100%',
        height: 300,
        borderRadius: 12,
    },
    mapCard: {
        backgroundColor: "#FFF6EC", borderRadius: 16, padding: 16,
        borderWidth: 1, borderColor: "#E0D0BD",
        shadowColor: "#B79C7F", shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12, shadowRadius: 12, elevation: 3, gap: 12
    },
    mapTitle: { fontSize: 16, fontWeight: "700", color: "#3A2F2F" },
    mapPlaceholder: {
        height: 300, borderRadius: 12, backgroundColor: "#E0D0BD",
        alignItems: "center", justifyContent: "center",
        borderWidth: 1, borderColor: "#D8C6B2", gap: 6, flex: 1,
    },
    mapPlaceholderText: { color: "#7C6655" },

    notesCard: {
        backgroundColor: "#FFF6EC", borderRadius: 16, padding: 16,
        borderWidth: 1, borderColor: "#E0D0BD",
        shadowColor: "#B79C7F", shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12, shadowRadius: 12, elevation: 3, gap: 12
    },
    notesTitle: { fontSize: 16, fontWeight: "700", color: "#3A2F2F" },
    notesInput: {
        backgroundColor: "#FFFBF5",
        borderRadius: 12,
        padding: 12,
        fontSize: 15,
        color: "#47372C",
        borderWidth: 1,
        borderColor: "#E0D0BD",
        minHeight: 100,
        textAlignVertical: "top"
    },
    saveButtonContainer: {
        padding: 12,
        backgroundColor: "#FFF6EC",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    saveButton: {
        fontSize: 16, fontWeight: "700", color: "#3A2F2F"
    }
});