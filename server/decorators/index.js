const Walk = new require('../../utils/files/walk');

const getDecorators = async () => {
    return await Walk.files(__dirname);
}

const decorate = (server) => {
    return (decorator) => {
        const { type, name, handler } = decorator;
        server.decorate(type, name, handler)
    }
}

module.exports = async (server) => {
    let decorators = await getDecorators();
    decorators
        .filter(path => !/.*index.js$/.test(path))
        .map((path) => require(path))
        .reduce((acc, current) => { 
            return [
                ...acc,
                ...current 
            ]
        }, [])
        .forEach(decorate(server));
};
