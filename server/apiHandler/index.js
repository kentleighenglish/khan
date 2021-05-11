const controllers = require('./controllers');

class ApiHandler {

	constructor(request, response) {
		if (request && response) {
			this.handle(request, response);
		}
	}

	handle(request, response) {
		console.log(`\nAPI Request made on ${request.url}`);

		this.request = request;
		this.response = response;
		this.responseData = {
			data: null,
			success: true,
			errors: []
		}

		const { params: { controller = null, action = null }, body = {} } = this.request;

		console.log('Request Body: ', body);

		if (!action) {
			action = 'index';
		}

		if(controllers[controller] && controllers[controller][action]) {
			const controllerModule = controllers[controller];
			const actionMethod = controllerModule[action];


			actionMethod(body).then((response) => {
				console.log('Request Response: ', response);

				this.respond(response);
			}).catch((e) => {
				this.error(e);
				this.respond();
			});
		} else {
			this.error('Route does not exist');
			return this.respond();
		}
	}

	error(error) {
		this.responseData = {
			...this.responseData,
			errors: [
				...this.responseData.errors,
				error
			],
			success: false
		}
	}

	respond(data = null) {
		if (this.response) {
			return this.response.json({
				...this.responseData,
				data: data ? data : this.responseData.data
			});
		}
	}
}

module.exports = ApiHandler;