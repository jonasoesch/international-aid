import * as d3 from "d3"
import {Drawable} from "./Drawable"
import {MorphingChartDefinition, MorphingCharacterDefinition} from "./Definitions"
import {Chart} from "./Chart"
import {Character} from "./Character"
import {MorphingCharacter} from "./MorphingCharacter"



export class MorphingChart implements Drawable {
    name:string
    from:Chart
    to:Chart
    stage:d3.Selection<any, any, any, any>
        characters:MorphingCharacter[]


        constructor(chartDef:MorphingChartDefinition) {
            this.from = chartDef.from
            this.to = chartDef.to    
            this.name = chartDef.name
            this.initStage()
            this.characters = this.buildCharacters(chartDef.characters)
        }


    /** Adds an SVG with the right dimensions
     * into the containing element
     **/
    private initStage() {
        console.log("staging")
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
            throw new Error("Don't know where to draw the Graph")
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
    }




    draw() {
        this.characters.forEach( c => c.draw() )
    }
    hide() {}
}
