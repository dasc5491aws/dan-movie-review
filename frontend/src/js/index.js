const React = require('react');
const ReactDOM = require('react-dom');
const { accessTokenRequest, dataApiRequest } = require('./request')

import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Movie extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { imgSrc,
            movieId,
            overallScore,
            title } = this.props.data

        return (
            <div class="movie" style={{ border: 'thin solid black' }}>
                <h4><b>{title}</b></h4>
                <p>Overall Score: {overallScore || 'Unrated'}</p>
                <button onClick={() => { location.assign(`${window.location.href}movieDetails.html?movieId=${movieId}`) }} >Details</button>
            </div>
        )
    }
}

class MovieDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { movies: [] }
    }

    render() {
        return this.state.movies.map(movieData => (<Movie data={movieData} />))
    }

    componentDidMount() {
        this.getMovies()
    }

    async getMovies() {
        const { data } = await dataApiRequest('get', '/movies')

        this.setState({ movies: data })
    }
}

class SignInDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { content: null }
        this.parent = props.parent
    }

    render() {
        return this.state.content
    }

    componentDidMount() {
        this.displaySignIn()
    }

    displaySignIn() {
        const signInFunc = async () => {
            const { data: { AuthenticationResult: { AccessToken } } } = await accessTokenRequest(document.getElementById('username').value, document.getElementById("password").value)
            cookies.set(`accessToken`, AccessToken, { path: '/', maxAge: 3600 })
            this.parent.setState({ loggedIn: true })
        }

        this.setState({
            content: (<div>
                <label for="username"><b>Username</b></label>
                <input type="text" id="username" required />
                <br />
                <label for="password"><b>Password</b></label>
                <input type="password" id="password" required />
                <br />
                <button type="submit" onClick={signInFunc}>Login</button>
            </div >)
        })
    }
}

class Display extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: !!cookies.get('accessToken')
        }
    }

    render() {
        return this.state.loggedIn ? <MovieDisplay /> : <SignInDisplay parent={this} />
    }
}

const contentDiv = document.getElementById('content');

ReactDOM.render(<Display />, contentDiv);