const Boom = require('boom');

module.exports = class DefaultScheme {
    static scheme(server, options) {
        return {
          authenticate: async (request, h) => {
            try {
                const { token } = request.payload || request.query;
                if (!token) {
                    console.log('No token')
                    return Boom.unauthorized('Token not included in the request');
                }
                let credentials;
                credentials = await h.decode(token);
                return h.authenticated({ credentials });
              } catch (e) {
                  console.log(e);
                  return Boom.badRequest('Invalid token');
              }
          }
        };
    }
};