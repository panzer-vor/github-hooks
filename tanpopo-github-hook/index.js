var spawn = require('child_process').spawn
var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/', secret: 'root'}) // 根据git上webhook的配置填写
http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404;
    res.end('no such location')
  })
}).listen(7777)

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

// 监听 push 事件
handler.on('push', function (event) {
    console.log('Received a push event for %s to %s',
      event.payload.repository.name,
      event.payload.ref,
      `in ${new Date()}`
    )
    init() // 每次拉取都重新监听
  }
)   
function rumCommand( cmd, args, cwd, callback ) {
  var child = spawn( cmd, args, {cwd: cwd} )
  var response = ''
  child.stdout.on('data', function( buffer ){ response += buffer.toString(); })
  child.stdout.on('end', function(){ callback( response ) })
}

function init() {
  console.log('starting shell command')
  rumCommand('sh', ['./update-dev.sh'], './' ,function( result ) {
    console.log(result)
  })

  rumCommand('sh', ['./update-master.sh'], './' ,function( result ) {
    console.log(result)
  })
}