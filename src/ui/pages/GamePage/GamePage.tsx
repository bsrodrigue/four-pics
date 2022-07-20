import { useEffect } from "react";
import useGameState from "../../../context/hooks/useGameState";
import { useFetchProblems } from "../../../hooks/api/useFetchProblems";
import { SlotHelper } from "../../../utils";
import { GameFragment } from "../../components/Fragments/GameFragment";
import './GamePage.css';

interface Props {
    franchise?: string;
};

export function GamePage({ franchise }: Props) {
    const { currentProblemIndex, gameSlots, result, setCurrentProblemIndex, setGameSlots, setResult } = useGameState();
    const { problems: puzzles, isLoading } = useFetchProblems(franchise);

    const puzzlesAreEmpty = puzzles.length === 0;
    const isLastPuzzle = () => currentProblemIndex === puzzles.length - 1;

    useEffect(() => {
        if (puzzlesAreEmpty) return;
        SlotHelper.setupCurrentPuzzle(puzzles[currentProblemIndex], setGameSlots);
    }, [puzzles, currentProblemIndex, setGameSlots, puzzlesAreEmpty]);

    useEffect(() => {
        if (puzzlesAreEmpty) return;
        if (SlotHelper.slotsAreFull(gameSlots.targetSlots)) {
            SlotHelper.checkIfResultIsCorrect(puzzles[currentProblemIndex], gameSlots.targetSlots, () => {
                setResult('yes');
            }, () => {
                setResult('no');
            })
        } else {
            setResult('');
        }
    }, [currentProblemIndex, gameSlots.targetSlots, puzzles, puzzlesAreEmpty, setResult]);

    function moveToNextPuzzle() {
        if (isLastPuzzle()) {
            setCurrentProblemIndex(0);
            setResult('');
        } else {
            setCurrentProblemIndex(currentProblemIndex + 1);
            setResult('');
        }
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
                            (!puzzlesAreEmpty && (
                                <GameFragment result={result} puzzle={puzzles[currentProblemIndex]} slots={gameSlots} isLastPuzzle={isLastPuzzle()} moveToNextPuzzle={moveToNextPuzzle} />
                            )) ||
                            <p className='message'>PAS DE CONTENU...</p>
                        }
                    </>
                )
            }
        </main>
    )
}