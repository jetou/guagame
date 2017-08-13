class SceneEnd extends GuaScene{
    constructor(game, score) {
        super(game)
        this.score = score
        game.registerAction('r',function(){
            var first = SceneTitle.new(game)
            game.replaceScene(first)
        })
    }
    draw() {
        this.game.context.fillText("游戏结束, 按 R 重玩, 你的分数是" + this.score, 100, 200)

    }

}
