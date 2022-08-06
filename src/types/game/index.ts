export interface Puzzle {
    word: string
    pictures: string[]
    universe: string
}

export interface LetterSlot {
    letter: string
    index: number
    selected: boolean
}

export interface GameState {
    puzzles: Array<Puzzle>
    currentLevelIndex: number
    letterSlotsState: LetterSlotsState
}

export interface LetterSlotsState {
    targetSlots: LetterSlot[]
    pickerSlots: LetterSlot[]
}
