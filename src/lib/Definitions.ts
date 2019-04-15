import {Chart} from "./Chart"
import {Drawable} from "./Drawable"
import {Design} from "./Design"

export interface Named {
    name:string
}

export interface ChartDefinition extends Named {
    // Will be iused to define the stage where the chart is drawn
    name:string

    // TODO: Create an Interface for Data
    data: object[]

    axes: AxisDefinition[]
    cast: CastDefinition
    
    // Annotations will be drawn as a title to the chart
    annotations?: AnnotationDefinition[]
}

export interface AxisDefinition extends Named {
    name:string
    domain:(number[] | string[])
    // This will be used to access the corresponding property in the CSV when drawing a character
    field?:string
    ticks?:any[]
    annotations?:AnnotationDefinition[]
}

export interface CastDefinition {
    // Axes and the field are typically the same for all characters
    field:string
    axes: {
        x?:string
        y?:string
    } 
    characters:CharacterDefinition[]
}

export interface CharacterDefinition extends Named {
    name:string
    color:string
    // Field and axes can also be set spcifically for one character
    field?:string
    axes?: {
        x?:string
        y?:string
    } 
    annotations?:AnnotationDefinition[]
}


export interface AnnotationDefinition extends Named {
    name:string
    offset?:OffsetDefinition
    anchor?:string
}

export interface OffsetDefinition {
    left:number
    top:number
}


export interface MorphingChartDefinition extends Named {
    name:string
    from:Chart
    to:Chart
    design?:Design
    characters:MorphingCharacterDefinition[]
}

export interface MorphingCharacterDefinition {
    from:string
    to:string
}

export interface StepDefinition {
    from:number
    to:number
    draw:Drawable
}
