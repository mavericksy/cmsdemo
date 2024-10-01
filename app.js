/**
 *
 */
const express = require('express'),
      app = express(),
      cors = require('cors'),
      mongoose = require('mongoose'),
      path = require('path'),
      fs = require('fs')
;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
//
const host = process.env.CMSHOST || '192.168.9.111',
      port = process.env.CMSPORT || 3001
;
const mongoHost = process.env.MONGOHOST || '0.0.0.0',
      mongoPort = process.env.MONGOPORT || 27018,
      // TODO configure Mongo with auth
      mongoUser = process.env.MONGOUSER || 'cmsadmin',
      mongoPass = process.env.MONGOPASS || 'cmsadminsecretpa$$word'
;
const conn = mongoose.connect(`mongodb://${mongoHost}:${mongoPort}`, {})
                     .then((conn) => {
                           console.log("MongoDB Conn", conn.models);
                     })
                     .catch((error) => {
                           console.error('Error connecting to MongoDB:', error);
                     })
;
//
//
function requiredir(dir) {
    var fullpath = path.resolve(__dirname, dir),
        ret = {},
        filepath,stat,key;
    fs.readdirSync(fullpath).forEach(function forEachFile(file) {
        filepath = path.join(fullpath, file);
        stat = fs.statSync(filepath);
        key = file.split('.').shift();

        if (stat.isFile()) {
            ret[key] = require(filepath);
        }
        else if (stat.isDirectory()) {
            ret[key] = requiredir(filepath);
        }
    });
    return ret;
}
//
const routes = requiredir('./routes');
for (var r in routes) app.use('/api', routes[r]);

//
// Go Baby, Go!
const server = app.listen(port, host, () => {
  //
  console.log(`CMSDemo listening at ${server.address().address}:${server.address().port}`);
});
