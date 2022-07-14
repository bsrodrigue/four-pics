import { Slot, GameSlots } from "../interfaces";
import { SlotHelper } from "../tools";

export function pushLetter(slot: Slot, gameSlots: GameSlots, onLetterPushed: Function) {
    let targetSlots = [...gameSlots.targetSlots];
    let pickerSlots = [...gameSlots.pickerSlots];
    const selected = true;
    const newSlotState = { ...slot, selected };
    const index: number = SlotHelper.getFirstEmptyIndex(targetSlots);
    if (index === -1) return;
    targetSlots[index] = newSlotState;
    pickerSlots[slot.index] = newSlotState;
    const newGameSlots: GameSlots = {
        targetSlots, pickerSlots,
    };
    onLetterPushed(newGameSlots);
}

export function popLetter(gameSlots: GameSlots, onLetterPopped: Function) {
    let targetSlots = [...gameSlots.targetSlots];
    let pickerSlots = [...gameSlots.pickerSlots];
    const selected = false;
    const index: number = SlotHelper.getLastNonEmptyIndex(targetSlots);
    if (index === -1) return;
    const targetSlot = targetSlots[index];
    pickerSlots[targetSlot.index] = { ...targetSlot, selected };
    targetSlots[index] = { ...targetSlot, selected, letter: '' };
    const newGameSlots: GameSlots = {
        targetSlots, pickerSlots,
    };
    onLetterPopped(newGameSlots);
}