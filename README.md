# sendResizeImageServer
send image with desired size from node server

## This app is for getting image from node server in a desired size

EG: https://server.com/test/api/image/image_name?height=512&width=512

What this url will do, it will just throw a stream of the selected image file with the inserted dimentions, i.e., 512 x 512

## Setup

`npm install` for installing all the required packages

`nodemon` to start an auto reloading server

### Main code below
```
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
```

I'm using (https://www.npmjs.com/package/sharp)[Sharp] for image processing

This app is possible because of this post (https://malcoded.com/posts/nodejs-image-resize-express-sharp/)[Resizing Images in Node.js using Express & Sharp by Lukas]
