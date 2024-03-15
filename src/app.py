# FILE: app.py
# PROJECT: Date Night
# PROGRAMMER: Dario Simpson
# FIRST VERSION: 15-3-2024

from flask import Flask, render_template, request, redirect, url_for
import json
import os

app = Flask(__name__)

MOVIES_FILE = 'movies.json'


def save_data(data, filename):
    with open(filename, 'w') as file:
        json.dump(data, file, indent=4)


def load_data(filename):
    if os.path.exists(filename):
        with open(filename, 'r') as file:
            try:
                return json.load(file)
            except json.decoder.JSONDecodeError:
                return []
    else:
        return []


@app.route('/save_names', methods=['POST'])
def save_names():
    user_a = request.form['user_a']
    user_b = request.form['user_b']

    # Create a dictionary with the names
    names_data = {'user_a': user_a, 'user_b': user_b}

    # Save the names to a new JSON file
    with open('names.json', 'w') as file:
        json.dump(names_data, file)

    # Redirect back to the configuration page after saving
    return redirect(url_for('config'))


@app.route('/get_names')
def get_names():
    try:
        with open('names.json', 'r') as file:
            names_data = json.load(file)
    except FileNotFoundError:
        names_data = {'user_a': 'User A', 'user_b': 'User B'}

    return names_data


@app.route('/')
def index():
    # Load names from names.json if available, otherwise set to default values
    try:
        with open('names.json', 'r') as file:
            names_data = json.load(file)
    except FileNotFoundError:
        names_data = {'user_a': 'User A', 'user_b': 'User B'}

    # Load movies data and render the index.html template
    movies = load_data(MOVIES_FILE)
    return render_template('index.html', movies=movies, user_a=names_data['user_a'], user_b=names_data['user_b'])


@app.route('/add', methods=['POST'])
def add_entry():
    name = request.form['name']
    status = request.form['status']

    filename = MOVIES_FILE

    data = load_data(filename)
    data.append({'name': name, 'status': status, 'user_a': '', 'user_b': ''})
    save_data(data, filename)

    return redirect(url_for('index'))


@app.route('/toggle/<movie_name>/<user>', methods=['POST'])
def toggle_user(movie_name, user):
    filename = MOVIES_FILE
    data = load_data(filename)

    for movie in data:
        if movie['name'] == movie_name:
            movie[user] = not movie.get(user, False)

    save_data(data, filename)

    return 'Success'


@app.route('/remove/<movie_name>')
def remove_movie(movie_name):
    filename = MOVIES_FILE
    data = load_data(filename)

    data = [movie for movie in data if movie['name'] != movie_name]

    save_data(data, filename)

    return redirect(url_for('index'))


@app.route('/update_user', methods=['POST'])
def update_user():
    data = request.json
    movie_name = data['movieName']
    user = data['user']
    value = data['value']

    filename = MOVIES_FILE
    data = load_data(filename)

    for movie in data:
        if movie['name'] == movie_name:
            movie[user] = value

    save_data(data, filename)

    return 'Success'


@app.route('/status/<movie_name>/<status>', methods=['POST'])
def change_status(movie_name, status):
    filename = MOVIES_FILE
    data = load_data(filename)

    for movie in data:
        if movie['name'] == movie_name:
            movie['status'] = status

    save_data(data, filename)

    return 'Success'


@app.route('/config')
def config():
    return render_template('config.html')


@app.route('/about')
def about():
    return render_template('about.html')


if __name__ == '__main__':
    app.run(debug=True)
