const debug = require('debug')('app:routesFactory');

module.exports = class RouterToPluginFactory {

    static routersAsPlugins(routers) {
        const plugins = routers.reduce((appPlugins, router) => {
            const routerPlugins = router
                .getConfigs()
                .map((flatConfig) => {
                    return this._buildPlugin(flatConfig);
                });
            return [
                ...appPlugins,
                ...routerPlugins
            ]
        }, []);
        return plugins;
    }

    static _buildPlugin(flatConfig) {
        const {
            name,
            version = '0.0.1'
        } = flatConfig;
        const routeConfig = this._buildRouteConfig(flatConfig);

        return {
            name,
            version,
            register: (server) => {
                debug(`Registering ${ name } route`);
                server.route(routeConfig);
            }
        }

    }

    static _buildRouteConfig(flatConfig) {
        return {
          method: flatConfig.method,
          path: flatConfig.path,
          config: {
              handler: flatConfig.handler,
              description: flatConfig.description
          }
        };
    }
};