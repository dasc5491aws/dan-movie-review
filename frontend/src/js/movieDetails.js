const React = require('react');
const ReactDOM = require('react-dom');
const { dataApiRequest } = require('./request')

const urlParams = new URLSearchParams(window.location.search);

class MovieDetailDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { details: null }
    }

    render() {
        if (!this.state.details) return 'Fetching Details...'
        const {
            language,
            releaseDate,
            genre,
            imgSrc,
            title,
            movieId } = this.state.details

        return (
            <div class="movieDetails" style={{ border: 'thin solid black' }}>
                <h4><b>Title: {title}</b></h4>
                <p>Language: {language}</p>
                <p>Release Date: {releaseDate}</p>
                <p>Genre: {genre}</p>
            </div>
        );
    }

    componentDidMount() {
        this.getMovieDetails()
    }

    async getMovieDetails() {
        const { data } = await dataApiRequest('get', `/movies/${urlParams.get('movieId')}`)

        this.setState({ details: data })
    }
}

class CastAndCrewDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { castAndCrew: null }
    }

    render() {
        if (!this.state.castAndCrew) return 'Fetching Cast and Crew...'

        return (
            <div class="castAndCrew" style={{ border: 'thin solid black' }}>
                <h4><b>Cast and Crew</b></h4>
                {this.state.castAndCrew.map(a => (<p>{JSON.stringify(a)}</p>))}
            </div>
        );
    }

    componentDidMount() {
        this.getCastAndCrew()
    }

    async getCastAndCrew() {
        try {
            const { data } = await dataApiRequest('get', `/movies/${urlParams.get('movieId')}/people`)

            this.setState({ castAndCrew: data })
        } catch (e) {
            this.setState({ castAndCrew: [] })
        }
    }
}

class RatingsDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ratingsObj: null }
    }

    render() {
        if (!this.state.ratingsObj) return 'Fetching Ratings...'

        const addRatingFunc = async () => {
            const body = {
                text: document.getElementById('ratingText').value,
                score: document.getElementById('score').value,
                movieId: urlParams.get('movieId')
            }
            await dataApiRequest('post', `/movies/${urlParams.get('movieId')}/ratings`, body)
            return this.getRatings()
        }

        return (
            <div class="ratings" style={{ border: 'thin solid black' }}>
                <h4><b>Ratings</b></h4>
                <h3><b>Overall Score: {this.state.ratingsObj.overallScore}</b></h3>
                {this.state.ratingsObj.ratings.map(a => (<p>{JSON.stringify(a)}</p>))}
                <div class='addRating'>
                    <label for="score">Score (1.0-5.0):</label>
                    <input type="number" id="score" name="score" step="0.1" min="1" max="5" />
                    <label for="ratingText">Comment:</label>
                    <input type="text" id="ratingText" name="ratingText" />
                    <button type="submit" onClick={addRatingFunc}>Add Your Rating</button>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.getRatings()
    }

    async getRatings() {
        try {
            const { data } = await dataApiRequest('get', `/movies/${urlParams.get('movieId')}/ratings`)

            this.setState({ ratingsObj: data })
        } catch (e) {
            this.setState({ ratingsObj: { overallScore: null, ratings: [] } })
        }
    }
}

const detailsDiv = document.getElementById('movieDetailsContent');
const castAndCrewDiv = document.getElementById('castAndCrewContent');
const ratingsDiv = document.getElementById('ratingsContent');

ReactDOM.render(<MovieDetailDisplay />, detailsDiv);
ReactDOM.render(<CastAndCrewDisplay />, castAndCrewDiv);
ReactDOM.render(<RatingsDisplay />, ratingsDiv);