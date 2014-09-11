#!/usr/bin/env node

var traceurCompile = require("..");
var spawn = require('child_process').spawn;
var fs = require("fs");

var incomingFile = process.argv[2];
if (!incomingFile) {
	console.error("File is not specified.");
	process.exit(1);
}
var compiledFile = traceurCompile(incomingFile);

var node = spawn("node", [compiledFile]);

node.stdout.pipe(process.stdout);
node.stderr.pipe(process.stderr);

node.on("exit", function(code, signal) {
	fs.unlinkSync(compiledFile);
});