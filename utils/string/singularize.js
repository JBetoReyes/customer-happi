module.exports = (text) => {
    return /.*s$/.test(text) ? text.substring(0, text.length - 1) : text;
}