const React = require('react');
const ReactDOM = require('react-dom');
const axios = require('axios')
const { cognito: { clientId }, apiBaseUrl } = require('./config')
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class VideoDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { content: null }
    }

    render() {
        return [this.state.content]
    }

    componentDidMount() {
        this.displayMovies()
    }

    async displayMovies() {
        const { data } = await axios({
            method: 'get',
            url: `${apiBaseUrl}/movies`,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': cookies.get('accessToken')
            }
        })

        console.log(data)
        this.setState({ content: (<h1>fuck this</h1>) })
    }
}

class SignInDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { content: null }
        this.parent = props.parent
    }

    render() {
        return [this.state.content]
    }

    componentDidMount() {
        this.displaySignIn()
    }

    displaySignIn() {
        const signInFunc = async () => {
            const { data: { AuthenticationResult: { AccessToken } } } = await axios({
                method: 'post',
                url: 'https://cognito-idp.us-east-2.amazonaws.com/',
                data: {
                    AuthFlow: 'USER_PASSWORD_AUTH',
                    ClientId: clientId,
                    AuthParameters: { USERNAME: document.getElementById('username').value, PASSWORD: document.getElementById("password").value },
                    ClientMetadata: {}
                },
                headers: {
                    'Content-Type': 'application/x-amz-json-1.1',
                    'x-amz-target': 'AWSCognitoIdentityProviderService.InitiateAuth'
                }
            })
            cookies.set(`accessToken`, AccessToken, { path: '/' })
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
        return [this.state.loggedIn ? <VideoDisplay /> : <SignInDisplay parent={this} />]
    }
}

const contentDiv = document.getElementById('content');

ReactDOM.render(<Display />, contentDiv);