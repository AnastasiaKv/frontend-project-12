const isProduction = process.env.NODE_ENV === 'production';

export default () => ({
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: isProduction,
  payload: {
    environment: isProduction ? 'production' : 'development',
  },
});
