var traceur = require("traceur");
var fs = require("fs");
var format = require("util").format;

module.exports = function(file) {
	var contents = fs.readFileSync(file).toString();
	var result = traceur.compile(contents, {
  		filename: file,
  		modules: "commonjs",
  		// sourceMaps: true,
  		experimental: true
	});
	if (result.error) throw result.error;

	var code = result.js || result;
	if (typeof code != "string") {
		throw "Result is not a string.";
	}

	var newname = "__" + file + ".ntr.js";
	if (code.indexOf("$traceurRuntime") != -1) {
		var runtimePath = traceur.RUNTIME_PATH
			// .replace(/ /g, "\\ ")
			.replace(/\\/g, "/");
		var requireRuntime = format("require(\"%s\");", runtimePath);
		code = [requireRuntime, code].join("\n");
	}
	fs.writeFileSync(newname, code);
	return newname;
}