const argon2 = require('argon2');
const dblib = require('../../dblib');

const login = async ({ email = null, password = null }) => {

	if ( email && password ) {
		return identify({ email, password });
	} else {
		throw 'Missing data';
	}
}

const fetch = async ({ email }) => {

	if ( email ) {
		const response = await dblib.run(dblib.r.table('users').getAll(email, { index: 'email' }));
		const user = await response.toArray();

		if(!user.length) {
			throw 'Cannot find user';
		} else {
			return user[0];
		}
	} else {
		throw 'Missing data';
	}
}

const identify = async ({ email, password }) => {
	const response = await dblib.run(dblib.r.table('users').getAll(email, { index: 'email' }));
	const user = await response.toArray();

	if (!user.length) {
		throw 'Email or Password incorrect.';
	}

	if (await argon2.verify(user[0].password, password)) {
		return user[0];
	} else {
		throw 'Email or Password incorrect.';
	}
}

module.exports = {
	login,
	fetch
}