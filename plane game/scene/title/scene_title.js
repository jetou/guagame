class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        var label = GuaLabel.new(game, '按k开始')
        this.addElement(label)
        game.registerAction('k',function(){
            var start = Scene.new(game)
            game.replaceScene(start)
        })
    }
}


    // draw() {
    //     this.game.context.fillText("按 K 开始游戏", 100, 100)
    // }
