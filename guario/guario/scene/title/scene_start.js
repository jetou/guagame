class SceneStart extends GuaScene{
    constructor(game) {
        super(game)
        game.registerAction('k',function(){
            var s = SceneGame.new(game)
            game.replaceScene(s)
        })
        //背景
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)
        //地面
        this.g = GuaImage.new(game, 'ground')
        this.addElement(this.g)
        this.skipCount = 4
        // 开始信息
        this.t = GuaImage.new(game, 'titlemessage')
        this.t.x = 100
        this.t.y = 100
        this.addElement(this.t)
        //鸟
        var b = GuaAnimation.new(game)
        b.x = 170
        b.y = 150
        this.bird = b
        this.addElement(b)
    }
    update() {
        //地面移动
        super.update()
        this.skipCount --
        var offset = -5
        if (this.skipCount == 0) {
            this.skipCount = 4
            offset = 15
        }
        this.g.x += offset
        this.bird.y  = 160
    }

}
