module.exports = (text) => {
    return /.*s$/.test(text) ? text : `${text}s`;
}