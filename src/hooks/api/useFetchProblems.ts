import { useState, useEffect } from 'react'
import _ from 'lodash'
import { Puzzle } from '../../types/index'
import { getAllProblems, getFranchiseProblems } from '../../api'
import { getFirestore } from "firebase/firestore";
import { addDoc, arrayUnion, collection, doc, DocumentData, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { app } from '../../configs/firebase';
const db = getFirestore(app);

export function useFetchProblems(franchise?: string) {
  const [problems, setProblems] = useState<Puzzle[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    async function fetchProblems() {
      try {
        setIsLoading(true)
        const packs = await getAllPacks();
        const result: any[] = [];

        console.log(packs);

        for (let i = 0; i < packs.length; i++) {
          const puzzles = packs[i].puzzles;
          result.push(...puzzles);
        }


        if (result.length !== 0) setProblems(_.shuffle(result))
      } catch (error) {
      } finally {
        setIsLoading(false)
      }
    }
    fetchProblems()
  }, [franchise])

  return {
    problems,
    isLoading,
  }
}

function convertPuzzlesToObj(puzzles: Array<any>) {
  return puzzles.map((puzzle) => (typeof puzzle === "string") ? JSON.parse(puzzle) : puzzle)
}

function getRef(documentPath: string) {
  return collection(db, documentPath);
}
async function getAllPacks() {
  const packsRef = getRef("packs");
  const packsDocs = await getDocs(packsRef);

  const result: Array<any> = [];

  packsDocs.forEach((doc) => {
    const data = doc.data();
    const puzzles = convertPuzzlesToObj(data.puzzles);
    const puzzlePack: any = {
      id: doc.id,
      title: data.title,
      cover: data.cover,
      author: data.author,
      difficulty: data.difficulty,
      puzzles,
    }
    result.push(puzzlePack);
  })
  return result;

}

