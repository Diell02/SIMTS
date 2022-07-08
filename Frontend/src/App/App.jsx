import React from 'react';
import { Router, Route, Link } from 'react-router-dom';

import { history, Role } from '../_helpers';
import { authenticationService } from '../_services';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { AdminPage } from '../AdminPage';
import { LoginPage } from '../LoginPage';
import { Users } from '../users';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isDirector: false
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({
            currentUser: x,
            isDirector: x && x.role === Role.Director
        }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser, isDirector } = this.state;
        return (
            <Router history={history}>
                <div>
                    {currentUser &&
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <div className="navbar-nav">
                                <Link to="/" className="nav-item nav-link">Home</Link>
                                <Link to="/users" className="nav-item nav-link">Users</Link>
                                {isDirector && <Link to="/admin" className="nav-item nav-link">Admin</Link>}
                                <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                            </div>
                        </nav>
                    }
                    <div className="jumbotron">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 offset-md-3">
                                    <PrivateRoute exact path="/" component={HomePage} />
                                    <PrivateRoute exact path="/users" component={Users} />
                                    <PrivateRoute path="/admin" roles={[Role.Director]} component={AdminPage} />
                                    <Route path="/login" component={LoginPage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export { App }; 