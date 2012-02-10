var fs = require('fs');
var path = require('path');
var should = require('should');
var emailTemplate = require('../lib/email-template.js');
var et = new emailTemplate();
var issue;

describe('email-template', function() {
  var sampleHandlebarsText,
      sampleHandlebarsHtml;

  before(function() {
    sampleHandlebarsText = fs.readFileSync(path.join(__dirname, 'output/sample.handlebars.text'), 'utf8');
    sampleHandlebarsHtml = fs.readFileSync(path.join(__dirname, 'output/sample.handlebars.html'), 'utf8');
  });

  describe('#resolveEngine', function() {
    
    it('should resolve engine using path', function() {
      var engine = et.resolveEngine(path.join(__dirname, 'templates/handlebars/sample.text'));
      engine.should.equal('handlebars');
    });

    it('should resolve engine using filename', function() {
      var engine = et.resolveEngine(path.join(__dirname, 'templates/sample.handlebars.text'));
      engine.should.equal('handlebars');
    });
  });

  describe('#render', function() {
    
    beforeEach(function() {
      issue = require('./issue.json');
    });

    it('should return an error if the engine cannot be resolved', function(done) {
      et.render('./templates/sample.text', issue, function(err, output) {
        should.exist(err);
        done();
      });
    });

    it('should return rendered content', function(done) {
      et.render(path.join(__dirname, 'templates/sample.handlebars.text'), issue, function(err, output) {
        should.not.exist(err);
        output.should.be.ok;
        output.should.equal(sampleHandlebarsText);
        done();
      });
    });
    
  });

  describe('#createBodies', function() {

    beforeEach(function() {
      issue = require('./issue.json');
    });

    it('should return text and html', function(done) {
      var templates = {
        text: path.join(__dirname, 'templates/sample.handlebars.text'),
        html: path.join(__dirname, 'templates/sample.handlebars.html')
      };
      et.createBodies(templates, issue, function(err, output) {
        should.not.exist(err);
        output.should.be.ok;
        output.text.should.be.ok;
        output.html.should.be.ok;

        output.html.should.equal(sampleHandlebarsHtml);
        output.text.should.equal(sampleHandlebarsText);
        done();
      });
    });

    it('should return text only', function(done) {
      var templates = {
        text: path.join(__dirname, 'templates/no-html.handlebars.text')
      };
      et.createBodies(templates, issue, function(err, output) {
        should.not.exist(err);
        output.should.be.ok;
        output.text.should.be.ok;
        should.not.exist(output.html);

        output.text.should.equal(sampleHandlebarsText);
        done();
      });
    });

    it('should return html only', function(done) {
      
      var templates = {
        html: path.join(__dirname, 'templates/sample.handlebars.html')
      };
      et.createBodies(templates, issue, function(err, output) {
        should.not.exist(err);
        output.should.be.ok;
        should.not.exist(output.text);
        output.html.should.be.ok;

        output.html.should.equal(sampleHandlebarsHtml);
        done();
      });
    });
  });
});