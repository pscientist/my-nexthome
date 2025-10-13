import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from "react-native-safe-area-context";

export default function HouseDetails() {
    const router = useRouter();
    const { title = "House Title", price = "$0/mo", location = "—",
        image = require("../assets/images/open_home1.jpg") } = useLocalSearchParams();
    const region = {
        latitude: -36.8485, // Auckland latitude
        longitude: 174.7633, // Auckland longitude
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    };

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
                    <Text style={styles.title}>{String(title)}</Text>
                    <Text style={styles.price}>{String(price)}</Text>
                    <View style={styles.metaRow}>
                        <Text style={styles.metaText}>{String(location)}</Text>
                    </View>
                </View>

                <View style={styles.mapCard}>
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
});