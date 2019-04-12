import * as d3 from "d3"
import {Drawable} from "./Drawable"
import {Design} from "./Design"
import {Character} from './Character'
import {Axis} from "./Axis"
import {Annotation} from "./Annotation"
import {ChartDefinition, 
    AxisDefinition, 
    CastDefinition, 
    CharacterDefinition, 
    AnnotationDefinition,
    Named} from "./Definitions"
import {buildMapWithName, throwIfNotSet, valOrDefault, throwIfEmpty} from "./Helpers"


interface Scale extends Function {
    domain:Function 
}

export abstract class Chart implements Drawable {
    _name:string
    _data:any
    _stage:d3.Selection<any, any, any, any>

    _design:Design = new Design()
    _annotations:Map<string, Annotation> = new Map()
    _characters:Map<string, Character> = new Map()
    _axes:Map<string, Axis> = new Map()


    constructor(definition:ChartDefinition) {
        this.validateDefinition(definition)
        this.name = throwIfNotSet(definition.name, "There is no chart name")
        this.initStage()
        this.buildChart(definition)
    }


    validateDefinition(definition:ChartDefinition) {
        this.hasAName(definition)
        this.hasData(definition) 
        this.axesMatchData(definition)
        this.castMatchesAxes(definition)
        this.castMatchesData(definition)
        this.charactersInData(definition)
    }

    hasAName(definition:ChartDefinition) {
        throwIfNotSet(definition.name, `Chart has no name`) 
    }

    hasData(definition:ChartDefinition) {
        throwIfEmpty(definition.data, `There is no data for chart ${definition.name}`) 
    }

    axesMatchData(definition:ChartDefinition) {
        definition.axes.forEach(a => {
            if(a.hasOwnProperty("field"))  {
                if(!definition.data[0].hasOwnProperty(a.field))  {
                    throw new Error(`There is no ${a.field} field in the data provided to the ${definition.name} chart`)  
                }
            }
        }) 
    }

    castMatchesAxes(definition:ChartDefinition) {
        this.castMatchAxis(definition, "x")
        this.castMatchAxis(definition, "y")
    }

    castMatchAxis(definition:ChartDefinition, axis:"x"|"y") {
        if(definition.cast.axes.hasOwnProperty(axis)) {
            let matches = definition.axes.filter(a => {
                if(a.hasOwnProperty("name") && a.name === definition.cast.axes[axis]) {return true} 
                else {return false}
            })
            if(matches.length === 0) {
                throw new Error(`In the ${definition.name}-chart definition, an axis named "${definition.cast.axes[axis]}" is missing`)
            }
            if(matches.length > 1) {
                throw new Error(`In the ${definition.name}-chart definition, an axis named "${definition.cast.axes[axis]}" occurs more than once`) 
            }
        }
    }


    castMatchesData(definition:ChartDefinition) {
        if(!definition.data[0].hasOwnProperty(definition.cast.field)) {
            throw new Error(`In the "${definition.name}"-chart definition, the field "${definition.cast.field}" given for the characters can't be found in the data`)  
        }
    }


    charactersInData(definition:ChartDefinition) {
        definition.cast.characters.forEach(c => {
            let matches = definition.data.filter((d:any) => {
                return d[definition.cast.field] === c.name
            })
            if(matches.length === 0) {
                throw new Error(`In chart "${definition.name}", the character "${c.name} can't be found in the "${definition.cast.field}"-field in the data`) 
            }

        }) 
    }




    /** Adds an SVG with the right dimensions
     * into the containing element
     **/
    private initStage() {
        this.insertChart()
        this.setDimensions()
    }



    private insertChart() {
        this.stage = d3.select(this.container)
            .append("svg")
            .attr("id", `${this.name}-stage`)
    }

    private setDimensions() {
        this.stage
            .attr("width", this.width)
            .attr("height", this.height)
    }


    get width() {
        return this.container ? 
            this.container.getBoundingClientRect().width : 
            1080 
    }

    get innerWidth() {
        return this.width - (2*this.design.margin) 
    }

    get height() {
        return this.container ?
            this.container.getBoundingClientRect().height : 
            720
    }

    get innerHeight() {
        return this.height - (2*this.design.margin)
    }


    get container():HTMLElement {
        if(document.getElementById(this.name)) {
            return document.getElementById(this.name)
        } else {
            throw new Error(`Don't know where to draw the chart with name ${this.name}`)
        }
    }

    buildChart(def:ChartDefinition) {
        this.data = def.data
        this.axes = this.buildAxes(def.axes)
        this.characters = this.buildCharacters(def.cast)
        this.annotations = this.buildAnnotations(def.annotations)
    }


    buildAxes(axes:AxisDefinition[]):Map<string, Axis> {
        return buildMapWithName(axes, this.buildAxis.bind(this))
    }

    axisStage(name:string):d3.Selection<any, any, any, any> {
        return this.stage.append("g")
        .attr("transform", `translate(${this.design.margin}, ${this.design.margin})`)
        .append("g")
        .attr("id", `axis-${name}`)
    }

    characterStage(name:string):d3.Selection<any, any, any, any> {
        return this.stage.append("g")
        .attr("id", `character-${name}`)
        .attr("transform", `translate(${this.design.margin}, ${this.design.margin})`) 
    }

    abstract buildAxis(axis:AxisDefinition):Axis

    buildCharacters(cast:CastDefinition) {
        let characters = cast.characters.map( (chara:CharacterDefinition) => {
            chara.axes = cast.axes
            chara.field = cast.field
            return chara
        })
        return buildMapWithName(characters, this.buildCharacter.bind(this)) 
    }

    abstract buildCharacter(charaDef:CharacterDefinition):Character

    buildAnnotations(annos:AnnotationDefinition[]) {
        return buildMapWithName(annos, this.buildAnnotation)
    }

    buildAnnotation(annoDef:AnnotationDefinition) {
        return new Annotation(annoDef)
    }


    // ========= Helper methods ==========



    draw() {
        this.drawAxes()
        this.drawCharacters()
        this.unhide()
    }

    protected drawAxes() {
        this.axes.forEach(a => a.draw())
    }
    protected drawCharacters() {
        this.characters.forEach(c => c.draw())
    }
    protected drawDescription() {}

    /**
     * Hide the whole graph
     **/
    hide() {
        this.stage
        //.transition()
        //.duration(100)
            .style("opacity", 0)
    }

    /**
     * Show the whole graph (typically used after hiding it)
     **/
    unhide() {
        this.stage
        //.transition()
        //.duration(500)
            .style("opacity", 1)
    }


    get name() { return this._name  }
    set name(name:string) {this._name = name }

    get design() { return this._design }
    set design(dsgn:Design) { this._design = dsgn }

    get stage():d3.Selection<any, any, any, any> { return this._stage }
    set stage(stage:d3.Selection<any, any, any, any>) {this._stage = stage }


    set data(d:any) { this._data = throwIfNotSet(d) }
    get data() {return this._data}
    set axes(axes:Map<string, Axis>) {this._axes = axes}
    get axes() {return this._axes}
    set characters(chars:Map<string, Character>) {this._characters = chars}
    get characters() {return this._characters}
    set annotations(annot:Map<string, Annotation>) {this._annotations = annot}


}
