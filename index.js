var emailTemlate = require('./lib/email-template.js');
var et = new emailTemlate();

module.exports.createBodies = et.createBodies;