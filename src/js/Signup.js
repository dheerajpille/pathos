import React, { Component } from 'react';
import { Redirect } from 'react-router';

import '../css/style.css';

class Signup extends Component {
    constructor(props) {
        super(props);
        if (sessionStorage.signup_redirect) {
            this.state = {
                redirect: true
            };
        } else {
            this.state = {
                redirect: false
            };
        }
        this.handleSignup = this.handleSignup.bind(this);
    }
    handleSignup(e) {
        e.preventDefault();
        fetch("https://tracker-backend-heroku.herokuapp.com/signup/",
            {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "first_name": this.refs.first_name.value,
                    "last_name": this.refs.last_name.value,
                    "email": this.refs.email.value,
                    "username": this.refs.username.value,
                    "password": this.refs.password.value
                })
            }
        )
            .then((response) => {
                if (response.status === 201) {
                    sessionStorage['username'] = this.refs.username.value;
                    sessionStorage['email'] = this.refs.email.value;
                    sessionStorage['signup_redirect'] = true;
                    this.setState({redirect: true});
                }
                return response.json();
            })
            .then((data) => {
                if (data.email !== undefined || data.username !== undefined || data.password !== undefined) {
                    console.log(data.email);
                    console.log(data.username);
                    console.log(data.password);
                }
                console.log(data);
            });
    }
    render() {
        if (this.state.redirect) {
            return <Redirect push to='/signup/redirect/' />
        }
        return (
            <div>
                <div className={"header"}>
                    <h1 className={"title"}>pathos sign up</h1>
                </div>
                <div className={"menu"}>
                    <form onSubmit={this.handleSignup}>
                        <label>
                            <input type="text" ref="first_name" name="first_name" placeholder="first name" />
                        </label>
                        <br/>
                        <br/>
                        <label>
                            <input type="text" ref="last_name" name="last_name" placeholder="last name" />
                        </label>
                        <br/>
                        <br/>
                        <label>
                            <input type="number" min="0" ref="age" name="age" placeholder="age" />
                        </label>
                        <br/>
                        <br/>
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
                        <button type="submit" className={"navLink"}><strong>Sign up</strong></button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Signup;