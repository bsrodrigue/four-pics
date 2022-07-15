import { globalConfiguration } from './../configs/index';
import { initializeApp } from 'firebase/app';

export const app = initializeApp(globalConfiguration.firebaseConfig);
