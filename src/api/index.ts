import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage'
import { app } from '../configs/firebase'
import { Puzzle } from '../types'

const storage = getStorage(app)
const problemsRef = ref(storage, 'problems')

export async function getFranchises() {
    const franchises: string[] = []
    const franchisePrefixes = await listAll(problemsRef)

    for (let i = 0; i < franchisePrefixes.prefixes.length; i++) {
        const pref = franchisePrefixes.prefixes[i]
        const franchise = pref.name

        franchises.push(franchise)
    }

    return franchises
}

export async function getFranchiseProblems(universe: string) {
    const data: Puzzle[] = []
    const franchiseProblemsRef = ref(storage, `problems/${universe}`)
    const franchiseProblemsPrefixes = await listAll(franchiseProblemsRef)

    for (let j = 0; j < franchiseProblemsPrefixes.prefixes.length; j++) {
        const pref = franchiseProblemsPrefixes.prefixes[j]
        const word = pref.name

        const picturesRef = ref(storage, `problems/${universe}/${word}`)
        const picturesPrefs = await listAll(picturesRef)
        const pictureItems = picturesPrefs.items
        const pictures: string[] = []

        for (let k = 0; k < pictureItems.length; k++) {
            const ref = pictureItems[k]
            const downloadURL = await getDownloadURL(ref)
            pictures.push(downloadURL)
        }

        data.push({
            pictures,
            universe,
            word,
        })
    }

    return data
}

export async function getAllProblems() {
    const data: Puzzle[] = []
    const franchisePrefixes = await listAll(problemsRef)

    for (let i = 0; i < franchisePrefixes.prefixes.length; i++) {
        const pref = franchisePrefixes.prefixes[i]
        const franchise = pref.name

        const problems = await getFranchiseProblems(franchise)
        data.push(...problems)
    }

    return data
}
