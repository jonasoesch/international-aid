import * as d3 from "d3"
import {Character} from "./Character"
import {interpolatePath} from "./interpolation/interpolatePath"
import {throwIfEmpty} from "./Helpers"

export class MorphingCharacter {
    from:Character
    to:Character
    stage:d3.Selection<any, any, any, any>
    position:number = 0

    constructor(from:Character, to:Character, stage:d3.Selection<any, any, any, any>) {
        this.from = from
        this.to = to
        this.stage = stage
    }

    draw() {
        let p:string
        p = interpolatePath(this.from.path, this.to.path)(this.position)


        this.stage.append("path") 
            .attr("d", p)
            .attr("stroke", this.color)
            .attr("fill", this.color)

        if (this.shouldMorphLabel) {this.drawLabel()}

    }

    drawLabel() {
        this.stage
            .append("text")
            .text(this.label.name)
            .attr("fill", this.color)
            .attr("y", this.label.y)
            .attr("x", this.label.x)
    }

    get label() {
        return {
            name: this.from.label.name,
            y: this.labelY(),
            x: this.labelX()
        }
    }


    labelY()  {
        return d3.interpolate(this.from.label.y, this.to.label.y)(this.position) 
    }

    labelX()  {
        return d3.interpolate(this.from.label.x, this.to.label.x)(this.position) 
    }


    atPosition(position:number) {
        this.position = position 
        return this
    }

    get color() {
        return d3.interpolateHcl(this.from.color, this.to.color)(this.position)
    }

    get shouldMorphLabel() {
        return this.from.label.name === this.to.label.name 
    }



}
