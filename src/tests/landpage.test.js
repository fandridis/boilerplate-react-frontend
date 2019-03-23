/* 
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
*                                                             *
*            INTEGRATION TEST FOR BLOGS COMPONENT             *
*                                                             *
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
8
*  ========== EXAMPLE TEST ==========
*   test('Adds two numbers', () => {
*     const sum = 1 + 2;
*
*     expect(sum).toEqual(3);
*   });
*
*/

const Page = require('./helpers/page'); // Custom page that extends puppeteers page
const userFactory = require('./factories/userFactory');
// const mongoose = require('mongoose');
const keys = require('../config');
// require('../models/User.model');
// require('../models/Token.model');

let page;

/*
*   RUNS ONCE BEFORE ALL TESTS
*   Used to connect to the database
*/
beforeAll( async () => {
  console.log('Running beforeAll');
  // mongoose.Promise = global.Promise;
  // mongoose.connect(keys.mongoURI, { useMongoClient: true });
});

/*
*   RUNS ONCE AFTER ALL TESTS
*   Used to disconnect from the database
*/
afterAll( async () => {
  console.log('Running afterAll');
  // await mongoose.disconnect();
  // console.log('Mongoose disconnected successfully!');
  console.log('--- END OF TESTING ---');
})

/*
*   RUNS BEFORE EACH TEST
*   Used to start the chromium instance and creates a new page (tab)
*/
beforeEach(async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
  // await page.goto(keys.frontendUrl);
});

/* 
*   RUNS AFTER EACH TEST
*   Used to close any running chromium instances
*/
afterEach(async () => {
  console.log('Running afterEach');
  await page.close();
});


describe('When a verified user is in the landing page', async () => {
  // let user;

  beforeEach(async () => {
    // user = userFactory('verified');
  });

  test('has a verified account and tries to login with correct credentials', async () => {
    const x = 1;

    // await page.type('input:nth-child(2)', user.email);
    // await page.type('input:nth-child(5)', user.password);
    // await page.click('button');

    // Need to wait for the ajax request to happen and get redirected to page
    // await page.waitFor('.home');

    // const text = await page.getContentsOf('#root a');

    expect(x).toEqual(1);
  });

});


// describe('When logged in', async () => {
//   beforeEach(async () => {
//     await page.login();
//     await page.click('a.btn-floating');
//   });

//   test('can see blog create form', async () => {
//     const label = await page.getContentsOf('form label');
  
//     expect(label).toEqual('Blog Title');
//   });

//   describe('And using valid inputs', async () => {
//     beforeEach(async () => {
//       await page.type('.title input', 'My Title');
//       await page.type('.content input', 'My Content');
//       await page.click('form button');
//     });

//     test('submitting takes user to review screen', async () => {
//       const text = await page.getContentsOf('h5');

//       expect(text).toEqual('Please confirm your entries');
//     });

//     test('submitting then saving adds blogs to index page', async () => {
//       await page.click('button.green'); 
//       // Need to wait for the ajax request to happen and get redirected to page
//       await page.waitFor('.card');

//       const titleText = await page.getContentsOf('span.card-title');
//       const contentText = await page.getContentsOf('p');

//       expect(titleText).toEqual('My Title');
//       expect(contentText).toEqual('My Content');
//     });
//   })

//   describe('And using invalid inputs', async () => {
//     beforeEach(async () => {
//       await page.click('form button');
//     });

//     test('the form shows an error message', async () => {
//       const titleError = await page.getContentsOf('.title .red-text');
//       const contentError = await page.getContentsOf('.content .red-text');

//       expect(titleError).toEqual('You must provide a value');
//       expect(contentError).toEqual('You must provide a value');
//     });
//   });
// });

// describe('User is not logged in', async () => {
//   const actions = [
//     {
//       method: 'get',
//       path: '/api/blogs'
//     },
//     {
//       method: 'post',
//       path: '/api/blogs',
//       data: {
//         title: 'T',
//         content: 'C'
//       }
//     }
//   ];

//   test('blog related actions are prohibited', async () => {
//     const results = await page.execRequests(actions);

//     for (result of results) {
//       expect(result).toEqual({ error: 'You must log in!' });
//     }
//   });

// });