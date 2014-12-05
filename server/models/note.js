'use strict';

var pg = require('../postgres/manager');

function Note(){
}

Note.create = function(user, obj, cb){
  pg.query('select add_note($1, $2, $3, $4)', [user.id, obj.title, obj.body, obj.tags], function(err, results){
    console.log(err, results);
    cb();
  });
};

Note.all = function(userID, cb){
  pg.query('select notes.title, notes.body, notes.created_at, notes.id from notes inner join users on notes.user_id=users.id where notes.user_id=' + userID + ';', [], function(err, results){
    cb(err, results.rows);
  });

};
/*
Note.deleteNote= function(id, cb){
  pg.query('DELETE FROM notes WHERE id=' + id + ';', [], function(err, results){
    cb(err, results.rows);
  });
*/
Note.deleteNote = function(id, cb){
  pg.query('SELECT * FROM delete_note($1)', [id], function(err, results){
    cb(err, results.rows);
  });
};



module.exports = Note;
