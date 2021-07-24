# sendResizeImageServer
send image with desired size from node server

## This app is for getting image from node server in a desired size

EG: https://example.com/test/api/image/image_name?height=512&width=512

What this url will do, it will just throw a stream of the selected image file with the inserted dimentions, i.e., 512 x 512

If no height or width is given current default is 512, but you can remove it so it will give you the orignal file

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

Currently in the code, there is a default size for all images; 500
If you want to get the orignal image when no params are given, use below code [https://github.com/iRahulGaur/sendResizeImageServer/blob/728f73d6587bf9c7db0f4314588f5ede717aa2b9/index.js#L39](here)

### Default image without resizing
```
    let width, height
    if (widthString) {
        width = parseInt(widthString)
    }

    if (heightString) {
        height = parseInt(heightString)
    }
```

I'm using [https://www.npmjs.com/package/sharp](Sharp) for image processing

This app is possible because of this post [https://malcoded.com/posts/nodejs-image-resize-express-sharp/](Resizing Images in Node.js using Express & Sharp by Lukas)
