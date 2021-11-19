Contact = require('./contactModel');
exports.view = function (req, res) {
    Contact.find(req.query, function (err, contact){
        if (err)
                res.send(err);
            res.json({
                message: 'user details loading..',
                data: contact
            });
    });
}