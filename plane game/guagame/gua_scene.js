class GuaScene {
    constructor(game) {
        this.game = game
        this.elements = []
        this.deathement = 0
        this.particlesnum = 0
        this.scores = 0
        this.death = 0
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    addElement(img) {
        img.scene = this
        this.elements.push(img)
    }
    draw() {
        var em = []
        var zid = []
        var self = []
        for (var i = 0; i < this.elements.length; i++) {
            e = this.elements[i]
            var c = new Guacollide(this.game)
            c.collide_list(e, em, zid, self)//此函数是判断是否是 敌机或则是子弹或自己，并添加进zid和em和self数组
            if (e.name == 'enemy' && e.lives == 0) {
                this.scores += 10
                if (this.deathement > this.numberOfEnemies - 2) {
                     this.deathement = -1
                     this.addEnemies()// 重新画敌人
                 }
                deletes(this.elements, 'enemy', i)//删除敌人
                this.deathement++
                var ps = GuaParticleSystem.new(this.game)     //粒子系统
                ps.x = e.x
                ps.y = e.y
                this.addElement(ps)
                this.particlesnum++

            } else if (e.name == 'bullet' && e.power < 1) {
                deletes(this.elements,'bullet') // 删除子弹
            } else if (e.name == 'particles' && this.particlesnum > 0) {
                this.particlesnum--
                deletes(this.elements, 'particles') //删除粒子
            } else if (e.name == 'player' && e.life < 1) {
                deletes(this.elements, 'player')
                this.death = 1
            }
            e.draw()
            c.draw(this.game, this.scores)
            if (this.death > 0) {
                var pp = new SceneEnd(this.game,this.scores)
                this.game.replaceScene(pp)
            }
        }
        //
        c.endzhuang(zid, em, self)//判断是子弹和敌机否碰撞
    }
    update() {
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
                e.update()

        }
    }
}
