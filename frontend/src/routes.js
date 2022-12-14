const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  getDataPath: () => [apiPath, 'data'].join('/'),

  chatPage: () => '/',
  loginPage: () => '/login',
  signupPage: () => '/signup',
};
