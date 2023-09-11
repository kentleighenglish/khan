var shell = require('shelljs');

var RFInterface = function(app_root) {
	this.app_root = app_root;
}

RFInterface.prototype.broadcast = function(data, resolve, reject) {
	var payload = data.hardwareId+"/"+data.payload;
	shell.exec(
		this.app_root+'/rf24/sender '+payload,
		{async: true, silent: true},
		function(code, stdout, stderr) {
			if(code == 0) {
				resolve(stdout);
			} else {
				reject(stderr);
			}
		}
	)
}

module.exports = RFInterface;
