import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import posed from 'react-pose';
import { userActions } from '../../actions';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./ResetPassword.css";

const AnimationContainer = posed.div({
  visible: { staggerChildren: 50 }
});

const Div = posed.div({
  visible: { y: 0, opacity: 1, transition: { duration: 500 } },
  hidden: { y: 20, opacity: 0 }
});

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      tokenValidated: false,
      password: '',
      passwordRepeated: '',
      passwordRequested: false,
      passwordChanged: false,
      isVisible: false
    };
  }

  componentWillMount() {
    console.log('ResetPassword.js @ componentWillMount - this.props: ', this.props);
    const resetToken = this.props.match.params.token;
    if (!resetToken) { return; }

    this.props.validateResetPasswordToken({ resetToken: resetToken })
      .then(res => {
        console.log('res @ componentWillMount @ resetPassword: ', res);
        if (res === 'token exists') {
          this.setState({token: resetToken, tokenValidated: true, isLoading: false });
        }
        else {
          this.setState({token: resetToken, tokenValidated: false, isLoading: false });
        }
      })
      .catch(err => {
        console.log('error @ componentWillMount @ resetPassword: ', err)
      })
  }

  componentDidMount() {
    this.setState({ isVisible: true });
  }

  handleChange = (event) => {
    // The event.target.name contains the "name" from the input
    // and then can be used to target the same named key at this.state
    this.setState({ [event.target.name]: event.target.value });
  }


  handleSubmit = async (event) => {
    event.preventDefault();

    this.props.resetPassword({ password: this.state.password, token: this.state.token })
      .then(() => {
        this.setState({ passwordChanged: true })
      })
      .catch(err => {
        console.log('err @ resetPassword', err);
      })
  };

  validateForm() {
    return (
      this.state.password.length > 0 &&
      this.state.password === this.state.passwordRepeated
    );
  }

  renderTokenValid() {
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
              <h1 className="forgotPassword__title">Create a new password</h1>
            </Div>
            <Div className="Div">
              <TextField
                id="outlined-email-input"
                label="Password"
                // className={classes.textField}
                type="password"
                name="password"
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
          </div>
        </form>
      </AnimationContainer>
    )
  }


  renderTokenInvalid() {
    return (
      <div>
        <h1>Token invalid or has expired. Please repeat the procedure by clicking <Link to="/forgotpassword">here</Link>.</h1>
      </div>
    )
  }

  renderLoading() {
    return (
      <div>
        <h1>...</h1>
      </div>
    )
  }

  renderPasswordChanged() {
    return (
      <div className="login">
        <Div className="forgotPassword__form">
          <div className="forgotPassword__requestInfo">
            <h1>Password Changed!</h1>
            <h3>Click <Link to="/login">here</Link> to login.</h3>
          </div>
        </Div>
      </div>
    )
  }

  render() {
    return (
      <div className="ResetPassword">
        { this.state.isLoading
          ? this.renderLoading()
          : this.state.tokenValidated
            ? this.state.passwordChanged
              ? this.renderPasswordChanged()
              : this.renderTokenValid()
            : this.renderTokenInvalid()
        }
      </div>
    );
  }

}

function mapStateToProps(state) {
  return { errorLogin: state.user.errorLogin };
 }

export default withRouter(connect(mapStateToProps, userActions)(ResetPassword));