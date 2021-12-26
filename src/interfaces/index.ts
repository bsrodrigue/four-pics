export interface Problem {
    pictures: string[];
    word: string;
};

export interface GameData {
    problems: Problem[];
};

export interface Slot {
    letter: string;
    index: number;
    selected: boolean;
}

export interface GameSlots {
    targetSlots: Slot[];
    pickerSlots: Slot[];
}

export interface SlotActions {
    pushLetter: Function;
    popLetter: Function;
}