import type { ReactNode } from 'react';
import '@testing-library/jest-native/extend-expect';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(() => jest.fn()),
  fetch: jest.fn(() => Promise.resolve({ isConnected: true })),
}));

jest.mock('react-native-safe-area-context', () => {
  const { View } = require('react-native');
  const SafeAreaProvider = ({ children }: { children: ReactNode }) => children;

  return {
    SafeAreaProvider,
    SafeAreaView: View,
    SafeAreaInsetsContext: {
      Consumer: ({ children }: { children: (insets: any) => ReactNode }) =>
        children({ top: 0, right: 0, bottom: 0, left: 0 }),
      Provider: SafeAreaProvider,
    },
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  };
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
