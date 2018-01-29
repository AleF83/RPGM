/* global test expect */
import React from 'react';
import renderer from 'react-test-renderer';
import LoginPage from '../../../pages/login/LoginPage';

test('Login Page test', () => {
  const component = renderer.create(<LoginPage />);
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
