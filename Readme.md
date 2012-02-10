email-template is a simple library used to render both a text and html template for a given data context.

usage is easy:

```javascript
et.createBodies({text: path.join(__dirname, 'email/success.handlebars.text')}, data, callback);
```

The templating engine is determined by trying to match one of the exports from [conosolidate.js](https://github.com/visionmedia/consolidate.js) with the filename, so you can either include the engine in the filename or in the path.  Any of these will work:

sample.ejs.text
./handlebars/sample.html