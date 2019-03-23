import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import posed from 'react-pose';
import { userActions } from '../../actions';
//import InfoGeneralModal from '../modals/InfoGeneral';
import { withNotifications } from '../../hocs/WithNotifications';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./Signup.css";

const AnimationContainer = posed.div({
  visible: { staggerChildren: 50 }
});

const Div = posed.div({
  visible: { y: 0, opacity: 1, transition: { duration: 500 } },
  hidden: { y: 20, opacity: 0 }
});

const BlackDiv = posed.div({
  normal: { x: 0 },
  away: { x: 300 }
})

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      passwordRepeated: "",
      confirmationCode: "",
      newUser: null,
      modalIsOpen: false,
      signedUp: false,
      isVisible: false,
    };
  }
  
  componentDidMount() {
    this.setState({ isVisible: true })
    console.log('this.props: ', this.props);
    console.log('userActions: ', userActions);
  }

  // createNotification = ({text, type = 'default' }) => {
  //   this.props.enqueueSnackbar(text, { 
  //     variant: type, 
  //     anchorOrigin: { vertical: 'top', horizontal: 'center'} 
  //   });
  // }


  toggle = e =>
    this.setState(state => ({
      index: state.index === 2 ? 0 : state.index + 1,
    }))

  handleChange = (event) => {
    // The event.target.name contains the "name" from the input
    // and then can be used to target the same named key at this.state
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    this.props.signup({ email: this.state.email, password: this.state.password })
      .then(user => {
        this.setState({ signedUp: true });
      })
      .catch(err => { 
        console.log('this.props: ', this.props);
        this.props.notifications.showError(err);
        // this.createNotification({ text: err, type: 'error' })
      })
  };

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.passwordRepeated
    );
  }

  goBack = () => {
    this.props.history.push('/login')
  }

  renderForm() {
    return (
      <AnimationContainer className="login" pose={this.state.isVisible ? 'visible' : 'hidden'}>
        <form className="login__form" onSubmit={this.handleSubmit}>
          <BlackDiv className="login__right" pose={this.state.isVisible ? 'normal' : 'away'}>
            <p>INFORMATION SLIDES</p>
          </BlackDiv>

          <div className="signup__left">
            <div className="login__inputWrapper">

              <Div className="login__logoWrapper">
                <FontAwesomeIcon
                  icon={'coins'}
                  size={'6x'}
                />
              </Div>
              <Div>
                <h1 className="login__title">Create a free account</h1>
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
                <TextField
                  id="outlined-password-input"
                  label="Password"
                  // className={classes.textField}
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  onChange={this.handleChange}
                />
              </Div>
              
              <Div className="login__forgotWrapper">
                {/* Left for looking exactly the same as the login */}
              </Div>
              <Div className="login__buttonWrapper">
                <Button variant="contained" color="primary" type="submit" fullWidth>Register</Button>
              </Div>

              <Div className="login__registerWrapper">
                <p>Already have an account? <span><Link to="/login">Login here</Link></span></p>
              </Div>
            </div>
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
            <h1>Congratulations!</h1>
            <h3>You are nearly there! Please check your emails to verify your account and continue.</h3>
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
      <div className="Signup">
      { !this.state.signedUp
        ? this.renderForm()
        : this.renderFormSubmitted()
      }
      </div>

    )
  }
}

function mapStateToProps(state) {
  return { errorSignup: state.user.errorSignup };
 }
 
 /* 
 * Optimized by grabbing only the piece of state needed
 *
 * function mapStateToProps({ auth }) {
 *   return { errorMessage: auth.errorMessage };
 * }
 */
 
 export default withNotifications(withRouter(connect(mapStateToProps, userActions)(Signup)));

