export interface Drawable {
    name:string // It's presumed that there is an element in the HTML with an id of name
    draw():void
    hide():void
}
