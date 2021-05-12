#!/bin/sh

if [ -f ../.env ];
then
	source "../.env";
fi

if [ "$NODE_ENV" == 'production' ]
then
	node index
else
	export NODE_ENV='development';
	nodemon index;
fi