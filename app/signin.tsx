import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { useRouter } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import React from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

WebBrowser.maybeCompleteAuthSession()

export default function SignIn() {
    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
    const router = useRouter()
    const [loading, setLoading] = React.useState(false)

    const onGoogleSignInPress = async () => {
        try {
            setLoading(true)

            // Create the redirect URL based on your scheme
            const redirectUrl = Linking.createURL('/oauth-native-callback')

            const { createdSessionId, setActive } = await startOAuthFlow({
                redirectUrl
            })

            if (createdSessionId) {
                await setActive!({ session: createdSessionId })
                router.replace('/')
            } else {
                console.log('Sign in was cancelled or no session created')
            }
        } catch (err) {
            console.error('OAuth error:', JSON.stringify(err, null, 2))
        } finally {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.screenTitle}>Sign In</Text>

                <View style={styles.formCard}>
                    <Text style={styles.welcomeText}>
                        Welcome! Sign in with your Google account to continue.
                    </Text>

                    <TouchableOpacity
                        style={[styles.googleButton, loading && styles.googleButtonDisabled]}
                        onPress={onGoogleSignInPress}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#3A2F2F" />
                        ) : (
                            <Text style={styles.googleButtonText}>Sign in with Google</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
    formCard: {
        backgroundColor: "#FFF6EC",
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E0D0BD",
        shadowColor: "#B79C7F",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 3,
        gap: 20,
    },
    welcomeText: {
        fontSize: 16,
        color: "#4A3B31",
        textAlign: "center",
        lineHeight: 24,
    },
    googleButton: {
        backgroundColor: "#D8A05E",
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderWidth: 1,
        borderColor: "#C28949",
        alignItems: 'center',
        marginTop: 8,
        minHeight: 56,
        justifyContent: 'center',
    },
    googleButtonDisabled: {
        opacity: 0.6,
    },
    googleButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#3A2F2F",
        letterSpacing: 0.5,
        textTransform: "uppercase",
    },
});