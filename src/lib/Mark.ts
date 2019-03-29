import * as interpolatePath from './interpolation/interpolatePath'
import {Annotation} from './Annotation'

interface Scale extends Function {}

export class Character {

    private _name:string = ""
    private _color:string = "pink"
    private _annotations:Annotation[]

    public path(xScale:Scale, yScale:Scale, data:[]) {
        return "a path" 
    }

        get name():string {
        return this._name
    }

    set name(name:string) {
        this._name = name 
    }

    /** This method can be chained like this `mark.setName('name').setColor('red')` etc. **/
    setName(name:string):Character {
        this.name = name
        return this
    }

    get color():string {
        return this._color
    }

    set color(color:string) {
        this._color = color 
    }

    /** This method can be chained like this `mark.setColor('red').setLabel('Label')` etc. **/
    setColor(color:string):Character {
        this.color = color 
        return this
    }

}
