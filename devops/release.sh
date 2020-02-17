#!/bin/bash

echo "What release for version is this?"
read VERSION
echo $VERSION

if [ -z "$VERSION" ]; then
    echo "Version not required, exiting."
    exit
fi

npm version 
npm publish
cd pages
npm run deploy
