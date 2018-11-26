const assert = require('assert');
const User = require('../src/user');

function insertData() {
  
    if (User.findOne({name: 'Dummy1'})) {
        let i = 0;
        for (i = 1; i <= 5; i++) {
        
            const d = i.toString();
            const dummyUser = new User({ name: 'Dummy' + d, password: 'dummypass' + d });
            dummyUser.save();
            User.collection.insert(dummyUser);
            User.collection.save();
            if (User.findOne({name: dummyUser.name})) {
            console.log(dummyUser);
            }
        }
        return true;
    }
    return false;
}

exports.insertData = insertData();