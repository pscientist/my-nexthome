import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Calendar() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.headerRow}>
                    <MaterialIcons name="event" size={24} color="#3A2F2F" />
                    <Text style={styles.headerTitle}>Calendar</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Upcoming</Text>
                    <Text style={styles.cardBody}>No events yet.</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#F2E9DC" },
    container: { flex: 1, padding: 24, backgroundColor: "#F2E9DC" },
    headerRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 16 },
    headerTitle: { fontSize: 22, fontWeight: "700", color: "#3A2F2F" },
    card: {
        padding: 20,
        borderRadius: 16,
        backgroundColor: "#FFF6EC",
        shadowColor: "#B79C7F",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 12,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#E0D0BD",
    },
    cardTitle: { fontSize: 18, fontWeight: "600", marginBottom: 8, color: "#47372C" },
    cardBody: { fontSize: 16, color: "#5A4A42" },
});