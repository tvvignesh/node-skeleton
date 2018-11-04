/**
 * SAMPLE FUNCTION - CAN BE REMOVED
 */
const helloWorld = function (req, res, next) {
    return res.status(200).jsonp({
        message: 'Hello World'
    });
};

export { helloWorld };