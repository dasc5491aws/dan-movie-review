const React = require('react');
const ReactDOM = require('react-dom');
const { initiateAuthSession, dataApiRequest, isAdmin } = require('./request')

import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Movie extends React.Component {
    constructor(props) {
        super(props);
        this.movieId = this.props.movieId
    }

    render() {
        const {
            data: { imgSrc,
                movieId,
                overallScore,
                title },
            displayAdminButtons
        } = this.props

        return (
            <div class="movie" style={{ border: 'thin solid black' }}>
                <h4><b>{title}</b></h4>
                <p>Overall Score: {overallScore || 'Unrated'}</p>
                <button onClick={() => { location.assign(`${window.location.href}movieDetails.html?movieId=${movieId}`) }} >Details</button>
                {isAdmin() ? (<DeleteMovieButton key={movieId} movieId={movieId} getMoviesCallback={this.props.rerenderParentCallback} />) : ''}
            </div>
        )
    }
}

class MovieDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { movies: [], moviedRequested: false }
        this.rerenderParentCallback = this.getMovies.bind(this);
    }

    render() {
        return (<div class='movie-display'>
            {this.state.moviedRequested ? '' : 'Loading Movies...'}
            {this.state.movies.map(movieData => (<Movie key={movieData.movieId} rerenderParentCallback={this.rerenderParentCallback} data={movieData} />))}
            {isAdmin() ? (<div><br /><AddMovieButton /></div>) : ''}
        </div>)
    }



    componentDidMount() {
        this.getMovies()
    }

    async getMovies() {
        let data = []
        try {
            const { data: movieData } = await dataApiRequest('get', '/movies')
            data = movieData
        } catch (e) {
            //404
        }
        this.setState({ movies: data, moviedRequested: true })
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
            await initiateAuthSession(document.getElementById('username').value, document.getElementById("password").value)

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

class SignOutButton extends React.Component {
    constructor(props) {
        super(props);
        this.parent = props.parent
    }

    render() {
        const signOutFunc = () => {
            cookies.remove('accessLevel')
            cookies.remove('accessToken')
            this.parent.setState({ loggedIn: false })
        }

        return (
            <button onClick={signOutFunc}>Sign Out</button>
        )
    }
}

class AddMovieButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button onClick={() => { location.assign(`${window.location.href}addMovie.html`) }} >Admin Add Movie</button>
        )
    }
}

class DeleteMovieButton extends React.Component {
    constructor(props) {
        super(props);
        this.movieId = this.props.movieId
    }

    render() {
        const deleteMovieFunc = async () => {
            await dataApiRequest('DELETE', `/movies/${this.movieId}`)
            this.props.getMoviesCallback()
        }

        return (
            <button onClick={deleteMovieFunc} >Admin Delete Movie</button>
        )
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
        return this.state.loggedIn
            ? (
                <div>
                    <MovieDisplay />
                    < br />
                    <SignOutButton parent={this} />
                </div>
            )
            : (<SignInDisplay parent={this} />)
    }
}

const contentDiv = document.getElementById('content');

ReactDOM.render(<Display />, contentDiv);