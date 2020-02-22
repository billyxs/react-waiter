#!/bin/bash

git checkout master
git pull origin master

echo -e "\nWhat version is this release?"
read NEWVERSION 

git checkout -b release/$NEWVERSION

BRANCH=$(git rev-parse --abbrev-ref HEAD)
VERSION=$(echo $BRANCH  | cut -d/ -f 2)

echo "Branch: $BRANCH\n"
echo "Create release for version $VERSION? y/n"
read isyes 

if [ $isyes != "yes" ] && [ $isyes != "y" ]; then
    echo "Canceling release for $VERSION."
    echo "Maybe next time."
    exit
fi

npm version $VERSION
npm publish
cd pages
npm run deploy
cd ../

git push origin $BRANCH
