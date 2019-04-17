import * as d3 from "d3"
import {Chart} from "./Chart"
import {Axis} from "./Axis"
import {Character} from "./Character"
import {Annotation} from "./Annotation"
import {AxisDefinition, CharacterDefinition} from "./Definitions"
import {throwIfNotSet, valOrDefault, throwIfEmpty} from "./Helpers"


export class StackedTimeseriesChart extends Chart {
    buildAxis(axis:AxisDefinition):StackedTimeseriesAxis {
        let s = this.axisStage(axis.name)
        return new StackedTimeseriesAxis(axis, s, this.innerWidth, this.innerHeight)
    }

    buildCharacter(chara:CharacterDefinition):StackedTimeseriesCharacter {
        let stage = this.characterStage(throwIfNotSet(chara.name, "Character has no name"))
        let data = this.data.filter( (d:any) => d[chara.field] === chara.name ) 
        throwIfEmpty(data, `There is no data for character ${chara.name}`)
        let character =  new StackedTimeseriesCharacter(chara, stage, data, this.axes.get("y"), this.axes.get("x"))
        return character
    }

}

class StackedTimeseriesAxis extends Axis {
    defineScale(domain:(number[]|string[]|Date[])) {
        if(this.name === "y") {
            return d3.scaleLinear()
                    .domain((domain as number[]).reverse())
                    .range([0, this.height])
        }
        if(this.name === "x") {
            return d3.scaleTime()
                    .domain((domain as Date[]))
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

    drawAnnotations() {
        this.annotations.forEach(a => this.drawAnnotation(a)) 
    }

    drawAnnotation(annotation:any) {
        this.stage
            .append("text")
            .attr("class", "axis-label")
            .text(annotation.name)
            .attr("x", annotation.offset.left)
            .attr("y", annotation.offset.top + this.height * this.annotationPosition(annotation.anchor) + 40)

    }


    protected annotationPosition(pos:(string|number)):number {
        if(pos === "start") {pos = 0}
        if(pos === "end") {pos = 1}
        if(typeof(pos) === "string") {pos = 0} // Users mistake
        return pos
    }
}


class StackedTimeseriesCharacter extends Character {
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

    drawAnnotations() {
        if(this.annotations.length > 0) {
            this.annotations.forEach(a => this.drawAnnotation(a)) 
        }
    }


    drawAnnotation(annotation:any) {
        this.stage
            .append("text")
            .text(annotation.name)
            .attr("fill", this.color)
            //.attr("fill", this.lightOrDarkBg(this.color, "#fff", "#000"))
            .attr("y", this.annotationY(annotation))
            .attr("x",this.annotationX(annotation))
    }


    pathGenerator() {

        return d3.area()
            .x((d:any, i:number) => this.xScale(d[this.x]))
            .y0((d:any) => this.yScale(d[this.y]))
            .y1((d:any) => this.yScale(0))
    }

    get path() {
        throwIfEmpty(this.data, `No data for ${this.name}`)
        return this.pathGenerator()(this.data)
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



    get label() {
        let annot = this.annotations[0] 
        return {
            name: annot.name,
            x: this.annotationX(annot),
            y: this.annotationY(annot)
        }
    }

}
