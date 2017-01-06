"use strict"

// turn off write-to-disk for Lambda
require("marko/express")
require("marko/node-require").install()
require('lasso/node-require-no-op').enable('.css');

const express = require("express")
  , app = express()
  , serveStatic = require('serve-static')
  , path = require("path")

const isProduction = false;

// Configure the RaptorJS Optimizer to control how JS/CSS/etc. is
// delivered to the browser
require('lasso').configure({
    plugins: [
        //'lasso-less', // Allow Less files to be rendered to CSS
        'lasso-marko', // Allow Marko templates to be compiled and transported to the browser
        // {
        //     plugin: 'minprops/lasso',
        //     enabled: isProduction
        // }
    ],
    outputDir: __dirname + '/static', // Place all generated JS/CSS/etc. files into the "static" dir
    bundlingEnabled: isProduction, // Only enable bundling in production
    minify: isProduction, // Only minify JS and CSS code in production
    fingerprintsEnabled: isProduction, // Only add fingerprints to URLs in production
});

// setup express
app.use('/static', serveStatic(path.join(__dirname, "static")))

app.get("/", require("./pages/home"))

app.listen(8080, () => {
  console.log("Listening on port 8080")
})