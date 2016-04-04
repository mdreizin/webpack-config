#!/usr/bin/env bash
set -e

cd docs
git init

git config user.name "Marat Dreizin"
git config user.email "marat.dreizin@gmail.com"

git add .
git commit -m "Deploy to GitHub Pages"

git push --force --quiet "https://${GH_TOKEN}@github.com/mdreizin/webpack-config.git" master:gh-pages > /dev/null 2>&1
