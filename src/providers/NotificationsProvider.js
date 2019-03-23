import React from 'react';
import { withSnackbar } from 'notistack';

export const NotificationsContext = React.createContext();

class NotificationsProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showSuccess: (text) => { this.showNotification('success', text) },
      showError: (text) => { this.showNotification('error', text) },
      showWarning: (text) => { this.showNotification('warning', text) },
      showInfo: (text) => { this.showNotification('info', text) },
    };
  }

  showNotification = (type, text) => {
    this.props.enqueueSnackbar(text, { 
      variant: type, 
      anchorOrigin: { vertical: 'top', horizontal: 'center'} 
    });
  }

  render() {
    return (
      <NotificationsContext.Provider value={this.state}>
        {this.props.children}
      </NotificationsContext.Provider>
    );
  }
}

export default withSnackbar(NotificationsProvider);
