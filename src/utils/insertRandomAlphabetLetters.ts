import _ from "lodash";

export function insertRandomAlphabetLetters(count: number) {
    let arr: string[] = [];
    const alphabet = 'abcdefghijklmnopqurstuvwxyz';
    for (let i = 0; i < count; i++) {
        const randomIndex = _.random(0, alphabet.length - 1);
        arr.push(alphabet[randomIndex]);
    }
    return arr;
}