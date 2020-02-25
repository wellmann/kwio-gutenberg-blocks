//
// Script.js loader.
//

'use strict';

const bulk = require('bulk-require');

bulk(__dirname, ['blocks/*/script.js']);