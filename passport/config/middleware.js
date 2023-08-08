// Middleware function to set flash messages in res.locals for use in views
module.exports.setflash = function (req, res, next) {
    // Set res.locals.flash object with success and error messages from req.flash
    res.locals.flash = {
        'success': req.flash('success'), // Get success flash messages and store them in 'success' key
        'error': req.flash('error') // Get error flash messages and store them in 'error' key
    };
    // Call the next middleware in the chain
    next();
};
