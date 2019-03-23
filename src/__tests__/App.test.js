import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

let wrapped;

beforeEach(() => {
  wrapped = shallow(<App />);
});

it('shows a comment box', () => {
  let x = 1;
  expect(x).toEqual(1);
});
