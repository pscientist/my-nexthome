import { useHouses } from '@/contexts/HousesContext';
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type EventsByDate = Record<string, string[]>;

type DateObject = {
    dateString: string; // e.g. "2025-10-09"
    day: number;
    month: number;
    year: number;
    timestamp: number;
};

import { Calendar } from "react-native-calendars";

export default function CalendarScreen() {
    const [selected, setSelected] = useState<string>(new Date().toISOString().slice(0, 10));
    const { houses } = useHouses();
    // Default local “events” to show how marking works (replace with your data shape later)
    const [events, setEvents] = useState<EventsByDate>({
        "2025-10-12": ["Open Home: 23 Rose St", "Viewing: 2:30 PM"],
    });

    useEffect(() => {
        if (houses.length > 0) {
            const byDate = houses.reduce<EventsByDate>((acc, house) => {
                const key = house.open_date?.slice(0, 10);
                if (!key) return acc;

                (acc[key] ||= []).push(house.title + " at " + house.location);
                return acc;
            }, {});
            setEvents(byDate);
        }

    }, [houses]);

    console.log(events);

    const onDayPress = useCallback((day: DateObject) => {
        setSelected(day.dateString);
    }, []);

    // Convert our selection + events to the markedDates shape the component expects.
    const markedDates = useMemo(() => {
        const marks: any = {};
        // mark dates that have events as small dots
        Object.keys(events).forEach((d) => {
            marks[d] = {
                ...(marks[d] || {}),
                marked: true,
                dots: [{ key: "e1" }, { key: "e2" }].slice(0, (events[d]?.length || 1)), // simple dot logic
            };
        });
        // highlight the selected date
        if (selected) {
            marks[selected] = {
                ...(marks[selected] || {}),
                selected: true,
                selectedColor: "#7C5C3B", // brand-ish brown
            };
        }
        return marks;
    }, [events, selected]);

    const addDummyEvent = useCallback(() => {
        setEvents((prev) => {
            const list = prev[selected] || [];
            const label = `Note ${list.length + 1}`;
            return { ...prev, [selected]: [...list, label] };
        });
    }, [selected]);

    const dayEvents = events[selected] || [];

    return (
        <SafeAreaView style={styles.container}>
            <Calendar
                style={styles.calendar}
                onDayPress={onDayPress}
                markedDates={markedDates}
                enableSwipeMonths
                theme={{
                    textDayFontSize: 16,
                    textMonthFontSize: 18,
                    textDayHeaderFontSize: 12,
                    todayTextColor: "#7C5C3B",
                    selectedDayBackgroundColor: "#7C5C3B",
                    arrowColor: "#7C5C3B",
                }}
                // Keep initial month stable
                initialDate={selected}
            />

            <View style={styles.panel}>
                <Text style={styles.heading}>
                    {selected} {dayEvents.length ? `• ${dayEvents.length} item(s)` : ""}
                </Text>

                <Pressable style={styles.button} onPress={addDummyEvent}>
                    <Text style={styles.buttonText}>Add a quick note to this date</Text>
                </Pressable>

                <FlatList
                    data={dayEvents}
                    keyExtractor={(item, idx) => `${item}-${idx}`}
                    contentContainerStyle={{ paddingVertical: 8 }}
                    ListEmptyComponent={<Text style={styles.empty}>No notes for this date.</Text>}
                    renderItem={({ item }) => (
                        <View style={styles.note}>
                            <Text style={styles.noteText}>{item}</Text>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    calendar: {
        // backgroundColor: "red",
        marginTop: 40,
        paddingHorizontal: 16,
        paddingVertical: 5,
    },
    panel: {
        flex: 1,
        padding: 16,
        // backgroundColor: "green",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    heading: { fontSize: 16, fontWeight: "600", color: "#3B342D" },
    button: {
        marginTop: 12,
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: "#7C5C3B",
        borderRadius: 10,
        alignSelf: "flex-start",
    },
    buttonText: { color: "#FFF", fontWeight: "600" },
    empty: { marginTop: 12, color: "#7A6E63" },
    note: {
        padding: 12,
        marginTop: 8,
        backgroundColor: "#F6EFE7",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E8DFD6",
    },
    noteText: { color: "#3B342D" },
});
