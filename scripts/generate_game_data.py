import os
import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
GAME_PICTURES_DIR = BASE_DIR / "public/img/problems"
DESTINATION_DIR = BASE_DIR / "src/data"
DESTINATION_FILE = DESTINATION_DIR / "game_data.json"

game_data = []

for franchise in os.listdir(GAME_PICTURES_DIR):
    franchise_name = franchise
    print('FRANCHISE: ', franchise_name)
    franchise_folder = os.path.join(GAME_PICTURES_DIR, franchise)
    for problem in os.listdir(franchise_folder):
        problem_word = problem
        print('\t-WORD: ', problem_word)
        problem_folder = os.path.join(franchise_folder, problem)
        problem_data = {}
        problem_data['pictures'] = []
        problem_data['franchise'] = franchise_name
        problem_data['word'] = problem_word
        for picture in os.listdir(problem_folder):
            picture_path = f"/img/problems/{franchise_name}/{problem_word}/{picture}"
            problem_data['pictures'].append(picture_path)
            print('\t\t-Image: ', picture_path)
        game_data.append(problem_data)


with open(DESTINATION_FILE, "w") as outfile:
    json.dump(game_data, outfile, indent=4)
