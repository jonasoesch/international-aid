export class Design {

    _fontColor:string = "#222"
    _font:string = "Fira Sans"
    _fontSizing:number = 1

    _lineWeight = 3
    _margin = 80

    get fontColor() {
        return this._fontColor
    }

    set fontColor(color:string) {
        this._fontColor = color 
    }

    get font() {
        return this._font 
    }

    set font(font:string) {
        this._font = font 
    }


    get fontSizing() {
        return this._fontSizing 
    }

    set fontSizing(size:number) {
        this._fontSizing = size 
    }

    get lineWeight() {
        return this._lineWeight
    }

    set lineWeight(lineWeight:number) {
        this._lineWeight = lineWeight 
    }

    get margin() {
        return this._margin || 80
    }

    set margin(margin:number) {
        this._margin = margin 
    }

}
