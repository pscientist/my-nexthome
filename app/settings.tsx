import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Settings() {
    const [metricUnit, setMetricUnit] = useState<'sqm' | 'sqft'>('sqm');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>

            {/* Metric Unit Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Area Measurement</Text>

                {/* Square Meters Option */}
                <TouchableOpacity
                    style={styles.radioOption}
                    onPress={() => setMetricUnit('sqm')}
                >
                    <View style={styles.radioButton}>
                        {metricUnit === 'sqm' && (
                            <View style={styles.radioButtonInner} />
                        )}
                    </View>
                    <Text style={styles.radioLabel}>Square Meters (m²)</Text>
                </TouchableOpacity>

                {/* Square Feet Option */}
                <TouchableOpacity
                    style={styles.radioOption}
                    onPress={() => setMetricUnit('sqft')}
                >
                    <View style={styles.radioButton}>
                        {metricUnit === 'sqft' && (
                            <View style={styles.radioButtonInner} />
                        )}
                    </View>
                    <Text style={styles.radioLabel}>Square Feet (ft²)</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF9F3",
        padding: 20,
        paddingTop: 60,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#765227",
        marginBottom: 30,
    },
    section: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 20,
        shadowColor: "#B79C7F",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#8C6D4A",
        marginBottom: 16,
    },
    radioOption: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
    },
    radioButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#8C6D4A",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    radioButtonInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#8C6D4A",
    },
    radioLabel: {
        fontSize: 16,
        color: "#4A3C2B",
    },
});

