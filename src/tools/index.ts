import _ from 'lodash';
import { Slot } from '../interfaces';

export function insertRandomAlphabetLetters(count: number) {
    let arr: string[] = [];
    const alphabet = 'abcdefghijklmnopqurstuvwxyz';
    for (let i = 0; i < count; i++) {
        const randomIndex = _.random(0, alphabet.length - 1);
        arr.push(alphabet[randomIndex]);
    }
    return arr;
}

export class SlotHelper {
    public static getFirstEmptyIndex(slots: Slot[]): number {
        for (let i = 0; i < slots.length; i++) {
            if (slots[i].letter === '') {
                return i;
            }
        }
        return -1;
    }

    public static getFirstNonEmptyIndex(slots: Slot[]): number {
        for (let i = 0; i < slots.length; i++) {
            if (slots[i].letter !== '') {
                return i;
            }
        }
        return -1;
    }

    public static getLastNonEmptyIndex(slots: Slot[]): number {
        for (let i = slots.length - 1; i >= 0; i--) {
            if (slots[i].letter !== '') {
                return i;
            }
        }
        return -1;
    }

    public static slotsAreFull(slots: Slot[]) {
        let nonEmptySlots = 0;
        const slotCount = slots.length;
        for (let i = 0; i < slotCount; i++) {
            if (slots[i].letter !== '') nonEmptySlots++;
        }
        return (nonEmptySlots === slotCount);
    }

    public static toSlots(arr: string[], selected: boolean = false): Slot[] {
        const slotLetters: Slot[] = arr.map((slotLetter: string, index: number) => {
            return {
                letter: slotLetter, index, selected,
            }
        });
        return slotLetters;
    }

    public static toLetters(slots: Slot[]): string {
        let result = '';
        slots.forEach((slot: Slot) => {
            result = result.concat(slot.letter);
        })
        console.log(result);
        return result;
    }
}
