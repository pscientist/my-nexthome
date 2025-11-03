import { useHouses } from '@/contexts/HousesContext';
import { Link } from "expo-router";
import { useEffect } from 'react';
import { FlatList, Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const sample_houses = [
    {
        id: "1", title: "Modern Loft", price: "$799,000", location: "88 Kyber Pass Rd, Newmarket",
        image: require('@/assets/images/open_home4.jpg'),
        open_date: '2025-10-20',
        open_time: '14:00',
        createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        notes: "Love the view",
        rooms: 2
    },
    {
        id: "2", title: "Cozy Bungalow", price: "$1.1 million", location: "3 Maple Street, Freemands Bay",
        image: require('@/assets/images/open_home3.jpg'),
        open_date: '2025-10-18',
        open_time: '11:00',
        createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), notes: "Bedrooms are big!", rooms: 3
    },
    {
        id: "3", title: "Lake House", price: "$779,000", location: "33 Field Tce, Northcote",
        image: require('@/assets/images/open_home2.jpg'),
        open_date: '2025-10-16',
        open_time: '14:00',
        createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), notes: "Kitchen is quite nice. Need carpet clean.", rooms: 4
    },
    {
        id: "4", title: "Suburban Retreat", price: "$899,000", location: "189 Great North Rd, Grey Lynn",
        image: require('@/assets/images/open_home1.jpg'),
        open_date: '2025-10-21',
        open_time: '14:00',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        notes: "It's a bit too far from the city",
        rooms: 3
    },
];

export default function Houses() {
    const { houses, saveHouses } = useHouses();

    useEffect(
        () => {
            if (houses.length === 0) {
                saveHouses(sample_houses);
            }
            // saveHouses(sample_houses);
        },
        [houses.length, saveHouses]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <FlatList
                data={houses}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={<Text style={styles.screenTitle}>Houses</Text>}
                ListHeaderComponentStyle={styles.header}
                renderItem={({ item }) => (
                    <Link href={{
                        pathname: '/houses/house-details',
                        params: {
                            id: item.id,
                            title: item.title,
                            price: item.price,
                            location: item.location,
                            open_date: item.open_date,
                            open_time: item.open_time,
                            notes: item.notes
                        }
                    }} asChild
                    >
                        <Pressable style={styles.card}>
                            <View style={styles.imagePlaceholder}>
                                <Image source={item.image as ImageSourcePropType} style={styles.image} />
                            </View>
                            <View style={styles.cardContent}>
                                <Text style={styles.houseTitle}>{item.title}</Text>
                                <Text style={styles.housePrice}>{item.price}</Text>
                                <Text style={styles.houseLocation}>{item.location}</Text>
                                <Text style={styles.houseOpenDate}>{item.open_date}</Text>
                                <Text style={styles.houseOpenDate}>{item.open_time}</Text>

                            </View>
                        </Pressable>
                    </Link>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#F2E9DC" },
    listContent: { paddingHorizontal: 24, paddingBottom: 32, gap: 16 },
    header: { marginBottom: 20 },
    screenTitle: { fontSize: 28, fontWeight: "700", color: "#3A2F2F" },
    card: {
        backgroundColor: "#FFF6EC",
        borderRadius: 16,
        padding: 16,
        shadowColor: "#B79C7F",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#E0D0BD",
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    imagePlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 12,
        backgroundColor: "#E0D0BD",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 12,
    },

    imagePlaceholderText: {
        fontSize: 32,
    },
    cardContent: {
        flex: 1,
    },
    houseTitle: { fontSize: 18, fontWeight: "600", marginBottom: 8, color: "#47372C" },
    housePrice: { fontSize: 16, fontWeight: "600", color: "#C97A40", marginBottom: 6 },
    houseLocation: { fontSize: 14, color: "#7C6655", letterSpacing: 0.5, textTransform: "uppercase" },
    houseOpenDate: { fontSize: 14, color: "#7C6655", letterSpacing: 0.5, textTransform: "uppercase" },
});
