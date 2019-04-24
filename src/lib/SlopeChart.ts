import * as d3 from "d3"
import {Chart} from "./Chart"
import {Axis} from "./Axis"
import {Character} from "./Character"
import {Annotation} from "./Annotation"
import {AxisDefinition, CharacterDefinition} from "./Definitions"
import {throwIfNotSet, valOrDefault, throwIfEmpty} from "./Helpers"


export class SlopeChart extends Chart {
    buildAxis(axis:AxisDefinition):SlopeAxis {
        let s = this.axisStage(axis.name)
        return new SlopeAxis(axis, s, this.innerWidth, this.innerHeight)
    }

    buildCharacter(chara:CharacterDefinition):SlopeCharacter {
        let stage = this.characterStage(throwIfNotSet(chara.name, "Character has no name"))
        let data = this.data.filter( (d:any) => d[chara.field] === chara.name ) 
        throwIfEmpty(data, `There is no data for character ${chara.name}`)
        let character =  new SlopeCharacter(chara, stage, data, this.axes.get("from"), this.axes.get("x"))
        return character
    }

}

class SlopeAxis extends Axis {
    defineScale(domain:(number[]|string[])) {
        if(this.name === "from" || this.name === "to") {
            return d3.scaleLinear()
                    .domain((domain as number[]).reverse())
                    .range([0, this.height])
        }
        if(this.name === "x") {
            return d3.scaleOrdinal()
                    .domain((domain as string[]))
                    .range([0, this.width])
        }
    }

    draw() {
        let axis:d3.Axis<number[]> 
        this.stage.selectAll("*").remove()
        if(this.name === "from") {axis = d3.axisLeft(this.scale).tickArguments([6]);}
        if(this.name === "to") {axis = d3.axisRight(this.scale).tickArguments([6]);}
        if(this.ticks) {axis.tickValues(this.ticks)}
        if(this.name === "from") {
            this.stage
                .attr("class", "axis")
                .call(throwIfNotSet(axis, "Axis name needs to be either 'from' or 'to'"))
        }
        if(this.name === "to") {
            this.stage.attr("transform", `translate(${this.width}, 0)`) 
        }

        this.stage.selectAll(".tick line")
            .attr("x2", this.width)
            .attr("stroke-dasharray", 4)

        this.drawAnnotations()

    }


    drawAnnotation(annotation:any) {
        this.stage
            .append("text")
            .attr("class", "axis-label")
            .text(annotation.name)
            .attr("text-anchor", "start")
            .attr("x", annotation.offset.left)
            .attr("y", annotation.offset.top + this.height * this.annotationPosition(annotation.anchor) + 40)

    }

}


class SlopeCharacter extends Character {
    yScale:any
    y:string
    xScale:any
    x:string
    data:any

    constructor(charDef:CharacterDefinition,
        stage:d3.Selection<any, any, any, any>,
        data:object[],
        yAxis:any,
        xAxis:any) 
    {
        super(charDef, data, stage)
        this.yScale = yAxis.scale
        this.y = yAxis.field
        this.xScale = xAxis.scale
        this.x = xAxis.field
        this.data = throwIfEmpty(data, `There is no data for character ${this.name}`)
        this.field = charDef.field
    }

    draw() {
        this.stage.selectAll("*").remove()
        this.stage
            .append("path")
            .attr("d", this.path)
            .attr("fill", this.color)
        this.drawAnnotations()
    }

    drawAnnotation(annotation:any) {
        this.stage
            .append("text")
            .text(annotation.name)
            .attr("fill", this.color)
            .attr("text-anchor", "start")
            //.attr("fill", this.lightOrDarkBg(this.color, "#fff", "#000"))
            .attr("y", this.annotationY(annotation))
            .attr("x",this.annotationX(annotation))
    }


    pathGenerator() {

        return d3.area()
            .x((d:any, i:number) => this.xScale(d[this.x]))
            .y0((d:any) => this.yScale(d[this.y]))
            .y1((d:any) => this.yScale(d[this.y])-2)
    }


    protected annotationY(annotation:Annotation):number {
        let pos = this.annotationPosition(annotation.anchor)
       return this.yScale(this.data[pos][this.y]) + 3 + annotation.offset.top
    }

    protected annotationX(annotation:Annotation):number {
        let pos = this.annotationPosition(annotation.anchor)
        return this.xScale(this.data[pos][this.x]) + 5 + annotation.offset.left 
    }


    protected annotationPosition(pos:(string|number)):number {
        if(pos === "start") {pos = 0}
        if(pos === "end") {pos = this.data.length -1}
        if(typeof(pos) === "string") {pos = 0} // Users mistake
        return pos
    }


}
