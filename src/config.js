var apiUrl = 'http://still-scrubland-9880.herokuapp.com';

module.exports = {
  development: {
    isProduction: false,
    port: 3000,
    apiUrl: apiUrl
  },
  production: {
    isProduction: true,
    port: process.env.PORT,
    apiUrl: apiUrl
  }
}[process.env.NODE_ENV || 'development'];
