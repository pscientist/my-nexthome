import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Settings() {
    const [metricUnit, setMetricUnit] = useState<'sqm' | 'sqft'>('sqm');

    return (
        <View className="flex-1 bg-[#FFF9F3] p-5 pt-[60px]">
            <Text className="text-[28px] font-bold text-[#765227] mb-[30px]">
                Settings
            </Text>

            {/* Metric Unit Section */}
            <View className="bg-white rounded-xl p-5 shadow-lg shadow-[#B79C7F]/10">
                <Text className="text-base font-semibold text-[#8C6D4A] mb-4">
                    Area Measurement
                </Text>

                {/* Square Meters Option */}
                <TouchableOpacity
                    className="flex-row items-center py-3"
                    onPress={() => setMetricUnit('sqm')}
                >
                    <View className="w-6 h-6 rounded-full border-2 border-[#8C6D4A] items-center justify-center mr-3">
                        {metricUnit === 'sqm' && (
                            <View className="w-3 h-3 rounded-full bg-[#8C6D4A]" />
                        )}
                    </View>
                    <Text className="text-base text-[#4A3C2B]">
                        Square Meters (m²)
                    </Text>
                </TouchableOpacity>

                {/* Square Feet Option */}
                <TouchableOpacity
                    className="flex-row items-center py-3"
                    onPress={() => setMetricUnit('sqft')}
                >
                    <View className="w-6 h-6 rounded-full border-2 border-[#8C6D4A] items-center justify-center mr-3">
                        {metricUnit === 'sqft' && (
                            <View className="w-3 h-3 rounded-full bg-[#8C6D4A]" />
                        )}
                    </View>
                    <Text className="text-base text-[#4A3C2B]">
                        Square Feet (ft²)
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}