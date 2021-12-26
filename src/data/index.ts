import type { GameData, Problem } from '../interfaces';
import rawGameData from './game_data.json';

async function parseGameData(): Promise<Problem[]> {
    let problems: Problem[] = await rawGameData.map((problem: Problem) => {
        let pictures = problem.pictures;
        let loadedPictures = pictures.map((picture: string) => picture);
        return { ...problem, pictures: loadedPictures };
    });
    return problems;
}

export async function gameData(): Promise<GameData> {
    const problems = await parseGameData();
    const data: GameData = { problems };
    return data;
}
