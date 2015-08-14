
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongo = require('mongodb');
var Grid = require('gridfs-stream');
var fs = require('fs');
var Mtemp = null;
var Itemp = null;

// Connection URL 
var url = 'mongodb://ds031213.mongolab.com:31213/heroku_sxb8blzn';

// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server FROM REQ HANDLER");
 
// make sure the db instance is open before passing into `Grid` 
  db.authenticate('testDummy', 'testDummy', function(err, res) {
  // callback
    var gfs = Grid(db, mongo);

    // streaming to gridfs 
    var writestream = gfs.createWriteStream({
          filename: 'NEWFILE.txt'
      });
    
    fs.createReadStream('README.md').pipe(writestream);
    // fs.close('NEWFILE.txt', callback);
    // save this is async
    writestream.on('close', function(file) {

      console.log( 'file :', file.md5 );

    });
  // });


    //write content to file system
    var fs_write_stream = fs.createWriteStream('write.txt');
     
    //read from mongodb
    var readstream = gfs.createReadStream({
       filename: 'NEWFILE.txt'
    });
    readstream.pipe(fs_write_stream);
    
    fs_write_stream.on('close', function () {
         console.log('file has been written fully!');
    });

  });
});

//reference: http://excellencenodejsblog.com/gridfs-using-mongoose-nodejs/
