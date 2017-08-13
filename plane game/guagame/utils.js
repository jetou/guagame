var e = sel => document.querySelector(sel)

var log = console.log.bind(console)

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}


var rectIntersects = function(a, b) {
    var o = a
    // if (b.y > o.y && b.y < o.y + o.h) {
    //     if (b.x > o.x && b.x < o.x + o.w) {
        if((b.y + b.h) > a.y && a.x > (b.x - b.w) && a.x < (b.x + b.w)) {
            return true
        }
    return false
}

const randomBetween = function(start, end) {
    var n = Math.random() * (end-start+1)
    return Math.floor(n + start)
}

var deletes = function(elements, name, num) {
    if(name == 'particles'){
        window.setTimeout(function() {
            i = delete_find_element(elements, name)
            elements.splice(i,1)
        },1000)
    }else{
        i = num || delete_find_element(elements, name)
        elements.splice(i,1)
    }
}

var delete_find_element = function(elements, name) {
    for (var i = 0; i < elements.length; i++) {
        if(elements[i].name == name) {
            //log(i)
            return i
        }
    }
}
