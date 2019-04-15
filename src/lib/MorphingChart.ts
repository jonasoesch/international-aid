import * as d3 from "d3"
import {Drawable} from "./Drawable"
import {MorphingChartDefinition, MorphingCharacterDefinition} from "./Definitions"
import {Chart} from "./Chart"
import {Character} from "./Character"
import {MorphingCharacter} from "./MorphingCharacter"
import {Design} from "./Design"
import {valOrDefault, throwIfNotSet} from "./Helpers"



export class MorphingChart implements Drawable {
    name:string
    from:Chart
    to:Chart
    design:Design 
    stage:d3.Selection<any, any, any, any>
    characters:MorphingCharacter[]
    position:number = 0


    constructor(chartDef:MorphingChartDefinition) {
        this.name = throwIfNotSet(chartDef.name, "No name for MorphinChart")
        this.to = throwIfNotSet(chartDef.to, `Target chart not defined for ${this.name}`) 
        this.from = throwIfNotSet(chartDef.from, `Origin chart not defined for ${this.name}`)
        this.design = valOrDefault(chartDef.design, this.from.design)
        this.initStage()
        this.characters = this.buildCharacters(chartDef.characters)
    }


    /** Adds an SVG with the right dimensions
     * into the containing element
     **/
    private initStage() {
        this.insertChart()
        this.setDimensions()
    }


    // TODO: Make dimensions morphable
    private setDimensions() {
        this.stage
            .attr("width", this.from.width)
            .attr("height", this.from.height)
    }


    private insertChart() {
        this.stage = d3.select(this.container)
            .append("svg")
            .attr("id", `${this.name}-stage`)
    }


    get container():HTMLElement {
        if(document.getElementById(this.name)) {
            return document.getElementById(this.name)
        } else {
            throw new Error(`Don't know where to draw the chart with name ${this.name}`)
        }
    }

    buildCharacters(charaDefs:MorphingCharacterDefinition[]) {
        return charaDefs.map( (charaDef:MorphingCharacterDefinition) => {
            return new MorphingCharacter(
                this.getCharacter(this.from, charaDef.from),
                this.getCharacter(this.to, charaDef.to),
                this.characterStage(),
            ) 
        })
    }

    getCharacter(chart:Chart, name:string):Character {
        return chart.characters.get(name)  
    }


    characterStage():d3.Selection<any, any, any, any> {
        return this.stage.append("g")
            .attr("transform", `translate(${this.design.margin}, ${this.design.margin})`)
    }

    atPosition(position:number) {
        this.position = position 
        return this
    }


    draw() {
        this.hide()
        this.characters.forEach( c => c.atPosition(this.position).draw() )
    }
    hide() {
        this.stage.selectAll("g *").remove()
    } 


    unhide() {
    }

}
