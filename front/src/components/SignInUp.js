import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import RouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';
import { createToken } from '../redux-actions';

class SignInUp extends Component {
  constructor(props) {
    super(props);
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
    const signType = event.target.value; // either "signin" or "signup"
    console.log('handleSign ', signType);
    fetch(`/auth/${signType}`, {
      method: 'post',
      body: JSON.stringify(this.state),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(
        res => {
          this.setState({ flash: res.flash });
          if (signType === 'signin') {
            // localStorage.setItem('token', res.token);
            const { history, createTokenAction } = this.props;
            // const { email } = this.state;
            // console.log('storage is', localStorage.getItem('token'));
            // dispatch(createToken(res.token));
            createTokenAction(res.token);
            // dispatch(createProfile(res.token));
            // dispatch(
            //   {
            //     type: 'CREATE_TOKEN',
            //     token: res.token,
            //   }
            // );
            // localStorage.setItem('profile',
            //   JSON.stringify({
            //     email,
            //     pseudo: 'todo! not coded yet',
            //   }));
            // console.log('localStorage token =', localStorage.getItem('token'));
            // console.log('localStorage profile =', JSON.parse(localStorage.getItem('profile')));
            history.push('/profile');
          }
        },
        err => this.setState({ flash: err.flash })
      );
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Grid container spacing={40}>
            <Grid item xs={3}>
              <input type="email" name="email" onChange={this.onEmailInput} />
            </Grid>
            <Grid item xs={3}>
              <input type="password" name="password" onChange={this.onPasswordInput} />
            </Grid>
            <Grid item xs={3}>
              <button type="submit" onClick={this.handleSign} value="signup">
                Register SignUp
              </button>
            </Grid>
            <Grid item xs={3}>
              <button type="submit" onClick={this.handleSign} value="signin">
                Login SignIn
              </button>
            </Grid>
          </Grid>

          <br />
          <span> This.state </span>
          <h5> {JSON.stringify(this.state, 1, 1)} </h5>
          <br />
        </div>
      </MuiThemeProvider>
    );
  }
}

SignInUp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: RouterPropTypes.history.isRequired,
  createTokenAction: PropTypes.func.isRequired,
};

const dispatchToStore = dispatch => ({
  createTokenAction: token => dispatch(createToken(token)),
  // action1: some_payload => dispatch(action1(some_payload)),
  // action2: some_payload => dispatch(action2(some_payload))
});

export default connect(null, dispatchToStore)(SignInUp);
