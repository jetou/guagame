var e = sel => document.querySelector(sel)

var log = console.log.bind(console)

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}


var rectIntersects = function(a, b) {
    var o = a
    if (b.y > o.y && b.y < o.y + o.image.height) {
        if (b.x > o.x && b.x < o.x + o.image.width) {
            return true
        }
    }
    return false
}

const randomBetween = function(start, end) {
    var n = Math.random() * (end-start+1)
    return Math.floor(n + start)
}


var Birdcollision = function(bird, pipe) {
    fu = bird.y >= 390
    for (var i = 0; i < pipe.length; i++) {
        if (pipe[i].x < 180 && pipe[i].x > 50) {
            if (pipe[i].y < 0) {
                fu = bird.y < pipe[i].y + 400
            } else {
                fu =  (bird.y > pipe[i].y) || bird.y >= 390
            }
            if (fu) return fu
        }
        if (fu) return fu
    }
}
