import { LetterSlot } from "../types";

export class SlotHelper {
    public static getFirstEmptyIndex(slots: LetterSlot[]): number {
        for (let i = 0; i < slots.length; i++) {
            if (slots[i].letter === '') {
                return i;
            }
        }
        return -1;
    }

    public static getFirstNonEmptyIndex(slots: LetterSlot[]): number {
        for (let i = 0; i < slots.length; i++) {
            if (slots[i].letter !== '') {
                return i;
            }
        }
        return -1;
    }

    public static getLastNonEmptyIndex(slots: LetterSlot[]): number {
        for (let i = slots.length - 1; i >= 0; i--) {
            if (slots[i].letter !== '') {
                return i;
            }
        }
        return -1;
    }

    public static slotsAreFull(slots: LetterSlot[]) {
        let nonEmptySlots = 0;
        const slotCount = slots.length;
        for (let i = 0; i < slotCount; i++) {
            if (slots[i].letter !== '') nonEmptySlots++;
        }
        return (nonEmptySlots === slotCount);
    }

    public static toSlots(arr: string[], selected: boolean = false): LetterSlot[] {
        const slotLetters: LetterSlot[] = arr.map((slotLetter: string, index: number) => {
            return {
                letter: slotLetter, index, selected,
            }
        });
        return slotLetters;
    }

    public static toLetters(slots: LetterSlot[]): string {
        let result = '';
        slots.forEach((slot: LetterSlot) => {
            result = result.concat(slot.letter);
        })
        return result;
    }
}