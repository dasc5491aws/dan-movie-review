const React = require('react');
const ReactDOM = require('react-dom');

const divs = {
    signIn: (<div>
        <label for="username"><b>Username</b></label>
        <input type="text" id="username" required />
        <br />
        <label for="password"><b>Password</b></label>
        <input type="password" id="password" required />
        <br />
        <button type="submit" onclick={signIn}>Login</button>
    </div>)
}

class SignInDisplay extends React.Component {
    render() {
        return [divs.signIn]
    }
}

const signInDiv = document.getElementById('signIn');

ReactDOM.render(<SignInDisplay />, signInDiv);