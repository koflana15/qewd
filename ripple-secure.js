/*

 ----------------------------------------------------------------------------
 | qewd-ripple: QEWD-based Middle Tier for Ripple OSI                       |
 |                                                                          |
 | Copyright (c) 2016-17 Ripple Foundation Community Interest Company       |
 | All rights reserved.                                                     |
 |                                                                          |
 | http://rippleosi.org                                                     |
 | Email: code.custodian@rippleosi.org                                      |
 |                                                                          |
 | Author: Rob Tweed, M/Gateway Developments Ltd                            |
 |                                                                          |
 | Licensed under the Apache License, Version 2.0 (the "License");          |
 | you may not use this file except in compliance with the License.         |
 | You may obtain a copy of the License at                                  |
 |                                                                          |
 |     http://www.apache.org/licenses/LICENSE-2.0                           |
 |                                                                          |
 | Unless required by applicable law or agreed to in writing, software      |
 | distributed under the License is distributed on an "AS IS" BASIS,        |
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. |
 | See the License for the specific language governing permissions and      |
 |  limitations under the License.                                          |
 ----------------------------------------------------------------------------

  12 October 2017

*/

var ewdRipple = require('qewd-ripple/lib/startup');

var config = {
  auth0: {
    domain:       'summarycarerecord.eu.auth0.com',
    clientID:     'IL5pkuv5wyHggkp0P58YkkP8B36yTI0M',
    callbackURL:  'http://localhost:8081/auth0/token',
    clientSecret: 'VjliL6NUHU6omKqbvAufarZpOeXlFXI3YdM4mXJ1rBqpmAS_bay-vsM7ITw590ST',
    indexURL: '/index.html',
    connections: ['Username-Password-Authentication', 'google-oauth2', 'twitter']
  },
  port: 8081,
  poolSize: 2,
  ripple: {
    mode: 'secure'
  },
  database: {
    type: 'redis'
  },
  bodyParser: require('body-parser'), // over-rides default setting for limit
  cors: true,
  ssl: false // SSL handled by nginx proxy

};

config.addMiddleware = function(bodyParser, app) {

  app.use(bodyParser.json({limit: '1mb'}));
  app.use(bodyParser.urlencoded({limit: '1mb', extended: true}));

  require('body-parser-xml')(bodyParser);
  app.use(bodyParser.xml({
     limit: '1MB',
     xmlParseOptions: {
        explicitArray: false
     }
  }));
};

ewdRipple.start(config);
