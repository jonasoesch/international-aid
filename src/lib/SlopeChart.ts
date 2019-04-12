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
        if(this.name === "from") {
            this.stage
                .attr("class", "axis")
                .call(throwIfNotSet(axis, "Axis name needs to be either 'from' or 'to'"))
        }
        if(this.name === "to") {
            this.stage.attr("transform", `translate(${this.width}, 0)`) 
        }

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
            .attr("fill", "#fff")
            .attr("x", annotation.offset.left)
            .attr("y", annotation.offset.top)
    }
}


class SlopeCharacter extends Character {
    yScale:any
    y:string
    xScale:any
    data:any

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
        this.data = throwIfEmpty(data, `There is no data for ${this.name}`)
        this.field = charDef.field
        this.annotations = valOrDefault(charDef.annotations, []) 
    }

    draw() {
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
            .x((d:any, i:number) => this.xScale(i))
            .y0((d:any) => this.yScale(d[this.y]))
            .y1((d:any) => this.yScale(d[this.y])-2)
    }

    get path() {
        throwIfEmpty(this.data, `No data for ${this.name}`)
        return this.pathGenerator()(this.data)
    }


    protected annotationY(annotation:Annotation):number {
       return this.yScale(this.data[0][this.y]) + 5 + annotation.offset.top
    }

    protected annotationX(annotation:Annotation):number {
        return this.xScale(1)+5 
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
