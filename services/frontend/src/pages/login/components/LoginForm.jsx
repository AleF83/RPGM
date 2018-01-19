import React from 'react';
import styled from 'react-emotion';

const MainElement = styled('div')`
    flex: 1;
    border: 1px solid black;
`;

const Username = styled('input')`
    display: block;
`;

const Password = styled('input')`
    display: block;
`;

const RememberMeCheckbox = styled('input')`
`;

const RememberMeLabel = styled('label')`
`;

const Row = styled('div')`

`;

const SignUpButton = styled('button')`
`;

const ForgotPasswordButton = styled('button')`
`;

const LoginButton = styled('button')`
    
`;

const onClick = () => {
  console.log('Hey!');
};

const LoginForm = () => (
  <MainElement>
    <div>User Password</div>
    <Username type="text" placeholder="Username" />
    <Password type="text" placeholder="Password" />
    <RememberMeCheckbox id="rememberMe" type="checkbox" />
    <RememberMeLabel for="rememberMe">Remember me</RememberMeLabel>
    <Row>
      <SignUpButton onClick={onClick}>Sign Up</SignUpButton>
      <ForgotPasswordButton>Forgot password</ForgotPasswordButton>
    </Row>
    <LoginButton>Login</LoginButton>
  </MainElement>
);

export default LoginForm;
