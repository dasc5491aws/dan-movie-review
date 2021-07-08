const React = require('react');
const ReactDOM = require('react-dom');
const { dataApiRequest, isAdmin } = require('./request')

class AddMovieDisplay extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const addMovieFunc = async () => {
            const body = {
                title: document.getElementById('title').value,
                releaseDate: document.getElementById('releaseDate').value,
                genre: document.getElementById('genre').value,
                language: document.getElementById('language').value,
            }

            await dataApiRequest('POST', '/movies', body)
            location.assign(window.location.origin)
        }

        return (
            <div class='addMovie'>
                <label for="title">Title</label>
                <input type="text" id="title" name="title" />
                <label for="releaseDate">Release Date</label>
                <input type="date" id="releaseDate" name="releaseDate" />
                <label for="genre">Genre</label>
                <input type="text" id="genre" name="genre" />
                <label for="language">Language</label>
                <input type="text" id="language" name="language" />
                <button type="submit" onClick={addMovieFunc}>Add Movie</button>
            </div>
        );
    }
}

const contentDiv = document.getElementById('addMovieContent');
const content = isAdmin() ? <AddMovieDisplay /> : 'You cannot access this page with your current level of access'

ReactDOM.render(content, contentDiv);