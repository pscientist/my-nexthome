// import { useAuth } from '@clerk/clerk-expo';
// import * as WebBrowser from 'expo-web-browser';
// import { useState } from 'react';
// import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// WebBrowser.maybeCompleteAuthSession();

// export default function GoogleLoginButton() {
//     const [loading, setLoading] = useState(false);
//     const { startOAuthFlow } = useAuth();

//     const handleGoogleLogin = async () => {
//         try {
//             setLoading(true);

//             const { createdSessionId, setActive } = await
//                 startOAuthFlow({ strategy: 'oauth_google' });

//             if (createdSessionId) {
//                 await setActive!({ session: createdSessionId });
//                 Alert.alert('Success', 'You are Logged in!');
//             } else {
//                 console.log('Sign in was cancelled or no session created');
//             }
//         } catch (e) {
//             console.error('oAuth error:', e);
//             Alert.alert('Error', e.message || 'Failed to login');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <TouchableOpacity
//             style={[styles.button, loading && styles.buttonDisabled]}
//             onPress={handleGoogleLogin}
//             disabled={loading}
//         >
//             {loading ? (
//                 <ActivityIndicator color="#fff" />
//             ) : (
//                 <View style={styles.buttonContent}>
//                     <Text style={styles.buttonText}>Sign in with Google</Text>
//                 </View>
//             )}
//         </TouchableOpacity>
//     );
// }

// const styles = StyleSheet.create({
//     button: {
//         backgroundColor: '#4285F4',
//         paddingVertical: 14,
//         paddingHorizontal: 24,
//         borderRadius: 8,
//         alignItems: 'center',
//         justifyContent: 'center',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 4,
//         elevation: 3,
//         minHeight: 50,
//     },
//     buttonDisabled: { opacity: 0.6 },
//     buttonContent: { flexDirection: 'row', alignItems: 'center' },
//     buttonText: { color: '#fff', fontSize: 16, fontWeight: '600', marginLeft: 8 },
// });
