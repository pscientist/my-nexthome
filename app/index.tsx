import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.screenTitle}>Dashboard</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quick Summary</Text>
          <Text style={styles.cardSubtitle}>Today at a glance</Text>
          <Text style={styles.cardBody}>Next viewing tomorrow at 3:30 PM on Maple Street.</Text>

          <View style={styles.statRow}>
            <View style={styles.statBlock}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Shortlisted</Text>
            </View>
            <View style={styles.statBlock}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Follow-ups</Text>
            </View>
          </View>
        </View>

        <View style={[styles.card, styles.noteCard]}>
          <Text style={styles.cardTitle}>Personal Note</Text>
          <Text style={[styles.cardBody, styles.noteBody]}>
            Walk through each room and note how natural light changes—your future mornings will
            thank you.
          </Text>
          <Text style={styles.cardFooter}>You’ve got this!</Text>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  syncButton: {
    backgroundColor: "#C97A40",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    shadowColor: "#B79C7F",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#B86A30",
    minHeight: 52,
  },
  syncButtonDisabled: {
    opacity: 0.6,
  },
  syncButtonText: {
    color: "#FFF6EC",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#F2E9DC",
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F2E9DC",
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
    color: "#3A2F2F",
  },
  card: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#FFF6EC",
    marginBottom: 16,
    shadowColor: "#B79C7F",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E0D0BD",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#47372C",
  },
  cardSubtitle: {
    fontSize: 14,
    letterSpacing: 1.1,
    textTransform: "uppercase",
    marginBottom: 12,
    color: "#A27C55",
  },
  cardBody: {
    fontSize: 16,
    lineHeight: 22,
    color: "#5A4A42",
    marginBottom: 12,
  },
  statRow: {
    flexDirection: "row",
    gap: 16,
  },
  statBlock: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#F9E3C7",
    borderWidth: 1,
    borderColor: "#E8CDAA",
    alignItems: "center",
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: "#4A3B31",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    letterSpacing: 0.5,
    color: "#7C6655",
    textTransform: "uppercase",
  },
  noteCard: {
    backgroundColor: "#FFF1E1",
    borderLeftWidth: 4,
    borderLeftColor: "#D8A05E",
  },
  noteBody: {
    fontStyle: "italic",
    marginBottom: 8,
  },
  cardFooter: {
    fontSize: 14,
    color: "#8C6D4A",
    fontWeight: "500",
  },
});
