/**
 * SAMPLE FUNCTION - CAN BE REMOVED
 * @param req Request
 * @param res Response
 */
export const helloWorld = function(req, res) {
    return res.status(200).jsonp({
        message: 'Hello World!'
    });
};
