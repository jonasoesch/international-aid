import {AnnotationDefinition} from "./Definitions"
import {valOrDefault} from "./Helpers"
export class Annotation {
    name:string
    offset?:{top:number, left:number}
    constructor(definition:AnnotationDefinition) {
        this.name = definition.name
        this.offset = valOrDefault(definition["offset"], {top: 0, left: 0})
    }

}
