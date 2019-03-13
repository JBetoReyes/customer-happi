const fs = require('fs');
const path = require('path');
const publicKey = fs.readFileSync(path.resolve(__dirname, '../..', 'public.key'));
const jwt = require('jsonwebtoken');
const Boom = require('boom');

module.exports = class DefaultAuthScheme {
  static scheme(server, options) {
      return {
          authenticate: this.authHandler.bind(this),
      }
  }

  static async authHandler(request, h) {
      const payload = request.payload || request.query;
      const { token } = payload;
      if (!token) {
          throw Boom.unauthorized(null, 'Custom');
      }
      let credentials;
      try {
        credentials = await this.decodeToken(token, publicKey);
        return h.authenticated({ credentials });
      } catch (err) {
          console.log(err);
          h.unauthenticated(err);
      }
  }

  static async decodeToken(token, publicKey) {
      return new Promise((resolve, reject) => {
          jwt.verify(token, publicKey, (err, decodedToken) => {
              if (err) {
                  reject(err);
              }
              resolve(decodedToken);
          });
      });
  }
};