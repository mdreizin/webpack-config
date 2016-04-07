#!/bin/bash
declare exitCode;
$(npm bin)/travis-after-all
exitCode=$?
if [ $exitCode -eq 0 ] && [ "${TRAVIS_BRANCH}" = "master" ]; then
  npm run gitdown;
  npm run jsdoc;
  npm run gh-pages;
  npm run semantic-release;
fi
