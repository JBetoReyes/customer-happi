const Walk = require('../../utils/files/walk');

module.exports = class ServiceFactory {

    static async getServices() {
        const paths =  await Walk.filesDeep(__dirname);
        return (paths || [])
                .filter((servicePath) => !/.*\/(entityService|serviceFactory|index).js/.test(servicePath))
                .map((servicePath) => {
                    const Service = require(servicePath);
                    return new Service();
                });
    }

    static async buildPlugins() {
        const services = await this.getServices();
        return services.reduce((plugins, service) => {
            const configs = service.getConfigs();
            const currentPlugins = configs.map((config) => {
                return this.buildPlugin(config);
            });
            return [
                ...plugins,
                ...currentPlugins
            ];
        }, []);
    };

    static buildPlugin(pluginConfig) {
        const { 
            name = '',
            version = '0.0.1',
        } = pluginConfig;
        const routeConfig = this.buildRouteConfig(pluginConfig);

        return {
            name,
            version,
            register: async function (server, options) {
                server.route(routeConfig);
            }
        }
    }

    static buildRouteConfig(config) {
        const newConfig = {
            method: config.method,
            path: config.path,
            config: {
                handler: config.handler,
                description: config.description
            }
        };

        if(config.pre) {
            newConfig.pre = config.pre;
        }
        return newConfig;
    }

};