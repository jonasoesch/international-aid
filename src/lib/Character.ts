import * as interpolatePath from './interpolation/interpolatePath'
import {Annotation} from './Annotation'
import {CharacterDefinition} from "./Definitions"
import {Axis} from "./Axis"

interface Scale extends Function {}

export abstract class Character {

    private name:string
    protected field:string
    protected color:string
    private annotations:Annotation[]
    protected stage:d3.Selection<any, any, any, any>

    constructor(charDef:CharacterDefinition, 
                stage:d3.Selection<any, any, any, any>) {
        this.name = charDef.name
        this.color = charDef.color
        this.stage = stage
    }

    public abstract draw():void
    public abstract get path():string 
}
