module.exports = class BaseRouterFactory {

    static routesAsPlugins(routers) {
        const plugins = routers.reduce((appPlugins, router) => {
            const routerPlugins = router
                .getConfigs()
                .map((flatConfig) => {
                    return this._buildPlugin(flatConfig);
                });
            return [
                ...appPlugins,
                ...routerPlugins
            ];
        }, []);
        return plugins;
    }

    static _buildPlugin(flatConfig) {
        const {
            name = '',
            version = '0.0.1'
        } = flatConfig;
        const routeConfig = this._buildRouteConfig(flatConfig);

        return {
            name,
            version,
            register: function(server, options) {
                server.route(routeConfig);
            }
        }

    }

    static _buildRouteConfig(flatConfig) {
        const routeConfig = {
          method: flatConfig.method,
          path: flatConfig.path,
          config: {
              handler: flatConfig.handler,
              description: flatConfig.description,
          }
        };

        const optionalConfigs = [
            'pre'
        ];

        optionalConfigs.forEach((optConf) => {
            if (flatConfig[optConf]) {
                routeConfig.config[optConf] = [flatConfig[optConf]];
            }
        });

        return routeConfig;
    }
};
