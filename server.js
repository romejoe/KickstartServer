//borrowed from Sean Bright at stackoverflow: http://stackoverflow.com/questions/1144783/replacing-all-occurrences-of-a-string-in-javascript
function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

console.log(__dirname);
var express = require('express'),
	fs = require('fs'),
	url = require('url'),
	path = require('path');
var app = express();

app.get('*', function(req, res){
	var Url = req.originalUrl;

	var parsedUrl = url.parse(Url, true);
	var absCwd = path.resolve('./');
	
	var absReqPath = path.resolve(path.join('./',parsedUrl.pathname));
	if(absReqPath.indexOf(absCwd) == 0){
		fs.readFile(absReqPath, 'utf8', function(err, data){
			if(err){
				console.log(err);
				res.status(500).send('Error');
				return;
			}

			//replace string on single pass
			for(var key in parsedUrl.query){
				data = replaceAll(key, parsedUrl.query[key], data);
			}
			res.status(200).send(data);
		});
	}
	else{
		res.status(400).send('Bad Request');
	}
});

app.listen(5678);
