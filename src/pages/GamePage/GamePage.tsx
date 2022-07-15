import _ from "lodash";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { ProblemContainer } from "../../components";
import { useFetchProblems } from "../../hooks/api/useFetchProblems";
import { GameSlots, Slot } from "../../interfaces";
import { insertRandomAlphabetLetters, SlotHelper } from "../../tools";
import './GamePage.css';

const FIRST_PROBLEM = 0;
const INITIAL_GAME_SLOTS: GameSlots = { targetSlots: [], pickerSlots: [] };

interface Props {
    franchise?: string;
};

export function GamePage(props: Props) {
    const { franchise } = props;
    const [currentProblemIndex, setCurrentProblemIndex] = useState<number>(FIRST_PROBLEM);
    const [gameSlots, setGameSlots] = useState<GameSlots>(INITIAL_GAME_SLOTS);
    const [result, setResult] = useState<string>('');
    const slotsAreFull = SlotHelper.slotsAreFull(gameSlots.targetSlots)

    const { problems, isLoading } = useFetchProblems(franchise);


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
                <img height={200} src='/img/dancing_2.gif' alt="success"></img>
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
                isLoading ? (
                    <div className="loading-page">
                        <img height={350} src='/img/dancing_4.gif' alt="success"></img>
                        <h1 className='loading-message'>CHARGEMENT...</h1>
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
    )

}