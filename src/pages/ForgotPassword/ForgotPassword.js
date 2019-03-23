import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import posed from 'react-pose';
import { userActions } from '../../actions';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./ForgotPassword.css";

const AnimationContainer = posed.div({
  visible: { staggerChildren: 50 }
});

const Div = posed.div({
  visible: { y: 0, opacity: 1, transition: { duration: 500 } },
  hidden: { y: 20, opacity: 0 }
});

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      passwordRequested: false,
      isVisible: false
    };
  }

  componentDidMount() {
    console.log('ForgotPassword.js @ componentDidMount - this.props: ', this.props);
    this.setState({ isVisible: true });
  }

  handleChange = (event) => {
    // The event.target.name contains the "name" from the input
    // and then can be used to target the same named key at this.state
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = async event => {
    event.preventDefault(); // Prevents the native functionality of the form

    this.props.forgotPassword({ email: this.state.email })
      .then(data => {
        this.setState({ passwordRequested: true });
      })
      .catch(err => {
        console.log('err: ', err);
      })
  }

  goBack = () => {
    this.props.history.push('/login')
  }

  renderForm() {
    return (
      <AnimationContainer className="login" pose={this.state.isVisible ? 'visible' : 'hidden'}>
        <form className="forgotPassword__form" onSubmit={this.handleSubmit}>
          <div className="forgotPassword__inputWrapper">

            <Div className="login__logoWrapper">
              <FontAwesomeIcon
                icon={'coins'}
                size={'6x'}
              />
            </Div>
            <Div className="forgotPassword__titleWrapper">
              <h1 className="forgotPassword__title">Lets reset your password</h1>
            </Div>
            <Div className="Div">
              <TextField
                id="outlined-email-input"
                label="Email"
                // className={classes.textField}
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={this.handleChange}
              />
            </Div>
            <Div className="Div">
            </Div>

            <Div className="login__forgotWrapper">
            </Div>

            <Div className="login__buttonWrapper">
              <Button variant="contained" color="primary" type="submit" fullWidth>Reset</Button>
            </Div>

            <Div className="forgotPassword__goBack">
              <p>Changed your mind? <span><Link to="/login">Go back</Link></span></p>
            </Div>
          </div>
        </form>
      </AnimationContainer>
    );
  }

  renderFormSubmitted() {
    return (
      <div className="login">
        <Div className="forgotPassword__form">
          <div className="forgotPassword__requestInfo">
            <h1>Request received!</h1>
            <h3>Please check your email and follow the instructions.</h3>
          </div>

          <Div className="forgotPassword__requestBack">
            <Button variant="contained" color="primary" type="submit" fullWidth onClick={this.goBack}>Back</Button>
          </Div>

        </Div>
      </div>
    )
  }

  render() {
    return (
      <div className="ForgotPassword">
        { !this.state.passwordRequested
          ? this.renderForm()
          : this.renderFormSubmitted()
        }
      </div>
    );
  }

}

function mapStateToProps(state) {
  return { errorLogin: state.user.errorLogin };
 }

export default withRouter(connect(mapStateToProps, userActions)(ForgotPassword));