import { atom } from 'jotai';

const mode: 'light' | 'dark' | 'system' = 'light';
export const modeAtom = atom('light': 'light' | 'dark' | 'system');