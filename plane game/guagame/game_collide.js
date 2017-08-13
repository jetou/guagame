class Guacollide {
    constructor(game) {
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    collide_list(e, em, zid, self) {
        if (e.lives && e.y<800) {
            em.push(e)
        } else if (e.power && e.y>0) {
            zid.push(e)
        } else if (e.life) {
            self.push(e)
        }
    }
    endzhuang(a, b, c) {
        for (var i = 0; i < a.length; i++) {
            for (var j = 0; j < b.length; j++) {
                if (this.collide(b[j],a[i]) && a[i].power > 0 && b[j].lives > 0){
                    b[j].lives -= 1
                    a[i].power -= 1
                }
            }
        }
        for (var i = 0; i < c.length; i++) {
            for (var j = 0; j < b.length; j++) {
                if (this.collide(b[j],c[i]) && c[i].life > 0 && b[j].lives > 0){
                    b[j].lives -= 1
                    c[i].life -= 1
                }
            }
        }
    }
    collide(b, a) {
        return b.alive && (rectIntersects(a, b))
    }
    draw(game, scores) {
        game.context.fillText("分数" + scores, 300, 30)
    }
}
