/*
*
*   Create a custom page class (proxy) to extend puppeteers page class
*
*/

const puppeteer = require('puppeteer');
const userFactory = require('../factories/userFactory');

// const passport = require('passport');
// const jwt = require('jwt-simple');
// const keys = require('../../config/keys');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  // sub: subject
  // iat: issued at time
  return jwt.encode({ sub: user._id, iat: timestamp }, keys.secretJwt);
}

class CustomPage {
  /*
  *   STATIC FUNCTIONS CAN BE CALLED WITHOUT CREATING A NEW INSTANCE OF THE CLASS
  *   headless: Prevents puppeteer from actually opening a browser window to display
  *   args: Added to speed up when testing in CI
  */
  static async build() {
    const browser = await puppeteer.launch({
      headless: true,        // True: No browser appears (mandatory on travis etc testing)
      args: ['--no-sandbox'] // ,'--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    const customPage = new CustomPage(page);

    return new Proxy(customPage, {
      get: function(target, property) {
        return customPage[property] || browser[property] || page[property]
      }
    });
  }

  constructor(page) {
    this.page = page;
  }

  /*
  *   FAKE LOGIN A USER
  */
  async login() {
    // Create a fake user and session
    const user = userFactory('verified');
    console.log('user: ', user);
    const token = tokenForUser(user);
    console.log('token: ', token);

    // Refresh the page and navigate to main blogs route
    await this.page.goto(keys.frontendUrl);

    console.log('end of login');

    // Wait until the element appears in screen
    // await this.page.waitFor('a[href="/auth/logout"]');
  }

  /*
  *   GET THE TEXT CONTENT OF AN HTML ELEMENT ON THE PAGE
  */
  async getContentsOf(selector) {
    return this.page.$eval(selector, (el) => el.innerHTML); 
  }

  /*
  *   ROUTE REQUESTS
  */
  get(path) {
    return this.page.evaluate((_path) => {
      return fetch(_path, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
    }, path);
  }

  post(path, data) {
    return this.page.evaluate((_path, _data) => {
      return fetch(_path, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(_data)
      }).then(res => res.json());
    }, path, data);
  }

  /*
  *   HELPER FUNCTION THAT TAKES ARRAY OF ACTIONS AND EXECUTES THE REQUESTS
  */
  execRequests(actions) {
    return Promise.all(
      actions.map(action => {
        return this[action.method](action.path, action.data);
      }));
    }
  }

module.exports = CustomPage;
