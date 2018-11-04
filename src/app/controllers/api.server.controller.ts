/**
 * SAMPLE FUNCTION - CAN BE REMOVED
 */
const helloWorld = function (req, res) {
    return res.status(200).jsonp({
        message: 'Hello World'
    });
};

export { helloWorld };