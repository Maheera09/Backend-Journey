const http = require('http') //http is a module in itself that has a lot of fucntionality 
const fs = require('fs')
const path = require('path') //also a module
const { log } = require('console')

const port = 3000

const server = http.createServer((req, res)=>{
    //first we need to find out what request is coming in and what we need to do in response to that request. 
    const filepath = path.join(__dirname, req.url === "/" ? "index.html" : req.url) //__dirname property of join gives you the access to current directory. The method join gives you absoulte method of where the files are. 
    console.log(filepath);
    
    
    //Now you should also suport what should be the extention of the file and the path module also supports that. extName stands for entension name.
    const extName = String(path.extname(filepath).toLowerCase())

    //Now optionally, I can specify what type of files I am supporting. That's called mimetypes.
    const mimeTypes = {
        '.html' : 'text/html',
        '.css' : 'text/css',
        '.js' : 'text/js',
        '.png' : 'text/png',
    }

    const contentType = mimeTypes[extName] || 'application/octet-stream'

    //We have grabbed everything that is required but we havent served anything yet. Now, it is job of fs to read something from file and serve.
    fs.readFile(filepath, (err, content)=>{
        if (err){
            if (err.code === 'ENOENT'){ // ENOENT stands for Error No ENTry
                res.writeHead(404, {'content-Type': 'text/html'})
                res.end("404: Bruh, file not found.")
            }
        }
        else {
            res.writeHead(200, {'content-Type': contentType})
            //content-Type just helps user to evaluate what's coming in i.e what type of data to expext.
            res.end (content, "utf-8")
        }

    })
}) //creats a server and listens to the port for request. You also have to add the functionality like what port will the server be listening to.

server.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
})