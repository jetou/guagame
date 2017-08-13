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
            '#FC7460', //身体
            '#A40000',
            '#FBF7F8',
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
    drawSpritehead(){
        let numberOfBytesPerBlock = 16
        let pixelSize = 8
        let blockSize = 2 // 一个图块代表8个像素
        let context = this.game.context
        for (let i = 0; i < blockSize; i++) {
            for (let j = 0; j < blockSize; j++) {
                // 算出 bytes
                let x = j * pixelSize * this.pixelWidth
                let y = i * pixelSize * this.pixelWidth
                let index = (i * 8 + j) * numberOfBytesPerBlock
                if (i > 0) {
                    index = ((i+1) * 8 + j) * numberOfBytesPerBlock
                }
                this.drawBlock(context, this.data.slice(index), x, y, this.pixelWidth)
            }
        }
        //log(x, y, offset)
    }
    drawSpritebody() {
        let bytesPerBlock = 16
        let tilesPerSprite = 2
        let bytesPerSprite = bytesPerBlock * tilesPerSprite
        let dataOffset = this.frameIndex * bytesPerSprite
        let data = this.data.slice(dataOffset)
        let numberOfBytesPerBlock = 16
        let pixelSize = 8
        let blockSize = 2 // 一个图块代表8个像素
        let index = 0
        let context = this.game.context
        for (let i = 0; i < 2; i++) {
            for (let j = 2; j < 4; j++) {
                // 算出 bytes
                let x = (j-2) * pixelSize * this.pixelWidth
                let y = (i+2) * pixelSize * this.pixelWidth
                index = (i * 8 + j) * numberOfBytesPerBlock
                if (i > 0) {
                    index = ((i+1) * 8 + j) * numberOfBytesPerBlock
                    // log(index)
                }
                //log(index)
                this.drawBlock(context, data.slice(index), x, y, this.pixelWidth)
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
        this.drawSpritehead()
        this.drawSpritebody()
        context.restore()
        this.update()
        //log("das")
    }
    move(x, keystatus) {
        this.flipX = (x < 0)
        this.x += x
    }
}
