module.exports.keyValue = function (arg) {
    const obj = {};
    let key = arg.split("=")[0];
    let value = arg.split("=")[1];
    obj[key] = value;
    return obj;
};
