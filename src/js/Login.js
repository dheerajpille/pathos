import React, { Component } from 'react';
import { Redirect } from 'react-router';

import '../css/style.css';

class Login extends Component {
    constructor(props) {
        super(props);
        if (sessionStorage.login_redirect) {
            this.state = {
                redirect: true
            };
        } else {
            this.state = {
                redirect: false
            };
        }
        this.handleLogin = this.handleLogin.bind(this);
    }
    handleLogin(e) {
        e.preventDefault();
        sessionStorage['username'] = this.refs.username.value;
        sessionStorage['password'] = this.refs.password.value;
        fetch("https://tracker-backend-heroku.herokuapp.com/login/",
            {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "username": sessionStorage['username'],
                    "password": sessionStorage['password']
                })
            }
        )
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if (data.id !== undefined || data.username !== undefined || data.password !== undefined) {
                    // TODO: check for errors
                    console.log(data.id);
                    console.log(data.username);
                    console.log(data.password);
                } else {
                    console.log(data.non_field_errors);
                }
                sessionStorage['id'] = data.id;
            });
        fetch("https://tracker-backend-heroku.herokuapp.com/o/token/",
            {
                method: 'post',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body:
                "client_id=iulHMYsNYKc9swHJvJlWvz8WMJWwbWbscF1OuUMr&" +
                "client_secret=aOOzlyOQZW5GhSa8yQczlgzN9QcHeCDl5QSp7HTp2G587X5Y56jucR7wbblHYkS0dVoqULhAzhYTFhX46YL7aJ29qpCR3vkJOPwAM8ngPuNLsyzSh35wDHXGBNr7ZTDJ&" +
                "username=" + sessionStorage['username'] + "&" +
                "password=" + sessionStorage['password'] + "&" +
                "grant_type=password"
            }
        )
            .then((response) => {
                if (response.status === 200) {
                    sessionStorage['login_redirect'] = true;
                    this.setState({redirect: true});
                }
                return response.json();
            }).then((data) => {
            sessionStorage['token_type'] = data.token_type;
            sessionStorage['access_token'] = data.access_token;
            sessionStorage['refresh_token'] = data.refresh_token;
            delete sessionStorage['username'];
            delete sessionStorage['password'];
            console.log(sessionStorage)
        });
    }
    render() {
        if (this.state.redirect) {
            return <Redirect push to='/dashboard/' />
        }
        return (
            <div>
                <div className={"header"}>
                    <h1 className={"title"}>pathos log in</h1>
                </div>
                <div className={"menu"}>
                    <form onSubmit={this.handleLogin}>
                        <label>
                            <input type="text" ref="username" name="username" placeholder="username" />
                        </label>
                        <br/>
                        <br/>
                        <label>
                            <input type="password" ref="password" name="password" placeholder="password" />
                        </label>
                        <br/>
                        <br/>
                        <button type="submit" className={"navLink"}><strong>Log in</strong></button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;