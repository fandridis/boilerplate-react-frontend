import React, { Component } from "react";
import "./SocialRedirect.css";
import { connect } from 'react-redux';
import { userActions } from '../../actions';

class SocialRedirect extends Component {
  componentWillMount() {
    console.log('componentWillMount this.props: ', this.props);
   // let token = this.getCookie("socialToken");
   // console.log('token @ componentWillMount: ', token);

   //If the URL of your page is https://example.com/?name=Jonathan&age=18 you could parse out the 'name' and 'age' parameters using:

    console.log('tokenunparsed: ', this.props.location.search);

    console.log('token: ', this.props.location.search.split('?token=')[1]);

    const tokenParam = this.props.location.search.split('?token=')[1];

    this.props.socialLogin({ token: tokenParam }, (res) => {
      console.log('callback fired - removing the cookie');
      // document.cookie = "socialToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });
  }

  getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) { return match[2]; }
  }

  render() {
    return <div></div>;
  }
}

// function mapStateToProps(state) {
//   return { errorLogin: state.auth.errorLogin };
// }

export default connect(null, userActions )(SocialRedirect);