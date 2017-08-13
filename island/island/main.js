

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
        bird1: 'bird/0bird.png',
        bird2: 'bird/1bird.png',
        bird3: 'bird/2bird.png',
        pipe: 'bird/pipe-north.png',
        pipe2: 'bird/pipe-south.png',
        titlemessage: 'bird/message.png',
        gameover: 'bird/gameover.png',
        score0: 'bird/0.png',
        score1: 'bird/1.png',
        score2: 'bird/2.png',
        score3: 'bird/3.png',
        score4: 'bird/4.png',
        score5: 'bird/5.png',
        score6: 'bird/6.png',
        score7: 'bird/7.png',
        score8: 'bird/8.png',
        score9: 'bird/9.png',
    }
    let request = {
        url: 'island.nes',
        callback(r) {
            window.bytes = new Uint8Array(r)
            var game = GuaGame.instance(30, images, function(g){
                var s = SceneGame.new(g)
                // var s = Scene.new(g)
                g.runWithScene(s)
            })
            enableDebugMode(game, true)
        },
    }
    ajax(request)
}

__main()
