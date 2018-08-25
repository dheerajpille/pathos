import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Particles from 'react-particles-js';

import '../css/style.css';

const particlesOptions = {
    particles: {
        number: {
            value: 50,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
};

class Index extends Component {
    render() {
        return (
            <div>
                <div className={"navBar"}>
                    <Link to='/login/' className={"navLink"}><span><strong>Log in</strong></span></Link>
                    <Link to='/signup/' className={"navLink"}><span><strong>Sign up</strong></span></Link>
                </div>
                <div className={"header"}>
                    <h1 className={"title"}>pathos</h1>
                    <p className={"text"}>Your mental health companion</p>
                </div>
            </div>
        );
    }
}

export default Index;