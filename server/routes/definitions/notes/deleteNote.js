'use strict';

var Joi = require('joi'),
    Note = require('../../../models/note');

module.exports = {
    description: 'Delete a Notes',
    tags:['notes'],
    validate: {
        params: {
            id: Joi.number()
        }
    },
    handler: function(request, reply){
        Note.deleteNote(request.params.id, function(err, result){
            reply(result);
        });
    }
};
