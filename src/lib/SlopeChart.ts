import * as d3 from "d3"
import {Chart} from "./Chart"
import {Axis} from "./Axis"
import {Character} from "./Character"
import {AxisDefinition, CharacterDefinition} from "./Definitions"
import {throwIfNotSet} from "./Helpers"


export class SlopeChart extends Chart {
    buildAxis(axis:AxisDefinition):SlopeAxis {
        let s = this.axisStage(axis.name)
        return new SlopeAxis(axis, s, this.innerWidth, this.innerHeight)
    }

    buildCharacter(chara:CharacterDefinition):SlopeCharacter {
        let stage = this.characterStage(chara.name) 
        let data = this.data.filter( (d:any) => d[chara.field] === chara.name ) 
        return new SlopeCharacter(chara, stage, data, this.axes.get("from"), this.axes.get("x"))
    }

}

class SlopeAxis extends Axis {
    defineScale(domain:number[]) {
        let s = d3.scaleLinear()
        if(this.name === "from" || this.name === "to") {
            s.domain(domain.reverse()).range([0, this.height])
        }
        if(this.name === "x") {
            s.domain(domain).range([0, this.width])
        }
        return s
    }

    draw() {
        let axis:d3.Axis<number[]> 
        if(this.name === "from") {axis = d3.axisLeft(this.scale).tickArguments([5]);}
        if(this.name === "to") {axis = d3.axisRight(this.scale).tickArguments([5]);}
        if(this.name !== "x") {
            this.stage
                .attr("class", "axis")
                .call(throwIfNotSet(axis, "Axis name needs to be either 'from' or 'to'"))
        }
        if(this.name === "to") {
            this.stage.attr("transform", `translate(${this.width}, 0)`) 
        }

    }
}


class SlopeCharacter extends Character {
    yScale:any
    y:string
    xScale:any
    data:any
    field:string

    constructor(charDef:CharacterDefinition,
        stage:d3.Selection<any, any, any, any>,
        data:any,
        yAxis:any,
        xAxis:any) 
    {
        super(charDef, stage)
        this.yScale = yAxis.scale
        this.y = yAxis.field
        this.xScale = xAxis.scale
        this.data = data
        this.field = charDef.field
    }

    draw() {
        this.stage
            .append("path")
            .attr("d", this.path)
            .attr("fill", this.color)
    }


    pathGenerator() {
        return d3.area()
            .x((d:any, i:number) => this.xScale(i))
            .y0((d:any) => this.yScale(d[this.y]))
            .y1((d:any) => this.yScale(d["donations"])-2)
    }

    get path() {
        return this.pathGenerator()(this.data)
    }
}
