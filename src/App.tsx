import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Alert, Image } from 'react-bootstrap';
import { ProblemContainer } from './components';
import { fetchProblems } from './data';
import { GameSlots, Problem, Slot } from './interfaces';
import { insertRandomAlphabetLetters, SlotHelper } from './tools';
import './App.css';

const FIRST_PROBLEM = 0;
const INITIAL_GAME_SLOTS: GameSlots = { targetSlots: [], pickerSlots: [] };

function App() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState<number>(FIRST_PROBLEM);
  const [gameSlots, setGameSlots] = useState<GameSlots>(INITIAL_GAME_SLOTS);
  const [gameIsLoading, setGameIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');
  const slotsAreFull = SlotHelper.slotsAreFull(gameSlots.targetSlots)

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
    setGameIsLoading(true)
    fetchProblems().then((problems: Problem[]) => {
      setGameIsLoading(false);
      setProblems(problems);
    });
  }, []);

  useEffect(() => {
    if (problems.length === 0) return;
    const problem = problems[currentProblemIndex];
    const word = problem.word;
    const letters = word.split('');
    const emptyLetters = Array(word.length).fill('');
    const targetSlots: Slot[] = SlotHelper.toSlots(emptyLetters);
    const pickerSlots: Slot[] = SlotHelper.toSlots(_.shuffle(insertRandomAlphabetLetters(letters.length).concat(letters)));
    setGameSlots({ targetSlots, pickerSlots });
  }, [problems, currentProblemIndex]);

  useEffect(() => {
    if (problems.length === 0) return;
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
  }, [slotsAreFull, currentProblemIndex, problems, gameSlots.targetSlots]);


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
    const isLastProblem = () => currentProblemIndex === problems.length - 1;

    function nextProblem() {
      if (isLastProblem()) {
        setCurrentProblemIndex(0);
        setResult('');
      } else {
        setCurrentProblemIndex(currentProblemIndex + 1);
        setResult('');
      }
    }


    return (
      <div className='success-dialog'>
        <h1>Correct!</h1>
        <Image src={require('./img/correct.gif')}></Image>
        <button onClick={nextProblem}>
          {
            isLastProblem() ? 'Rejouer' : 'Continuer'
          }
        </button>

      </div>
    );
  }

  return (
    <main>
      {
        gameIsLoading ? (
          <div className='loading-message'>
            <p className='message'>CHARGEMENT...</p>
            <small>Fait avec &#10084;&#65039; par BADINI Rachid Rodrigue</small>
          </div>
        ) : (
          <>
            {
              (problems.length !== 0 && (
                <>
                  {
                    result === 'yes' ? (
                      <>
                        {renderResult(result)}
                      </>
                    ) : (

                      <div className='wrapper'>
                        <ProblemContainer problem={problems[currentProblemIndex]} slots={gameSlots} actions={{ pushLetter, popLetter }} />
                        <button className='remove' onClick={popLetter}>Annuler</button>
                      </div>
                    )
                  }
                </>
              )) ||
              <p className='message'>PAS DE CONTENU...</p>
            }
          </>
        )
      }
    </main>
  );
}

export default App;
