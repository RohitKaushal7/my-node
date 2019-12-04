const fs = require('fs')

const reqHandler = (req,res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.setHeader('Content-Type','text/html');
        res.write(`
        <html>
        <head><title> Message </title></head>
        <body>
            <form method="POST" action="/message">
                <input type="text" name="msg"/>
                <input type="submit"></input>
            </form>
        </body>
        </html>
        `)
        return res.end();
    }
    
    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data',(chunk)=>{
            console.log(chunk);
            body.push(chunk);
        })

        req.on('end',()=>{
            var parsedBody = Buffer.concat(body).toString();
            var msg = parsedBody.split('=')[1];
            console.log(msg);
            fs.writeFile('msg.txt',msg,(err)=>{
            res.statusCode = 302;
            res.setHeader('Location','/')
            res.end('hello world')
            });
        })
        
    }
}

module.exports = reqHandler;
