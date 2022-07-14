import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage';
import { app } from '../firebase/init';
import { Problem } from '../interfaces';

export async function fetchProblems() {
    let data: Problem[] = [];
    const storage = getStorage(app);
    const problemsRef = ref(storage, 'problems');

    const franchisePrefixes = await listAll(problemsRef);

    for (let i = 0; i < franchisePrefixes.prefixes.length; i++) {
        const pref = franchisePrefixes.prefixes[i];
        const franchise = pref.name;

        const franchiseProblemsRef = ref(storage, `problems/${franchise}`);
        const franchiseProblemsPrefixes = await listAll(franchiseProblemsRef);

        for (let j = 0; j < franchiseProblemsPrefixes.prefixes.length; j++) {
            const pref = franchiseProblemsPrefixes.prefixes[j];
            const word = pref.name;

            const picturesRef = ref(storage, `problems/${franchise}/${word}`);
            const picturesPrefs = (await listAll(picturesRef));
            const pictureItems = picturesPrefs.items;
            const pictures: string[] = [];

            for (let k = 0; k < pictureItems.length; k++) {
                const ref = pictureItems[k];
                const downloadURL = await getDownloadURL(ref);
                pictures.push(downloadURL);
            }

            data.push({
                pictures,
                franchise,
                word,
            });
        }
    }

    return data;
}



