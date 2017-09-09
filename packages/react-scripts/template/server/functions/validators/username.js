module.exports = function(username){return (typeof username === "string" && username.length > 0 && /^[a-zA-Z0-9]+$/.test(username))}
