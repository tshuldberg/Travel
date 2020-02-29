const User = require('../models/user')

module.exports = {
    create
}

function create(req, res) {
    User.findById(req.params.id, function(err, User) {
      User.wishes.push(req.body);
    
      User.save(function(err) {
        if(err) console.log(err)
        res.redirect('/Users');
      });
    });
  }