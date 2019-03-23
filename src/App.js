import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import "./App.css";
import { connect } from 'react-redux';
import { userActions } from './actions';

// ===== APP ROUTES ===== //
import Routes from "./routes/Routes";

// ===== STATE MANAGEMENT WITH REACT 16 CONTEXT API ===== //
import NotificationsProvider from './providers/NotificationsProvider';

/**
 * FONT AWESOME ICON LIBRARY
 * Import any icons here so they are usable across all components
 */
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faPencilAlt, faSyncAlt, faFutbol, faTrophy, faCoins } from '@fortawesome/free-solid-svg-icons';
library.add(faTrashAlt, faPencilAlt, faSyncAlt, faFutbol, faTrophy, faCoins);

class App extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    console.log('componentDidMount @ App.js fired!');
    this.setState({ isAuthenticating: false });
  }

  handleLogout = async () => {
    console.log('this.props.dispatch: ', this.props.dispatch);
    console.log('userActions: ', userActions);
    this.props.logout(this.props.user);
  }

  render() {
    return (
      !this.state.isAuthenticating &&
        <div className="">
          {this.props.user.token
          ? <Fragment>
            <h3><Link to="/account">Account</Link></h3>
              <button onClick={this.handleLogout}>Logout</button>
            </Fragment>

          : <Fragment>
              {/* You are not logged in
              <h3><Link to="/login">Login</Link></h3>
              <h3><Link to="/signup">Signup</Link></h3>
              <h3><Link to="/account">Account</Link></h3> */}
            </Fragment>
          }

          <NotificationsProvider>
            <Routes />
          </NotificationsProvider>
        </div>
    );
  }
}

 function mapStateToProps({ user }) {
  return { user };
 }

export default withRouter(connect(mapStateToProps, userActions)(App));
