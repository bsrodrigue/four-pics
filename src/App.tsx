import { useEffect, useState } from 'react';
import { ProblemContainer } from './components';
import data from './data';
import { Problem } from './interfaces';

const INITIAL_PROBLEMS: Problem[] = data.problems;
const FIRST_PROBLEM = 0;


function App() {
  const [problems, setProblems] = useState<Problem[]>(INITIAL_PROBLEMS);
  const [currentProblem, setCurrentProblem] = useState<number>(FIRST_PROBLEM);
  const [slotLetters, setSlotLetters] = useState<string[]>([]);

  useEffect(() => {
    const problem = problems[currentProblem];
    const word = problem.word;
    const array = word.split('').map(() => ' ');
    setSlotLetters(array);
  }, [currentProblem]);


  function pushLetter() {
    const letter = 'f';
    let arr = [...slotLetters];
    arr.push(letter);
    setSlotLetters(arr);
  }


  return (
    <div className="App">
      <ProblemContainer problem={problems[currentProblem]} slotLetters={slotLetters} />
      <button onClick={pushLetter}>Push</button>
    </div>
  );
}

export default App;
