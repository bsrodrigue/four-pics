import _ from 'lodash'
import { LetterSlot, LetterSlotsState, Puzzle } from '../types'
import { insertRandomAlphabetLetters } from './insertRandomAlphabetLetters'

export class SlotHelper {
  public static getFirstEmptyIndex(slots: LetterSlot[]): number {
    for (let i = 0; i < slots.length; i++) {
      if (slots[i].letter === '') {
        return i
      }
    }
    return -1
  }

  public static getFirstNonEmptyIndex(slots: LetterSlot[]): number {
    for (let i = 0; i < slots.length; i++) {
      if (slots[i].letter !== '') {
        return i
      }
    }
    return -1
  }

  public static getLastNonEmptyIndex(slots: LetterSlot[]): number {
    for (let i = slots.length - 1; i >= 0; i--) {
      if (slots[i].letter !== '') {
        return i
      }
    }
    return -1
  }

  public static slotsAreFull(slots: LetterSlot[]) {
    let nonEmptySlots = 0
    const slotCount = slots.length
    for (let i = 0; i < slotCount; i++) {
      if (slots[i].letter !== '') nonEmptySlots++
    }
    return nonEmptySlots === slotCount
  }

  public static toSlots(arr: string[], selected = false): LetterSlot[] {
    const slotLetters: LetterSlot[] = arr.map((slotLetter: string, index: number) => ({
      letter: slotLetter,
      index,
      selected,
    }))
    return slotLetters
  }

  public static toLetters(slots: LetterSlot[]): string {
    let result = ''
    slots.forEach((slot: LetterSlot) => {
      result = result.concat(slot.letter)
    })
    return result
  }

  public static pushLetter(
    gameSlots: LetterSlotsState,
    slot: LetterSlot,
    onLetterPushed: (newGameSlots: LetterSlotsState) => void,
  ) {
    const targetSlots = [...gameSlots.targetSlots]
    const pickerSlots = [...gameSlots.pickerSlots]
    const selected = true
    const newSlotState = { ...slot, selected }
    const index: number = SlotHelper.getFirstEmptyIndex(targetSlots)
    if (index === -1) return
    targetSlots[index] = newSlotState
    pickerSlots[slot.index] = newSlotState
    const newGameSlots: LetterSlotsState = {
      targetSlots,
      pickerSlots,
    }
    onLetterPushed(newGameSlots)
  }

  public static popLetter(
    gameSlots: LetterSlotsState,
    onLetterPushed: (newGameSlots: LetterSlotsState) => void,
  ) {
    const targetSlots = [...gameSlots.targetSlots]
    const pickerSlots = [...gameSlots.pickerSlots]
    const selected = false
    const index: number = SlotHelper.getLastNonEmptyIndex(targetSlots)
    if (index === -1) return
    const targetSlot = targetSlots[index]
    pickerSlots[targetSlot.index] = { ...targetSlot, selected }
    targetSlots[index] = { ...targetSlot, selected, letter: '' }
    const newGameSlots: LetterSlotsState = {
      targetSlots,
      pickerSlots,
    }
    onLetterPushed(newGameSlots)
  }

  public static setupCurrentPuzzle(puzzle: Puzzle, onPuzzleSetup: Function) {
    const { word } = puzzle
    const letters = word.split('')
    const emptyLetters = Array(word.length).fill('')
    const targetSlots: LetterSlot[] = SlotHelper.toSlots(emptyLetters)
    const pickerSlots: LetterSlot[] = SlotHelper.toSlots(
      _.shuffle(insertRandomAlphabetLetters(letters.length).concat(letters)),
    )
    onPuzzleSetup({ targetSlots, pickerSlots })
  }

  public static checkIfResultIsCorrect(
    puzzle: Puzzle,
    targetSlots: Array<LetterSlot>,
    onCorrect: Function,
    onIncorrect: Function,
  ) {
    const { word } = puzzle
    const playerWord = SlotHelper.toLetters(targetSlots)
    if (word === playerWord) {
      onCorrect()
    } else {
      onIncorrect()
    }
  }
}
