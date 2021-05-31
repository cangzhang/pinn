#!/bin/bash

set -eo pipefail

yarn build
cd build/
git init .
git remote add origin https://github.com/cangzhang/pinn.git
git checkout -b gh-pages
git add .
git commit -m "update"
git push origin -u gh-pages -f
echo "Published to pages!"
cd ../
