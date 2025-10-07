
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";

const houses = [
    { id: "1", title: "Modern Loft", price: "$2,300/mo", location: "Downtown" },
    { id: "2", title: "Cozy Bungalow", price: "$1,850/mo", location: "Maple Street" },
    { id: "3", title: "Lake House", price: "$3,100/mo", location: "Harbor Bay" },
    { id: "4", title: "Suburban Retreat", price: "$2,000/mo", location: "Cedar Grove" },
];

export default function Houses() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <FlatList
                data={houses}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={<Text style={styles.screenTitle}>Houses</Text>}
                ListHeaderComponentStyle={styles.header}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.houseTitle}>{item.title}</Text>
                        <Text style={styles.housePrice}>{item.price}</Text>
                        <Text style={styles.houseLocation}>{item.location}</Text>
                    </View>
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
        padding: 20,
        shadowColor: "#B79C7F",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#E0D0BD",
    },
    houseTitle: { fontSize: 18, fontWeight: "600", marginBottom: 8, color: "#47372C" },
    housePrice: { fontSize: 16, fontWeight: "600", color: "#C97A40", marginBottom: 6 },
    houseLocation: { fontSize: 14, color: "#7C6655", letterSpacing: 0.5, textTransform: "uppercase" },
});
