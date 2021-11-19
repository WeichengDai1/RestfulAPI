Contact = require('./contactModel');
exports.view = function (req, res) {
    try{
        Contact.find(req.query, async (err, contact)=>{
            if (err)
                    res.send(err);
            if(Object.keys(contact).length === 0)
                    res.json({
                        status: 'no user found',
                        message: 'no user found'
                    });
            else{
                res.json({
                    status: 'success',
                    message: 'user details loading..',
                    data: contact
                });
            }
            
                // console.log(req.query);
        });
    }catch(e){
        res.json({
            message: 'error',
            data: e
        });
    }
    
}