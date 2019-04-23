import * as d3 from "d3"
import {Drawable} from "./Drawable"
import {FadingChartDefinition} from "./Definitions"
import {Chart} from "./Chart"
import { throwIfNotSet} from "./Helpers"


export class FadingChart implements Drawable {
    name:string
    from:Chart
    to:Chart
    stage:d3.Selection<any, any, any, any>
    position:number = 0

    constructor(chartDef:FadingChartDefinition) {
        this.name = throwIfNotSet(chartDef.name, "No name for MorphinChart")
        this.to = throwIfNotSet(chartDef.to, `Target chart not defined for ${this.name}`) 
        this.from = throwIfNotSet(chartDef.from, `Origin chart not defined for ${this.name}`)
    }

    atPosition(position:number) {
        this.position = position 
        return this
    }


    draw() {
        this.from.draw()
        this.to.draw()
        this.to.stage.style("opacity", this.position)
        this.from.stage.style("opacity", 1-this.position)
    }
    hide() {
    } 

    unhide() {
    }

}
