const Walk = require('../../utils/files/walk');

module.exports = class RouteFactory {
    
    constructor() {
        this._initFactory();
    }

    _initFactory() {
    }

    static async _getRoutes(dirName) {
        this.filesToIgnore = [
            'index',
            'baseRouter'
        ];
        const regexString = this.filesToIgnore.join('|');
        const regex = new RegExp(`.*(${regexString}).js`);
        const paths = await Walk.filesDeep(dirName);
        return (paths || [])
            .filter((servicePath) => !regex.test(servicePath))
            .map((servicePath) => require(servicePath))
    }

    static async routesAsPlugins(dirName) {
        const routes = await this._getRoutes(dirName);
        return routes.reduce((allPlugins, route) => {
            const configs = route.getConfigs();
            const currentPlugins = configs.map((pluginConfig) => {
                return this._buildPlugin(pluginConfig);
            });
            return [
                ...allPlugins,
                ...currentPlugins
            ]
        }, [])
    }

    static _buildPlugin(pluginConfig) {
        const {
            name = '',
            version = '0.0.1'
        } = pluginConfig;
        const routeConfig = this._buildRouteConfig(pluginConfig);

        return {
            name,
            version,
            register: async function (server, options) {
                server.route(routeConfig);
            }
        };
    }

    static _buildRouteConfig(config) {
        const route = {
            method: config.method,
            path: config.path,
            config: {
                handler: config.handler,
                description: config.description
            }
        };

        if (config.pre) {
            route.config.pre = config.pre;
        }
        if (config.auth) {
            route.config.auth = config.auth;
        }

        return route;
    }

};
