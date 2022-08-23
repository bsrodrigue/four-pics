import { useEffect } from 'react'
import useGameState from '../../../context/hooks/useGameState'
import { useFetchProblems } from '../../../hooks/api/useFetchProblems'
import { SlotHelper } from '../../../utils'
import { LoadingDialog } from '../../components'
import { GameFragment } from '../../components/Fragments/GameFragment'
import './GamePage.css'

interface Props {
  franchise?: string
}

export function GamePage({ franchise }: Props) {
  const {
    currentProblemIndex,
    gameSlots,
    result,
    setCurrentProblemIndex,
    setGameSlots,
    setResult,
  } = useGameState()
  const { problems: puzzles, isLoading } = useFetchProblems(franchise)

  const puzzlesAreEmpty = puzzles.length === 0

  function isLastPuzzle() {
    return currentProblemIndex === (puzzles.length - 1);
  }

  useEffect(() => {
    if (puzzlesAreEmpty) return
    SlotHelper.setupCurrentPuzzle(puzzles[currentProblemIndex], setGameSlots)
  }, [puzzles, currentProblemIndex, setGameSlots, puzzlesAreEmpty])

  useEffect(() => {
    if (puzzlesAreEmpty) return
    if (SlotHelper.slotsAreFull(gameSlots.targetSlots)) {
      SlotHelper.checkIfResultIsCorrect(
        puzzles[currentProblemIndex],
        gameSlots.targetSlots,
        () => {
          setResult('yes')
        },
        () => {
          setResult('no')
        },
      )
    } else {
      setResult('')
    }
  }, [currentProblemIndex, gameSlots.targetSlots, puzzles, puzzlesAreEmpty, setResult])

  function moveToNextPuzzle() {
    if (isLastPuzzle()) {
      setCurrentProblemIndex(0)
      setResult('')
    } else {
      setCurrentProblemIndex(currentProblemIndex + 1)
      setResult('')
    }
  }

  return (
    <main>
      {isLoading ? (
        <LoadingDialog />
      ) : (
        <>
          {(!puzzlesAreEmpty && (
            <GameFragment
              result={result}
              puzzle={puzzles[currentProblemIndex]}
              slots={gameSlots}
              isLastPuzzle={isLastPuzzle}
              moveToNextPuzzle={moveToNextPuzzle}
            />
          )) || <p className='message'>PAS DE CONTENU...</p>}
        </>
      )}
    </main>
  )
}

