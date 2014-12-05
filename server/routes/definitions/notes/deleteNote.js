'use strict';

var //Joi  = require('joi'),
    Note = require('../../../models/note');

module.exports = {
    description: 'List of all notes',
    tags:['notes'],
    auth: {
        mode: 'required'
    },
    handler: function(request, reply){
        Note.deleteNote(request.auth.credentials.id, function(err, notes){
            if(!err){reply(notes).code(200);
            }else{reply().code(400);
            }
        });
    }
};
