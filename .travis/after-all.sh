#!/bin/bash
declare exitCode;
$(npm bin)/travis-after-all
exitCode=$?
if [ $exitCode -eq 0 ]; then
  yarn run build;
  yarn run codeclimate;
  yarn run semantic-release;
  yarn run jsdoc;
  yarn run gh-pages;
fi
