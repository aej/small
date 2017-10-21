#!/bin/sh

if [ -n "$LOCAL_DEV" ];
then
    echo "Starting frontend in development mode"
    npm run start
else
    echo "Starting frontend in production mode"
    npm install -g http-server
    yarn upgrade
	yarn build
	cd build
	hs -p 3000
fi
