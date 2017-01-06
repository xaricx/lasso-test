"use strict"

const template = require("./index.marko")

module.exports = (req, res) => {
  template.render({}, res)
}