import { useEffect, useState } from 'react';
import _ from 'lodash';
import { ProblemContainer } from './components';
import data from './data';
import { GameSlots, Problem, Slot } from './interfaces';
import { insertRandomAlphabetLetters, SlotHelper } from './tools';
import { Alert, Container, Image } from 'react-bootstrap';
import './App.css'

const INITIAL_PROBLEMS: Problem[] = data.problems;
const FIRST_PROBLEM = 0;
const INITIAL_GAME_SLOTS: GameSlots = { targetSlots: [], pickerSlots: [] };

function App() {
  const [problems, setProblems] = useState<Problem[]>(INITIAL_PROBLEMS);
  const [currentProblemIndex, setCurrentProblemIndex] = useState<number>(FIRST_PROBLEM);
  const [gameSlots, setGameSlots] = useState<GameSlots>(INITIAL_GAME_SLOTS);
  const [result, setResult] = useState<string>('');


  function pushLetter(slot: Slot) {
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
    setGameSlots(newGameSlots);
  }

  function popLetter() {
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
    setGameSlots(newGameSlots);
  }


  useEffect(() => {
    const problem = problems[currentProblemIndex];
    const word = problem.word;
    const letters = word.split('');
    const emptyLetters = Array(word.length).fill('');
    const targetSlots: Slot[] = SlotHelper.toSlots(emptyLetters);
    const pickerSlots: Slot[] = SlotHelper.toSlots(_.shuffle(insertRandomAlphabetLetters(letters.length).concat(letters)));
    setGameSlots({ targetSlots, pickerSlots });
  }, [currentProblemIndex]);

  useEffect(() => {
    if (SlotHelper.slotsAreFull(gameSlots.targetSlots)) {
      const problem = problems[currentProblemIndex];
      const word = problem.word;
      const playerWord = SlotHelper.toLetters(gameSlots.targetSlots);
      if (word === playerWord) {
        setResult('yes');
      } else {
        setResult('no');
      }
    } else {
      setResult('');
    }

  }, [SlotHelper.slotsAreFull(gameSlots.targetSlots)]);


  function renderResult(result: string) {
    switch (result) {
      case 'yes':
        return (<SuccessDialog />);
      case 'no':
        return (<Alert variant='danger'>Incorrect !</Alert>);
      default:
        return (<></>)
    }
  }

  function SuccessDialog() {

    return (
      <div className='success-dialog'>
        <h1>Correct!</h1>
        <Image src={require('./img/correct.gif')}></Image>
        <button>
          Continuer
        </button>

      </div>
    );
  }

  return (
    <>
      {renderResult(result)}
      <div className='wrapper'>
        <ProblemContainer problem={problems[currentProblemIndex]} slots={gameSlots} actions={{ pushLetter, popLetter }} />
        <button className='remove' onClick={popLetter}>Annuler</button>
      </div>
    </>
  );
}

export default App;
