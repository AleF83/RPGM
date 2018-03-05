const providerStyles = {
  google: {
    text: 'Login with Google',
    icon: 'gplus',
    style: { background: '#cb3f22' },
    activeStyle: { background: '#a5331c' },
  },
  facebook: {
    text: 'Login with Facebook',
    icon: 'facebook',
    style: { background: '#3b5998' },
    activeStyle: { background: '#293e69' },
  },
};

export default providerId => providerStyles[providerId];
