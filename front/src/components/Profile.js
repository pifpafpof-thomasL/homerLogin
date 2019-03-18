import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Profile extends Component {
  componentDidMount() {
    const { token } = this.props;
    console.log('componentDidMount, fetching /profile');
    fetch('/profile', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${localStorage.getItem('token')}`
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(
        () => this.setState({
          profile: 'route available', // todo: saving the profile
          // profile: JSON.parse(localStorage.getItem('profile'))
        }),
      )
      .catch(
        () => this.setState({ profile: 'route not available' }),
      );
  }

  render() {
    return (
      <div>
        <br />
        <span> profile Profile Component: </span>
        <h5> {JSON.stringify(this.state, 1, 1)} </h5>
        <br />
      </div>
    );
  }
}


Profile.propTypes = {
  token: PropTypes.string,
};

Profile.defaultProps = {
  token: '',
};

const mapStateToProps = (store) => ({
  token: store.auth.token,
});

export default connect(mapStateToProps)(Profile);
