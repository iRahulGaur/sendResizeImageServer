const express = require("express");
const bodyParser = require("body-parser");
const fileSys = require('fs');
const sharp = require('sharp');
const bufferImage = require("buffer-image");
var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(1338, () => {
    console.log('running inside 1338');
});

function resize(path, format, width, height) {
    const readStream = fileSys.createReadStream(path)
    let transform = sharp()
  
    if (format) {
      transform = transform.toFormat(format)
    }
  
    if (width || height) {
      transform = transform.resize(width, height)
    }
  
    return readStream.pipe(transform)
}

//redirect user to main website
app.get('/test/api/image/:image_id', function (req, res) {
    // get access to URLSearchParams object
    const search_params = req.query
    const format = req.query.format

    // get url parameters
    const widthString = search_params.width;
    const heightString = search_params.height;
    
    // [START default_size]
    // Parse to integer if possible
    let width, height
    if (widthString) {
        width = parseInt(widthString)
    } else {
        width = 500
    }

    if (heightString) {
        height = parseInt(heightString)
    } else {
        height = 500
    }
    // [END default_size]
    
    var image_id = req.params.image_id;

    //return image file using name
    var filepath = __dirname + "/upload/" + image_id + ".jpeg";

    try {
        if (fileSys.existsSync(filepath)) {
            // Set the content-type of the response
            res.type(`image/${format || 'png'}`)

            // Get the resized image
            resize(filepath, format, width, height).pipe(res)
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err)
        res.sendStatus(404);
    }
});
