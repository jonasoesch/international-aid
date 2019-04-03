import * as d3 from "d3"
import {Chart} from "./Chart"
import {Axis} from "./Axis"
import {Character} from "./Character"
import {AxisDefinition, CharacterDefinition} from "./Definitions"
import {throwIfNotSet} from "./Helpers"


export class TimeseriesChart extends Chart {
    buildAxis(axis:AxisDefinition):TimeseriesAxis {
        let s = this.axisStage(axis.name)
        return new TimeseriesAxis(axis, s, this.innerWidth, this.innerHeight)
    }

    buildCharacter(chara:CharacterDefinition):TimeseriesCharacter {
        let stage = this.characterStage(chara.name) 
        let data = this.data.filter( (d:any) => d[chara.field] === chara.name ) 
        return new TimeseriesCharacter(chara, stage, data, this.axes.get("y"), this.axes.get("x"))
    }

}

class TimeseriesAxis extends Axis {
    defineScale(domain:number[]) {
        let s:any
        if(this.name === "y") {
            s = d3.scaleLinear().domain(domain.reverse()).range([0, this.height])
        }
        if(this.name === "x") {
            s = d3.scaleTime().domain(domain).range([0, this.width])
        }
        return s
    }

    draw() {
        let axis:d3.Axis<number[]> 
        if(this.name === "y") {axis = d3.axisLeft(this.scale)}
        if(this.name === "x") {axis = d3.axisBottom(this.scale)}
        this.stage.call(throwIfNotSet(axis, "Axis name needs to be either 'from' or 'to'"))

        if(this.name === "x") {
            this.stage.attr("transform", `translate(0, ${this.height})`) 
        }

    }
}


class TimeseriesCharacter extends Character {
    yScale:any
    y:string
    xScale:any
    x:string
    data:any
    field:string

    constructor(charDef:CharacterDefinition,
        stage:d3.Selection<any, any, any, any>,
        data:any,
        yAxis:any,
        xAxis:any) 
    {
        super(charDef, stage)
        this.data = data      
        this.field = charDef.field
        this.yScale = yAxis.scale
        this.y = yAxis.field
        this.xScale = xAxis.scale
        this.x = xAxis.field
    }

    draw() {
        console.log(this.data)

        this.stage
            .append("path")
            .datum(this.data)
            .attr("d", this.path)
            .attr("fill", this.color)
            .attr("stroke", this.color)
    }


    pathGenerator() {
        return d3.area()
            .x((d:any, i:number) => this.xScale(d[this.x]))
            .y0((d:any) => this.yScale(d[this.y]))
            .y1((d:any) => this.yScale(d[this.y]))
    }

    get path() {
        return this.pathGenerator()(this.data) 
    }

}

