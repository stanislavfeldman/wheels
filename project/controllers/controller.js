require("mootools.js").apply(GLOBAL);
var kiss = require("kiss.js");
var path = require('path');
var fs = require("fs");
var Pdf = require("pdfkit");
var uuid = require('node-uuid');

exports.index = function(params, args)
{
	var req = args[0], res = args[1];
	var translator = new kiss.views.Translator();
	//console.log(translator.translate(req, "hello"));
	//console.log(translator.translate(req, 'hello, {0}', "Стас"));
	var context = { template_name: "view.html", foo: 'hello', names: ["Stas", "Boris"], numbers: [], name: function() { return "Bob"; } };
	for(var i = 0; i < 10; ++i)
	    context.numbers.push("bla bla " + i);
	var v = new kiss.views.TextViewer();
	v.render(req, res, context);
}

//Pdf file example
exports.fileview = function(params, args)
{
	var req = args[0], res = args[1];
	var pdf = new Pdf();
	var filename = uuid() + ".pdf";
	var filepath = path.join(__dirname, filename);
	pdf.text("hello, world!\nlalala345");
	pdf.write(filepath, function()
	{
		var v = new kiss.views.FileView(filepath);
		v.render(req, res, {filename: "out.pdf"});
		fs.unlink(filepath);
	});
}

exports.on_not_found = function(params, args)
{
	var req = args[0], res = args[1];
	res.writeHead(404, {'Content-Type': 'text/html'});
	res.end("custom 404");
}
