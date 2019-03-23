/* 
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
*                                                             *
*              SETUP OF APP ACCORDING TO ENVIRONMENT          *
*                                                             *
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*
*
*
*/
console.log('===> NODE_ENV @ KEYS: ', process.env.NODE_ENV);
console.log('===> REACT_APP_STAGE @ KEYS: ', process.env.REACT_APP_STAGE);

const dev = {
  backendUrl: 'https://bestplanapp-dev.herokuapp.com' // TODO: Change it to the correct one
}

const production = {
  backendUrl: 'https://bestplanapp-production.herokuapp.com' // TODO: Change it to the correct one
}

const config = process.env.REACT_APP_STAGE === 'production'
  ? production
  : dev


/**
* Overwrite config.backendUrl if custom input has been set from the console
*/
if (process.env.REACT_APP_BACKEND) {
  const input = process.env.REACT_APP_BACKEND.split(':');

  config.backendUrl = input[1]
    ? `http://localhost:${input[1]}`
    : `https://bestplanapp-${input[0]}.herokuapp.com` // TODO: Change it to the correct one
}

/**
 * Common configuration goes here
 */
export default {
  COMMON_CONFIGURATION_EXAMPLE: 10,
  ...config
};
