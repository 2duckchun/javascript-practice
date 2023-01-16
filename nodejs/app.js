const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    const url = req.url
    const method = req.method

    if (url === "/") {
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.write("<html>")
        res.write("<head><title>홈페이지입니다.</title></head>")
        res.write("<body>")
        res.write("<h1>2DC 서버 실험중</h1>")
        res.write("<form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form>")
        res.write("</body>")
        res.write("</html>")
        return res.end()
    }

    if (url === "/message" && method === "POST") {
        const body = []
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk)
        })
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString('utf8')
            const message = parsedBody.split('=')[1]
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302
                res.setHeader('Location', '/')
                return res.end()
            })

        })
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.write('<html>')
    res.write('<head><title>덕춘입니다</title></head>')
    res.write('<body><h1>ㅎㅇ</h1></body>')
    res.write('</html>')
    res.end()
})

server.listen(8080)