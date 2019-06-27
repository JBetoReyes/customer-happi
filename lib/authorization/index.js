const DefaultScheme = require('./DefaultScheme');

module.exports = {
  name: 'JWT-Scheme',
  schemeConfig: DefaultScheme.scheme,
  strategy: 'default'
};