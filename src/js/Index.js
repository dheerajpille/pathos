import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import '../css/style.css';

class Index extends Component {
    render() {
        return (
            <div>
                <div className="header">
                    <h1>Pathos</h1>
                </div>
                <div className="content">
                    <div className="content-body">
                        <p>I can't even do this yet!</p>
                    </div>
                    <Link to='/login/' className="link"><button><strong>Log in to Tracker</strong></button></Link>
                    <Link to='/signup/' className="link"><button><strong>Sign up for Tracker</strong></button></Link>
                </div>
            </div>
        );
    }
}

export default Index;