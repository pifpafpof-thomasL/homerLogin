import React, { Component } from 'react';

class Profile extends Component {


    componentDidMount() {
        console.log("componentDidMount, fetching /birds");
        fetch('/birds', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(
                res => this.setState({
                    birds: "route available",
                    profile: JSON.parse(localStorage.getItem("profile"))
                }),
            )
            .catch(
                err => this.setState({ birds: "route not available" }),
            );

    }

    render() {
        return (
            <div>
                <br />
                <span> Birds Profile Component: </span>
                <h5> {JSON.stringify(this.state, 1, 1)} </h5>
                <br />
            </div>
        );
    }
}

export default Profile;