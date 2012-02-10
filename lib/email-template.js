var _ = require('underscore');
var async = require('async');
var cons = require('consolidate');
var engines = Object.keys(cons);

var emailTemplate = module.exports = function() {
  var self = this;

  this.resolveEngine = function (template) {
    return _.find(engines, function(e) { return template.indexOf(e) !== -1; });
  };

  this.render = function(template, data, callback) {
    var engine = self.resolveEngine(template);
    if(!engine) {
      return callback('Could not determine template engine from file: ' + template + '\nMake sure the name of the engine is part of the filename or path.');
    }
    cons[engine](template, data, function (err, output) {
      if(err) {
        console.error(err);
      }
      callback(err, output);
    });
  };

  this.createBodies = function(templates, data, callback) {
    
    async.auto({
      'text': function(callback) {
        if(!templates.text) {
          return callback();
        }
        self.render(templates.text, data, callback);
      },
      'html': function(callback) {
        if(!templates.html) {
          return callback();
        }
        self.render(templates.html, data, callback);
      }
    }, function(err, results) {
      callback(err, {text: results.text, html: results.html});
    });
  };
};

