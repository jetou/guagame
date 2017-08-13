var loadLevel = function(game, n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    //log("there")
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}


var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            blocks = loadLevel(game, Number(k))
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}


var __main = function() {
    var images = {
        //bullet: 'img/ball.png',
        block: 'img/block.png',
        sky: 'img/sky.jpg',
        my_plane: 'img/myPlane.gif',
        npc0: 'img/npc0.png',
        npc1: 'img/npc1.png',
        npc2: 'img/npc2.png',
        npc3: 'img/npc3.png',
        npc4: 'img/npc4.png',
        bullet: 'img/bullet2.png',
        fire: 'fire.png'

    }
    var game = GuaGame.instance(30, images, function(g){
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)

}

__main()
