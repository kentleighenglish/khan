#!/bin/sh

source ../.env > /dev/null 2>&1;

if [ "$NODE_ENV" == 'production' ]
then
	node index
else
	export NODE_ENV='development';
	nodemon index;
fi