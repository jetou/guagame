class  GuaTileMap {
    constructor(game) {
        this.game = game
        this.tiles = [
            0, 0, 0, 0, 2,
            0, 3, 1, 0, 2,
            0, 3, 1, 0, 2,
            0, 0, 0, 0, 2,
            0, 3, 1, 0, 2,
            0, 3, 1, 0, 2,
            0, 0, 0, 0, 2,
            0, 3, 1, 0, 2,
            0, 3, 1, 0, 2,
        ]
        this.th = 5
        this.tw = this.tiles.length / this.th
        this.tileImages = [
            GuaImage.new(game, 't1'),
            GuaImage.new(game, 't2'),
            GuaImage.new(game, 't3'),
            GuaImage.new(game, 't4'),
        ]
        this.tileSize = 32
    }
    static new(...args) {
        return new this(...args)
    }
    update() {

    }
    draw() {
        let h = this.th
        for (let i = 0; i < this.tiles.length; i++) {
            let index = this.tiles[i]
            if (index != 0) {
                let x = Math.floor(i / h) * this.tileSize
                let y = (i % h) * this.tileSize
                let image = this.tileImages[index]
                this.game.context.drawImage(image.texture, x, y)

            }
        }
    }
}
class SceneEditor extends GuaScene{
    constructor(game) {
        super(game)
        //背景
        // var bg = GuaImage.new(game, 'bg')
        // this.addElement(bg)
        //tile map
        let map = GuaTileMap.new(game)
        this.addElement(map)
        // 地面
        // mario
        let mario = GuaNesSprite.new(game)
        this.addElement(mario)
        mario.x = 100
        mario.y = 100
        this.mario = mario

        this.setupInputs()

    }
    debug() {
        this.birdSpeed = config.bird_speed.value
    }
    Invincible() {
        if (this.boole) {
            this.death = false
        }
    }
    update() {

    }

    setupInputs() {
        var self = this
        var b = this.mario
        let playerSpeed = 5
        this.game.registerAction('j', function(keystatus){
            b.jump()
        })
        this.game.registerAction('a', function(keystatus){
            b.move(-playerSpeed, keystatus)
        })
        this.game.registerAction('d', function(keystatus){
            b.move(playerSpeed, keystatus)
        })
        // this.game.registerAction('c', function(keystatus){
        //     self.boole = !self.boole
        // })
    }

}
