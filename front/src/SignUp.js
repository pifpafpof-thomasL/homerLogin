import React, { Component } from 'react';

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
        };
        this.onEmailInput = this.onEmailInput.bind(this);
        this.onPasswordInput = this.onPasswordInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onEmailInput(e) {
        e.preventDefault();
        this.setState({ email: e.target.value });
    }


    onPasswordInput(e) {
        e.preventDefault();
        this.setState({ password: e.target.value });
    }

    handleSubmit(e) {
        console.log("submit value", e.target.value);
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <br />
                <span> Your Email to sign up: </span>
                <h5> {JSON.stringify(this.state, 1, 1)} </h5>
                <br />
                {/* <form onSubmit={this.handleSubmit}> */}
                    <input type="email" name="email" onChange={this.onEmailInput} />
                    <input type="password" name="password" onChange={this.onPasswordInput} />
                    {/* <input type="button" name="button" label="OK" > */}
                    <button type="submit" onClick={this.handleSubmit}>OK</button>

                {/* </form> */}
            </div>
        );
    }
}

export default SignUp;