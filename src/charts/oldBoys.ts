import * as d3 from "d3"
import {Chart} from "../lib/Chart"
import {Axis} from "../lib/Axis"
import {Character} from "../lib/Character"
import {AxisDefinition, CharacterDefinition} from "../lib/Definitions"

class SlopeChart extends Chart {
    buildAxis(axis:AxisDefinition):SlopeAxis {
        let s = this.axisStage(axis.name)
        return new SlopeAxis(axis, s, this.innerWidth, this.innerHeight)
    }

    buildCharacter(chara:CharacterDefinition):SlopeCharacter {
        let s = this.characterStage(chara.name) 
        return new SlopeCharacter(chara, s, this.axes.get("from"), this.axes.get("x"))
    }

    dataForCharacter(field:string, name:string) {
        let e:object[]
        this.data.forEach((d:any) => {
            if(d[field] === name) {
               e.push(d)  
            }
        })
        
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
            if(this.name === "from") {axis = d3.axisLeft(this.scale)}
        if(this.name === "to") {axis = d3.axisRight(this.scale)}
        if(this.name !== "x") {
            this.stage.call(this.throwIfNotSet(axis, 
                "Axis name needs to be either 'from' or 'to'"))
        }
        if(this.name === "to") {
            this.stage.attr("transform", `translate(${this.width}, 0)`) 
        }

    }
}


class SlopeCharacter extends Character {
    yScale:any
    xScale:any

    constructor(charDef:CharacterDefinition,
        stage:d3.Selection<any, any, any, any>,
        yAxis:any,
        xAxis:any) 
    {
        super(charDef, stage)
        this.yScale = yAxis.scale
        this.xScale = xAxis.scale
    }

    draw() {
        let data = [{value: 3}, {value: 5}]
        let a = d3.area()
            .x((d:any, i:number) => this.xScale(i))
            .y0((d:any) => this.yScale(d.value))
            .y1((d:any) => this.yScale(d.value)-1)


        this.stage
            .append("path")
            .datum(data)
            .attr("d", (a as any))
            .attr("fill", this.color)
    }
}



export function oldBoys():Promise<any> {
    return d3.csv("data/oldBoys.csv").then((data) => {

        let a = {
            name: "oldBoys",
            data: data,
            annotations: [{
                name: "Blabla",
                offset: {
                    left: 20,
                    top: 20
                }
            }],
            axes: [
                {
                    name: "from",
                    domain: [0,10],
                    annotations: [
                        {name: "70s", offset: {left: 0, top: 0}}
                    ]
                },
                {
                    name: "to",
                    domain: [0, 10]
                },
                {
                    name: "x",
                    domain: [0, 1]
                }
            ],
            characters: [
                { field: "donor",
                    name: "USA",
                    color: "red",
                    annotations: [
                        {name: "USA", offset: {left: 0, top: 0}} 
                    ],
                    axes: {
                        y: "from"
                    }
                }
            ]
        }


        let chart = new SlopeChart(a)
        chart.draw()
    })
}
