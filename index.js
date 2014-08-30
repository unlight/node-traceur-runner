var traceur = require("traceur");
var fs = require("fs");
var format = require("util").format;

module.exports = function(file) {
	var contents = fs.readFileSync(file).toString();
	var result = traceur.compile(contents, {
  		filename: file,
  		modules: "commonjs",
  		experimental: true
	});
	if (result.error) throw result.error;
	var newname = "__" + file + ".ntr.js";
	if (result.js.indexOf("$traceurRuntime") != -1) {
		var runtimePath = traceur.RUNTIME_PATH
			// .replace(/ /g, "\\ ")
			.replace(/\\/g, "/");
		var requireRuntime = format("require(\"%s\");", runtimePath);
		result.js = [requireRuntime, result.js].join("\n");
	}
	fs.writeFileSync(newname, result.js);
	return newname;
}