import * as interpolatePath from './interpolation/interpolatePath'
import {Annotation} from './Annotation'
import {CharacterDefinition, AnnotationDefinition} from "./Definitions"
import {Axis} from "./Axis"

interface Scale extends Function {}

export abstract class Character {

    public name:string
    protected field:string
    public color:string
    protected annotations:Annotation[]
    protected stage:d3.Selection<any, any, any, any>

    constructor(charDef:CharacterDefinition, 
                stage:d3.Selection<any, any, any, any>) {
        this.name = charDef.name
        this.color = charDef.color
        this.stage = stage
        this.annotations = this.buildAnnotations(charDef.annotations)
    }

    buildAnnotations(defs:AnnotationDefinition[]):Annotation[] {
        return defs.map(d => new Annotation(d)) 
    }

    public abstract draw():void
    public abstract get path():string 
    public abstract get label():{name:string, x:number, y:number}
}
