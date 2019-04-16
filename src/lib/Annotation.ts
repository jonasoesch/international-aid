import {AnnotationDefinition} from "./Definitions"
import {valOrDefault, overwriteDefaults} from "./Helpers"
export class Annotation {
    name:string
    offset:{top:number, left:number}
    anchor:string
    constructor(definition:AnnotationDefinition) {
        this.name = definition.name
        this.offset = overwriteDefaults({top: 0, left: 0}, definition["offset"])
        this.anchor = valOrDefault(definition["anchor"], "last") 
    }

}
