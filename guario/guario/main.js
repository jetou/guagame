

var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}


const ajax = request => {
    let r = new XMLHttpRequest()
    r.open('GET', request.url, true)
    r.responseType = 'arraybuffer'
    r.onreadystatechange = event => {
        if (r.readyState == 4) {
            request.callback(r.response)
        }
    }
    r.send()
}


var __main = function() {
    var images = {
        bg: 'bird/background.png',
        ground: 'bird/foreground.png',
        t1:     'tiles/t1.png',
        t2:     'tiles/t2.png',
        t3:     'tiles/t3.png',
        t4:     'tiles/t4.png',
    }
    let request = {
        url: 'mario.nes',
        callback(r) {
            window.bytes = new Uint8Array(r)
            log('mario file', window.bytes.length)
            var game = GuaGame.instance(30, images, function(g){
                // var s = SceneGame.new(g)
                var s = SceneEditor.new(g)
                // var s = Scene.new(g)
                g.runWithScene(s)
            })
            enableDebugMode(game, true)
        },
    }
    ajax(request)
}

__main()
