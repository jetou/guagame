class GuaNesSprite {
    constructor(game) {
        this.game = game
        this.titleOffset = 32784
        this.data = window.bytes.slice(this.titleOffset)
        // hard code
        this.animations = {
            idle: [],
        }

        // this.animationName = 'idle'
        // this.texture = this.frames()[0]
        this.pixelWidth = 2
        this.columnsOfSprite = 2
        this.rowsOfSprite = 4

        this.w = this.pixelWidth * this.columnsOfSprite * 8
        this.h = this.pixelWidth * this.rowsOfSprite * 8
        this.frameIndex = 0
        this.frameCount = 4
        this.alpha = 1

        this.flipX = false
        this.gy = 10
        this.vy = 0
    }
    static new(game) {
        return new this(game)
    }
    drawBlock(context, data, x, y, pixelWidth){
        const colors = [
            'white',
            '#FE1000',
            '#FFB010',
            '#AA3030',
        ]
        let w = pixelWidth
        let h = pixelWidth
        for (let i = 0; i < 8 ; i++) {
            let p1 = data[i]
            let p2 = data[i + 8]
            for (let j = 0; j < 8; j++) {
                // 8 bits per line
                // 0100 1110 0100 0101
                // 在 j 循环中 没一次画一个
                let c1 = (p1 >> (7 - j)) & 0b00000001
                let c2 = (p2 >> (7 - j)) & 0b00000001
                let pixel = (c2 << 1) + c1
                if (pixel == 0) {
                    continue
                }
                let color = colors[pixel]
                context.fillStyle = color
                let px = x + j * w
                let py = y + i * h
                context.fillRect(px, py, w, h)
            }
        }
    }
    drawSprite(){
        let bytesPerBlock = 16
        let dataOffset = this.frameIndex * bytesPerBlock * 8
        let data = this.data.slice(dataOffset)
        let context = this.game.context
        let pixelsPerBlock = 8
        let pixelWidth = this.pixelWidth
        let blockSize = pixelsPerBlock * pixelWidth
        let offset = 0
        for (var i = 0; i < this.rowsOfSprite; i++) {
            for (var j = 0; j < this.columnsOfSprite; j++) {
                let x = j * blockSize
                let y = i * blockSize
                let pixels = data.slice(offset)
                this.drawBlock(context, pixels, x, y, this.pixelWidth)
                offset += 16
            }
        }
    }
    jump() {
        this.vy = -10
        //this.rotation = -45
    }
    update() {
        // //更新受力
        this.y += this.vy
        this.vy += this.gy * 0.2
        var h = 355
        if (this.y > h) {
            this.y = h
        }

        this.frameCount --

        if (this.frameCount == 0) {
            this.frameCount = 4
            this.frameIndex++
            this.frameIndex %= 3
            // this.frameIndex = (this.frameIndex + 1) % this.frames().length
            // this.texture = this.frames()[this.frameIndex]
        }
    }
    draw() {
        var context = this.game.context
        context.save();
        var w2 = this.w / 2
        var h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2);
        if (this.flipX) {
            context.scale(-1, 1)
        }
        context.globalAlpha = this.alpha

        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2);

        //draw mario
        this.drawSprite()
        context.restore()
        this.update()
        //log("das")
    }
    move(x, keystatus) {
        this.flipX = (x < 0)
        this.x += x
    }
}
