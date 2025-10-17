import { Stack, Text } from '@tamagui/core';
import { useState } from "react";
import { TouchableOpacity } from "react-native";

export default function Settings() {
    const [metricUnit, setMetricUnit] = useState<'sqm' | 'sqft'>('sqm');

    return (
        <Stack
            flex={1}
            backgroundColor="#FFF9F3"
            padding="$5"
            paddingTop="$15"
        >
            <Text
                fontSize="$8"
                fontWeight="bold"
                color="#765227"
                marginBottom="$8"
            >
                Settings
            </Text>

            {/* Metric Unit Section */}
            <Stack
                backgroundColor="white"
                borderRadius="$4"
                padding="$5"
                shadowColor="#B79C7F"
                shadowOpacity={0.1}
                shadowRadius={8}
                shadowOffset={{ width: 0, height: 4 }}
            >
                <Text
                    fontSize="$4"
                    fontWeight="600"
                    color="#8C6D4A"
                    marginBottom="$4"
                >
                    Area Measurement
                </Text>

                {/* Square Meters Option */}
                <TouchableOpacity onPress={() => setMetricUnit('sqm')}>
                    <Stack flexDirection="row" alignItems="center" paddingVertical="$3">
                        <Stack
                            width="$1.5"
                            height="$1.5"
                            borderRadius="$10"
                            borderWidth={2}
                            borderColor="#8C6D4A"
                            alignItems="center"
                            justifyContent="center"
                            marginRight="$3"
                        >
                            {metricUnit === 'sqm' && (
                                <Stack
                                    width="$0.75"
                                    height="$0.75"
                                    borderRadius="$10"
                                    backgroundColor="#8C6D4A"
                                />
                            )}
                        </Stack>
                        <Text fontSize="$4" color="#4A3C2B">
                            Square Meters (m²)
                        </Text>
                    </Stack>
                </TouchableOpacity>

                {/* Square Feet Option */}
                <TouchableOpacity onPress={() => setMetricUnit('sqft')}>
                    <Stack flexDirection="row" alignItems="center" paddingVertical="$3">
                        <Stack
                            width="$1.5"
                            height="$1.5"
                            borderRadius="$10"
                            borderWidth={2}
                            borderColor="#8C6D4A"
                            alignItems="center"
                            justifyContent="center"
                            marginRight="$3"
                        >
                            {metricUnit === 'sqft' && (
                                <Stack
                                    width="$0.75"
                                    height="$0.75"
                                    borderRadius="$10"
                                    backgroundColor="#8C6D4A"
                                />
                            )}
                        </Stack>
                        <Text fontSize="$4" color="#4A3C2B">
                            Square Feet (ft²)
                        </Text>
                    </Stack>
                </TouchableOpacity>
            </Stack>
        </Stack>
    );
}