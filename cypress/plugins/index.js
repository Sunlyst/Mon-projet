/// <reference types='cypress-tags'/>
const cucumber = require('cypress-cucumber-preprocessor').default
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const tagify = require('cypress-tags')
module.exports = (on, config) => {
    allureWriter(on, config);
    on('file:preprocessor', tagify(config))
    on('file:preprocessor', cucumber())
    return config;
}