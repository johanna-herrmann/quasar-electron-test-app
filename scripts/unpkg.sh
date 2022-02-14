#!/bin/bash

# copies dist files from dependencies to src/unpkg due to issues with using them directly via nodejs
# discussion about this: https://github.com/quasarframework/quasar/discussions/12476
# at the moment we are talking about pouchdb and pouchdb-adapter-cordova-sqlite
# if the issue happens to other dependencies, add them here
# stop to do this workaround when issue is solved

cp ./node_modules/pouchdb/dist/pouchdb.min.js ./src/unpkg/pouchdb.js
cp ./node_modules/pouchdb-adapter-cordova-sqlite/dist/pouchdb.cordova-sqlite.min.js ./src/unpkg/pouchdb.cordova-sqlite.js
