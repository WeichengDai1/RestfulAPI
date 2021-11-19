// contactController.js
// Import contact model
Contact = require('./contactModel');

// Handle index actions
exports.index = function (req, res) {
    try{
        Contact.get(function (err, contacts) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            if(Object.keys(contacts).length === 0)
                    res.json({
                        status: 'no user found',
                        message: 'no user found'
                    });
            else{
                res.json({
                    status: "success",
                    message: "Users retrieved successfully",
                    data: contacts
                });
            }
            
        });
    }catch(e){
        res.json({
            status: "error",
            message: e,
        });
    }
    
};

// Handle create contact actions
exports.new = function (req, res) {
    try{
        var contact = new Contact();
        contact.firstname = req.body.firstname? req.body.firstname: "DEFAULT FIRSTNAME";
        contact.lastname = req.body.lastname? req.body.lastname: "DEFAULT LASTNAME";
        contact.email = req.body.email? req.body.email: "DEFAULT EMAIL";
        contact.address = req.body.address? req.body.address: "DEFAULT ADDRESS";
    // save the contact and check for errors
        contact.save(function (err) {
            // Check for validation error
            if (err)
                res.json(err);
            else
                res.json({
                    message: 'New user created!',
                    data: contact
                });
        });
    }catch(e){
        res.json({
            status: "error",
            message: e,
        });
    }
};

// Handle view contact info
exports.view = function (req, res) {
    try{
       Contact.findById(req.params.contact_id, function (err, contact) {
            if (err)
                res.send(err);
            res.json({
                message: 'user details loading..',
                data: contact
            });
        }); 
    }catch(e){
        res.json({
            status: "error",
            message: e,
        });
    } 
};

// Handle update contact info
exports.update = function (req, res) {
    try{
        Contact.findById(req.params.contact_id, function (err, contact) {
            if (err)
                res.send(err);
            contact.firstname = req.body.firstname? req.body.firstname: contact.firstname;
            contact.lastname = req.body.lastname? req.body.lastname: contact.lastname;
            contact.email = req.body.email? req.body.email: contact.email;
            contact.address = req.body.address? req.body.address: contact.address;
            // save the contact and check for errors
            contact.save(function (err) {
                if (err)
                    res.json(err);
                res.json({
                    message: 'user Info updated',
                    data: contact
                });
            });
        });
    }catch(e){
        res.json({
            status: "error",
            message: e,
        });
    }
};

// Handle delete contact
exports.delete = function (req, res) {
    try{
        Contact.remove({
            _id: req.params.contact_id
        }, function (err, contact) {
            if (err)
                res.send(err);
            res.json({
                status: "success",
                message: 'user deleted'
            });
        });
    }catch(e){
        res.json({
            status: "error",
            message: e,
        });
    }
};