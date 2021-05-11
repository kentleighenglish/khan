const r = require('rethinkdb');
const { rethink: { host, port, dbs, tables, targetDb } } = require('config');

class dblib {

	constructor() {
		this.conn;

		this.dbs = dbs;

		this.tables = tables;

		this.r = r.db(targetDb);

		this.connect();
	}

	async connect() {
		this.conn = await r.connect({ host, port });
	}

	async makeDb(db) {
		return r.dbCreate(db).run(this.conn)
	}

	async populateDb(db) {
		let missingTables = [];

		const tableList = await r.db(db).tableList().run(this.conn);

		// Create missing tables
		this.tables.map((table) => {
			const { name } = table;
			if (!tableList.includes(name)) {
				missingTables.push(table);
			}
		});

		if (missingTables.length) {
			console.log(`Database "${db}" is missing tables: ${missingTables.reduce((arr, table) => ([ ...arr, table.name ]), []).join(', ')}`);
			console.log('Creating table(s)');
			return Promise.all(missingTables.map(({ name, ...options }) => r.db(db).tableCreate(name, options).run(this.conn)));
		} else {
			return;
		}
	}

	async init() {
		await new Promise((resolve) => {
			let interval = setInterval(() => {
				if (this.conn) {
					interval = null;
					resolve();
				}
			}, 200);
		});

		const dbList = await r.dbList().run(this.conn);

		let missingDbs = [];

		this.dbs.map((db) => {
			if (!dbList.includes(db)) {
				missingDbs.push(db);
			}
		});

		// Create missing Dbs
		if(missingDbs.length) {
			console.log(`Missing databases: ${missingDbs.join(', ')}`);
			console.log('Creating database(s)');
			await Promise.all(missingDbs.map((db) => this.makeDb(db)));
		}

		this.dbs.map((db) => this.populateDb(db));
	}

	run(command) {
		return command.run(this.conn);
	}
}

module.exports = new dblib();