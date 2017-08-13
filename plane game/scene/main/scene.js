const config = {
    player_speed: 10,
    enemy_speed: 5,
    bullet_speed: 5,
    fire_cooldown: 10,
}


class Bullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
        this.power = 1
        this.name = 'bullet'
    }
    setup() {
        this.speed = 2
    }
    update() {
        this.speed = config.bullet_speed
        this.y -= this.speed
    }
}

class Player extends GuaImage {
    constructor(game) {
        super(game, 'my_plane')
        this.setup()
        this.life = 1
        this.name = 'player'
    }
    setup() {
        this.speed = 5
        this.cooldown = 0
    }
    update() {
        this.speed = config.player_speed
        if (this.cooldown > 0) {
            this.cooldown--
        }
    }
    fire() {
        if (this.cooldown == 0){
            this.cooldown = config.fire_cooldown
            var x = this.x + this.w / 2
            var y = this.y
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }
    }
    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }
}


class Enemy extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 4)
        var name = 'npc' + type
        super(game, name)
        this.setup()
        this.lives = 2
        this.alive = true
        this.name = 'enemy'
    }
    setup() {
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
    }

    update() {
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }

        //log(elements)
        // if(this.collide()){
        //
        // }
    }

}

class Scene extends GuaScene{
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()

    }
    setup() {
        var game = this.game
        this.numberOfEnemies = 7
        this.bg = GuaImage.new(game, 'sky')
        // this.player = GuaImage.new(game, 'my_plane')
        // this.player.x = 150
        // this.player.y = 500
        this.player = Player.new(game)
        this.player.x = 150
        this.player.y = 500
        this.addElement(this.bg)
        this.addElement(this.player)
        //
        this.addEnemies()

    }
    addEnemies() {
        var es = []
        for (var i = 0; i < this.numberOfEnemies; i++) {
             var e = Enemy.new(this.game)
             es.push(e)
             this.addElement(e)
        }
        this.enemis = es
    }
    setupInputs() {
        var g = this.game
        var s = this
        //log(s)
        g.registerAction('a', function(){
            s.player.moveLeft()
        })
        g.registerAction('d', function(){
            s.player.moveRight()
        })
        g.registerAction('w', function(){
            s.player.moveUp()
        })
        g.registerAction('s', function(){
            s.player.moveDown()
        })
        g.registerAction('j', function(){
            s.player.fire()
        })

    }
    // show_particle(x, y) {
    //     this.ps = GuaParticleSystem.new(this.game)
    //     this.ps.x = x
    //     this.ps.y = y
    //     this.addElement(this.ps)
    // }




    update() {
        // this.bg.y+=10
        super.update()
    }

}

// var Scene = function(game) {
//     var s = {
//         game: game,
//     }
//     //初始化
//
//     var paddle = Paddle(game)
//     var ball = Ball(game)
//
//     var score = 0
//
//     blocks = loadLevel(game, 2)
//
//
//     game.registerAction('a', function(){
//         paddle.moveLeft()
//     })
//     game.registerAction('d', function(){
//         paddle.moveRight()
//     })
//     game.registerAction('f', function(){
//         ball.fire()
//     })
//
//
//     s.draw = function() {
//         game.context.fillStyle = "#553"
//         game.context.fillRect(0, 0, 400, 300)
//         // draw
//         game.drawImage(paddle)
//         game.drawImage(ball)
//         // draw blocks
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.alive) {
//                 game.drawImage(block)
//             }
//         }
//         // draw labels
//         game.context.fillText('分数: ' + score, 10, 290)
//     }
//     s.update = function() {
//         ball.move()
//
//         if (ball.y > paddle.y) {
//             var end = SceneEnd.new(game)
//             game.replaceScene(end)
//         }
//         if(paddle.collide(ball)) {
//             ball.反弹()
//         }
//         log(blocks.length)
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.collide(ball)) {
//                 // log('block 相撞')
//                 block.kill()
//                 ball.反弹()
//                 // 更新分数
//                 score += 100
//             }
//         }
//     }
//
//     var enableDrag = false
//     game.canvas.addEventListener('mousedown', function(event) {
//          var x = event.offsetX
//          var y = event.offsetY
//
//          // 检查是否点中了ball
//          if (ball.hasPoint(x, y)) {
//              // 设置
//              enableDrag = true
//          }
//
//     })
//     game.canvas.addEventListener('mousemove', function(event) {
//          var x = event.offsetX
//          var y = event.offsetY
//          if (enableDrag) {
//              ball.x = x
//              ball.y = y
//          }
//
//     })
//     game.canvas.addEventListener('mouseup', function(event) {
//          var x = event.offsetX
//          var y = event.offsetY
//
//          enableDrag = false
//
//     })
//
//     return s
// }
