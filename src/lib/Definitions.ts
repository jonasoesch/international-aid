export interface Named {
    name:string
}



export interface ChartDefinition extends Named {
    name:string
    data: any
    axes: AxisDefinition[]
    characters: CharacterDefinition[]
    annotations?: AnnotationDefinition[]
}

export interface AxisDefinition extends Named {
    name:string
    domain: number[]
    annotations?:AnnotationDefinition[]
}

export interface CharacterDefinition extends Named {
    name:string
    field:string
    color:string
    axes: {
        x?:string
        y?:string
    } 
    annotations?:AnnotationDefinition[]
}


export interface AnnotationDefinition extends Named {
    name:string
    offset?:OffsetDefinition
}

export interface OffsetDefinition {
    left:number,
    top:number
}

