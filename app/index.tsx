import { useHouses } from '@/contexts/HousesContext';
import { formatDateDMY } from '@/utils/dateFormat';
import { useUser } from '@clerk/clerk-expo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useUser();
  const { houses } = useHouses();
  const nextViewing = houses.slice(0, 1);

  const displayName = user?.firstName || user?.emailAddresses[0].emailAddress;

  const clearAsyncStorage = async () => {
    Alert.alert(
      'Clear AsyncStorage',
      'Are you sure you want to clear all AsyncStorage data? This cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              Alert.alert('Success', 'AsyncStorage cleared successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear AsyncStorage');
              console.error('Error clearing AsyncStorage:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.screenTitle}>Hello {displayName}</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quick Summary</Text>

          {nextViewing.length > 0 ? (
            <View style={styles.nextViewingContainer}>
              <Text style={styles.nextViewingLabel}>Next viewing</Text>
              <Text style={styles.propertyTitle}>{nextViewing[0].title}</Text>
              <View style={styles.viewingDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Time:</Text>
                  <Text style={styles.detailValue}>{nextViewing[0].open_time}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Date:</Text>
                  <Text style={styles.detailValue}>{formatDateDMY(nextViewing[0].open_date)}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Location:</Text>
                  <Text style={styles.detailValue}>{nextViewing[0].location}</Text>
                </View>
              </View>
            </View>
          ) : (
            <Text style={styles.cardBody}>No open homes today.</Text>
          )}

          <View style={styles.statRow}>
            <View style={styles.statBlock}>
              <Text style={styles.statNumber}>{houses.length}</Text>
              <Text style={styles.statLabel}>Open Homes</Text>
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
          <Text style={styles.cardFooter}>You've got this!</Text>
        </View>

        {__DEV__ && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearAsyncStorage}
          >
            <Text style={styles.clearButtonText}>Clear AsyncStorage (Dev Only)</Text>
          </TouchableOpacity>
        )}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "700",
    color: "#3A2F2F",
  },
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
  nextViewingContainer: {
    marginBottom: 16,
  },
  nextViewingLabel: {
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: "#8C6D4A",
    fontWeight: "600",
    marginBottom: 8,
  },
  propertyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#4A2C1F",
    lineHeight: 28,
    marginBottom: 12,
  },
  viewingDetails: {
    backgroundColor: "#F9E3C7",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E8CDAA",
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 6,
    alignItems: "flex-start",
  },
  detailLabel: {
    fontSize: 14,
    color: "#7C6655",
    fontWeight: "600",
    minWidth: 70,
  },
  detailValue: {
    fontSize: 14,
    color: "#5A4A42",
    flex: 1,
    fontWeight: "500",
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
  clearButton: {
    backgroundColor: "#DC3545",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    shadowColor: "#B79C7F",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#C82333",
  },
  clearButtonText: {
    color: "#FFF6EC",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
