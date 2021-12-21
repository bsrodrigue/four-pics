import { useEffect, useState } from 'react';
import _ from 'lodash';
import { ProblemContainer } from './components';
import data from './data';
import { Problem } from './interfaces';

const INITIAL_PROBLEMS: Problem[] = data.problems;
const FIRST_PROBLEM = 0;

const style = {
  app: {
    padding: '1em',
  }
}

function App() {
  const [problems, setProblems] = useState<Problem[]>(INITIAL_PROBLEMS);
  const [currentProblemIndex, setCurrentProblemIndex] = useState<number>(FIRST_PROBLEM);
  const [slotLetters, setSlotLetters] = useState<string[]>([]);
  const [pickerLetters, setPickerLetters] = useState<any[]>([]);

  useEffect(() => {
    const problem = problems[currentProblemIndex];
    const word = problem.word;
    const letters = word.split('');
    const array = letters.map(() => ' ');
    const alphabet = 'abcdefghijklmnopqurstuvwxyz';
    let newPickerLetters = [];

    for (let i = 0; i < letters.length; i++) {
      const randomIndex = _.random(0, alphabet.length);
      newPickerLetters.push(alphabet[randomIndex]);
    }

    newPickerLetters = newPickerLetters.concat(letters);
    newPickerLetters = _.shuffle(newPickerLetters);

    setPickerLetters(newPickerLetters);
    setSlotLetters(array);
  }, [currentProblemIndex]);


  function pushLetter() {
    const letter = 'f';
    let arr = [...slotLetters];
    arr.push(letter);
    setSlotLetters(arr);
  }


  return (
    <div style={style.app}>
      <ProblemContainer problem={problems[currentProblemIndex]} slotLetters={slotLetters} pickerLetters={pickerLetters} />
      <button onClick={pushLetter}>Push</button>
    </div>
  );
}

export default App;
