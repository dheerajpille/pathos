import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import Index from './js/Index';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={Index} />{/*
                    <Route path='/login/' exact component={Login} />
                    <Route path='/signup/' exact component={Signup} />
                    <Route path='/signup/redirect/' exact component={SignupRedirect} />
                    <Route path='/dashboard/' exact component={Dashboard} />*/}
                    <Route path='/*' exact component={Index} />
                </Switch>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
