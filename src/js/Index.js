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
                    <div className={"landingText"}>
                        <h1 style={{margin: "0"}}>Streamlining mental health care</h1>
                        <h3>
                            1 in 5 adults in North America experience mental health issues.
                            For many individuals that receive mental health care, wait times are long and visits are sparse.
                            Our service allows the therapist and the patient to have better analysis and better quality consultations.
                        </h3>
                        <h3>
                            Our service allows a care provider with:
                        </h3>
                        <ul>
                            <li>
                                Useful health metrics such as heart rate, sleep quality, and sentiment analysis
                            </li>
                            <li>
                                Medication dosage reminders
                            </li>
                            <li>
                                Direct messaging capability
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;