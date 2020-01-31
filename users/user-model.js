const db require('../database/dbConfig');


module.exports = {
    addUser,
    findBy,
}

//Need a function for adding users, and one for finding by username
//

//Adding user:

async function addUser(user) {
    return db('users')
    .insert(user);
}

//Finding user:

function: findBy(username) {
    return db('users')
    .where("username", username);
}
