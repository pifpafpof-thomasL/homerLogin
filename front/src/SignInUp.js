import React, { Component } from 'react';

class SignInUp extends Component {

    constructor(props) {
        super(props);
        this.state = { email: "" };
        this.onEmailInput = this.onEmailInput.bind(this);
        this.onPasswordInput = this.onPasswordInput.bind(this);
        this.handleSign = this.handleSign.bind(this);
    }

    onEmailInput(e) {
        e.preventDefault();
        this.setState({ email: e.target.value });
    }


    onPasswordInput(e) {
        e.preventDefault();
        this.setState({ password: e.target.value });
    }

    handleSign(event) {
        event.preventDefault();
        console.log("handleSign ", event.target.value);
        fetch('/auth/' + event.target.value, {
            method: 'post',
            body: JSON.stringify(this.state),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(
                res => {
                    this.setState({ "flash": res.flash });
                    localStorage.setItem ("flash", JSON.stringify(res.flash));
                    console.log("storage is", JSON.parse(localStorage.getItem ("flash")));
                },
                err => this.setState({ "flash": err.flash })
            ).then(
                () => console.log("flash", this.state.flash)
            );
    }

    render() {
        return (
            <div>
                <br />
                <span> Your Email to sign up: </span>
                {/* <h5> {JSON.stringify(this.state, 1, 1)} </h5> */}
                <br />
                <input type="email" name="email" onChange={this.onEmailInput} />
                <input type="password" name="password" onChange={this.onPasswordInput} />
                <button type="submit" onClick={this.handleSign} value={"signup"}>
                    Register SignUp
                </button>
                <button type="submit" onClick={this.handleSign} value={"signin"}>
                    Login SignIn
                </button>
            </div>
        );
    }
}

export default SignInUp;