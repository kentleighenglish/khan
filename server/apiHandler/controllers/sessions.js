const { sessions } = require('config');
const dblib = require('../../dblib');

const { sessionTimeout } = sessions;

const destroy = async ({ sid }) => {
	if (!sid) { throw 'SID not provided' }

	const response = await dblib.run(dblib.r.table('sessions').get(sid).delete());

	if(!response) { throw `Session ${sid} not found` }

	return response;
}

const get = async ({ sid }) => {
	if (!sid) { throw 'SID not provided' }

	const response = await dblib.run(dblib.r.table('sessions').get(sid));

	if(!response) { throw `Session ${sid} not found` }

	return response;
}

const set = async ({ sid, session }) => {
	if (!sid) { throw 'SID not provided' }

	const response = await dblib.run(dblib.r.table('sessions').insert({ sid, session, sessionTimeout }));

	if(!response) { throw `Cannot set session ${sid}.` }

	return response;
}

const touch = async ({ sid, session }) => {
	if (!sid) { throw 'SID not provided' }

	const response = await dblib.run(dblib.r.table('sessions').get(sid).update({ session, sessionTimeout }));

	if(!response) { throw `Cannot touch session ${sid}.` }

	return response;
}


module.exports = {
	destroy,
	get,
	set,
	touch
}