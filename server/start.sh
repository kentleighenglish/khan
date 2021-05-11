
source './.env';

if [ $1 ]
then
	if [ $1 == '--production' ]
	then
		export NODE_ENV='production'
		node index.js
	else
		export NODE_ENV='development'
		nodemon index.js
	fi
else
	export NODE_ENV='development'
	nodemon index.js
fi