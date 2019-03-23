import React, { Component } from "react";
import "./Home.css";
import { withNotifications } from "../../hocs/WithNotifications";

class Home extends Component {

  componentDidMount() {
    console.log('this.props: ', this.props);
  }

  render() {
    return (
      <div className="home">
        <div className="lander">
          <h1>Main Page</h1>
          <p>Only visible to logged in users</p>
        </div>
      </div>
    );
  }
}

// Example using the context API to give access to notifications on this component
// It can now find the state in its props (this.props.notifications)
export default withNotifications(Home);