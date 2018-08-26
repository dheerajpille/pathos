import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import '../css/style.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        if (sessionStorage.length === 0) {
            this.state = {
                redirect: true
            };
        } else {
            this.state = {
                redirect: false
            };
        }
        this.handleExpense = this.handleExpense.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleExpense(e) {
        e.preventDefault();
        fetch("https://tracker-backend-heroku.herokuapp.com/tracker/user/"+sessionStorage['id']+"/expense/create/",
            {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage['access_token']
                },
                body: JSON.stringify({
                    "category": this.refs.category.value,
                    "type": this.refs.type.value,
                    "value": this.refs.value.value
                })
            }
        )
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data);
            });
    }
    handleLogout(e) {
        e.preventDefault();
        fetch("https://tracker-backend-heroku.herokuapp.com/o/revoke_token/",
            {
                method: 'post',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body:
                "client_id=iulHMYsNYKc9swHJvJlWvz8WMJWwbWbscF1OuUMr&" +
                "client_secret=aOOzlyOQZW5GhSa8yQczlgzN9QcHeCDl5QSp7HTp2G587X5Y56jucR7wbblHYkS0dVoqULhAzhYTFhX46YL7aJ29qpCR3vkJOPwAM8ngPuNLsyzSh35wDHXGBNr7ZTDJ&" +
                "token="+sessionStorage.access_token
            }
        )
            .then((response) => {
                if (response.status === 200) {
                    sessionStorage.clear();
                    this.setState({redirect: true});
                }
            })
    }
    render() {
        return (
            <div>
                <div className={"navBar"}>
                    <Link to='/'  className={"navLink"}><span><strong>Log out</strong></span></Link>
                </div>
                <div className={"dashboardHeader"}>
                    <h1 className={"dashboardTitle"}>Patients</h1>
                    <button className={"addButton"}><strong>+</strong></button>
                </div>
                <div className="content">
                    <i><img src="https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/410.svg" className={"profilePicture"}/></i>
                    <span>Hello World</span>
                </div>
            </div>
        );
    }
}

export default Dashboard;