import { useHouses } from '@/contexts/HousesContext';
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useState } from 'react';
import { FlatList, Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from "react-native-safe-area-context";

export default function Houses() {
    const { houses, syncToServer, loading, fetchError } = useHouses();
    const [isSyncing, setIsSyncing] = useState(false);
    const [serverMessage, setServerMessage] = useState('')
    const rotation = useSharedValue(0);

    // Add this to track re-renders
    console.log('🔄 Houses component re-rendered', {
        housesCount: houses.length,
        timestamp: new Date().toISOString()
    });

    useEffect(() => {
        if (isSyncing) {
            rotation.value = withRepeat(
                withTiming(360, {
                    duration: 1000,
                    easing: Easing.linear,
                }),
                -1,
                false
            );
        } else {
            rotation.value = withTiming(0, {
                duration: 200,
                easing: Easing.out(Easing.quad),
            });
        }
    }, [isSyncing]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${rotation.value}deg` }],
        };
    });

    const handleSync = async () => {

        setIsSyncing(true);

        try {
            const result = await syncToServer();

            if (result.success) {
                setServerMessage(`Successfully synced ${houses.length} houses to server.`);
                // console.log(`Successfully synced ${houses.length} houses to server.`);
            } else {
                setServerMessage('Sync failed... ' + (result.errorMsg || 'error...'));
                // console.log('Sync failed...', result.errorMsg || 'error...');
            }

        } catch (error) {
            // Alert.alert('Error', 'An unexpected error happened');
            setServerMessage('An unexpected error happened');

        } finally {
            setIsSyncing(false);
        }
    }

    const isSuccess = serverMessage.includes('Successfully');
    const isError = serverMessage.includes('failed') || serverMessage.includes('error');
    const hasFetchError = fetchError !== null && fetchError.length > 0;

    return (
        <SafeAreaView style={styles.safeArea} edges={['bottom']}>
            <FlatList
                data={houses}
                getItemLayout={(data, index) => ({
                    length: 100,
                    offset: 100 * index,
                    index,
                })}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={
                    <View>
                        <View style={styles.headerContainer}>
                            <Text style={styles.screenTitle}>Open Homes</Text>
                            <Pressable onPress={handleSync} style={styles.syncButton} disabled={isSyncing}>
                                <Animated.View style={animatedStyle}>
                                    <MaterialIcons name="sync" size={24} color="#3A2F2F" />
                                </Animated.View>
                            </Pressable>
                        </View>
                        {hasFetchError && (
                            <View style={styles.messageContainer}>
                                <MaterialIcons name="error" size={12} color="#C97A40" style={styles.messageIcon} />
                                <Text style={[styles.messageText, styles.messageTextError]}>
                                    {fetchError || ''}
                                </Text>
                            </View>
                        )}
                        {(isSyncing || serverMessage) && (
                            <View style={styles.messageContainer}>
                                {isSyncing && (
                                    <MaterialIcons name="sync" size={12} color="#7C6655" style={styles.messageIcon} />
                                )}
                                {isSuccess && !isSyncing && (
                                    <MaterialIcons name="check-circle" size={12} color="#4A7C59" style={styles.messageIcon} />
                                )}
                                {isError && !isSyncing && (
                                    <MaterialIcons name="error" size={12} color="#C97A40" style={styles.messageIcon} />
                                )}
                                <Text style={[
                                    styles.messageText,
                                    isSuccess && styles.messageTextSuccess,
                                    isError && styles.messageTextError
                                ]}>
                                    {isSyncing ? 'Syncing...' : serverMessage}
                                </Text>
                            </View>
                        )}
                    </View>
                }
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
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    screenTitle: { fontSize: 28, fontWeight: "700", color: "#3A2F2F" },
    messageContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
        marginBottom: 4,
    },
    messageIcon: {
        marginRight: 4,
    },
    messageText: {
        fontSize: 12,
        color: "#7C6655",
        fontStyle: "italic",
    },
    messageTextSuccess: {
        color: "#4A7C59",
    },
    messageTextError: {
        color: "#C97A40",
    },
    syncButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: "#FFF6EC",
        borderWidth: 1,
        borderColor: "#E0D0BD",
        shadowColor: "#B79C7F",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
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
