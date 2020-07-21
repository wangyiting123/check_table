import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

test('renders learn react link', () => {
  const wrapper = shallow(<App />);
  const linkElement = wrapper.find('#app-dialog');
  console.log(linkElement.debug())
  expect(linkElement.exists()).toBe(false);
});
