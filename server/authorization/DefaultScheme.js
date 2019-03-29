module.exports = class DefaultScheme {
    static scheme(server, options) {
        return {
          authenticate: async (request, h) => {
              const { token } = request.payload || request.query;
              if (!token) {
                  return h.unauthorized('Token not included in the request');
              }
              let credentials;
              try {
                  credentials = await h.decode(token);
                  return h.authenticated({ credentials });
              } catch (e) {
                  return h.badRequest(e);
              }
          }
        };
    }
};
