/// <reference types="reactotron-react-native" />

import Reactotron from 'reactotron-react-native';

declare global {
    interface Console {
        tron: typeof Reactotron;
    }

    var __DEV__: boolean;
}

export { };

