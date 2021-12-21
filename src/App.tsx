import { ProblemPictures, LetterSlots } from './components';
import data from './data';
import { Problem } from './interfaces';

const problems: Problem[] = data.problems;


function App() {
  return (
    <div className="App">
      {
        problems.map((problem: Problem, index: number) => {
          const { pictures, word } = problem;
          return (
            <>
              <ProblemPictures key={index} pictures={pictures} />
              <LetterSlots word={word} />
            </>
          );
        })
      }
    </div>
  );
}

export default App;
