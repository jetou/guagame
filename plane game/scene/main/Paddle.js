var Paddle = function(game) {
    var o = game.imageByName('paddle')
    // var o = {
    //     image: image,
    //     x: 105,
    //     y: 250,
    //     speed: 5,
    // }
    o.x = 100
    o.y = 250
    o.speed = 15
    var paddle = o
    o.move = function(x) {
        if(x < 0){
            x = 0
        }
        if (x > 400 - o.w) {
            x = 400 - o.w
        }
        o.x = x
    }
    o.moveLeft = function() {
        o.move(paddle.x - paddle.speed)
    }
    o.moveRight = function() {
        o.move(paddle.x + paddle.speed)
    }
    var aInb = function(x, x1, x2) {
        return x >= x1 && x <= x2
    }
    o.collide = function(ball) {
        // if (ball.y + ball.h > o.y) {
        //     if (ball.x > o.x && ball.x < o.x + o.image.width) {
        //         return true
        //     }
        // }
        // return false
        var a = o
        var b = ball
        if (aInb(a.x, b.x, b.x + a.w) || aInb(b.x, a.x, a.x + a.w)) {
            if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + b.h)) {
                return true
            }
        }
    }
    return o
}
