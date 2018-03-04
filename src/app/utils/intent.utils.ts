'use strict';

/**
 * Module dependencies.
 */
var config = require('../../config/config');
var request = require('request');

exports.getIntent = function(text,callback){
    var userInput = encodeURI(text);
    var options = {
        uri: "https://api.wit.ai/message?q=" + userInput,
        headers: {
            'Accept': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer '+config.ai.wit.accessToken
        },
        json: true
    };

    var intentResponse={
        intent: 'Unknown',
        entity: {}
    };
    request(options, function (error, response, body) {

        if(body.entities.number){
            for (var i = 0; i < body.entities.number.length; i++) {
                if (body.entities.number[i].confidence >= 0.8) {
                    intentResponse.entity["number"] = body.entities.number[i].value;
                    break;
                }
            }
        }

        if(body.entities.intent){
            for (var i = 0; i < body.entities.intent.length; i++) {
                if (body.entities.intent[i].confidence >= 0.8) {
                    intentResponse.intent = body.entities.intent[i].value;
                    break;
                }
            }
        }

        return callback(null, intentResponse);
    });
};