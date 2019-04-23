import * as d3 from 'd3'
import {Logger} from './Logger'
import {Drawable} from './Drawable'
import {MorphingChart} from "./MorphingChart"
import {FadingChart} from "./FadingChart"
import {StepDefinition} from "./Definitions"


export class Director {
    storyboard:Step[] = []
    timer:Date = new Date()
    logTimer:Date = new Date()
    lastScrollTop:number
    logger:Logger

    constructor(stepDefs:StepDefinition[]) {
       this.lastScrollTop = window.scrollY;
       //this.logger = new Logger()
        
        this.storyboard = this.buildSteps(stepDefs)
        
        if (window.requestAnimationFrame) {
            try {
                this.loop();
            } catch(e) {
                this.logger
            }
        }

        // Send log every 5 seconds
        // TODO: Decativate logger for now
        //setInterval(() => this.save(), 5 * 1000);
        //setInterval(() => this.alive(), 20 * 1000)
    }


    // It's faster to fire on each `animationFrame` instead of listening to the `onScroll`-event.
    private loop() {
        var scrollTop = window.scrollY;
        if (this.lastScrollTop === scrollTop) {
            window.requestAnimationFrame(() => this.loop());
            return;
        } else {
            this.lastScrollTop = scrollTop;

            // fire scroll function if scrolls vertically
            this.scrolling(scrollTop);
            window.requestAnimationFrame(() => this.loop());
        }
    } 



    private save() {
        this.logger.send()
    }

    private alive() {
        this.logger.alive()
        this.logger.send() 
    }



    /**
     * This method is called whenever a "scroll" is being detected and 
     * the scroll position passed.
     **/
    public scrolling(scroll:number) {

        let t = new Date()
        let difference = t.getTime() - this.timer.getTime()
        let logTimerDiff = t.getTime() - this.logTimer.getTime()

        // only execute if the last execution has
        // been more than x ms ago
        if(difference>10) {
            this.timer = t
            this.drawAll(scroll)
        }
    }

    /**
     * Draws every drawable in the storyboard that should
     * currently be visible. Hides all the other.
     **/
    public drawAll(offset:number) {
    this.storyboard.forEach( (step) => this.hide(step.draw) )
    this.storyboard.forEach( (step) => {
            if (offset > step.from && offset <= step.to) {
                this.draw(step.draw, this.howFar(step, offset)) 
            }
        })
    }


    private buildSteps(stepDefs:StepDefinition[]) {
        return stepDefs.map( (stepDef) => {
            return {
                from: stepDef.from,
                to: stepDef.to,
                draw: stepDef.draw
            }
        }) 
    }


    /**
     * This method transforms the global scroll position
     * to a percent value representing how far into the transition
     * the reader is.
     **/
    protected howFar(step:Step, offset:number):number {
        let total = step.to-step.from
        let position = offset - step.from

        if(total < 0) {throw new Error("End is before start")}
        if(position < 0) {throw new Error("Position is not between end and start")}

        return this.easing(position/total)
    }

    /**
     * The easing-method wraps `howFar` to allow the application of
     * different easing functions.
     **/
    easing(howFar:number){
        return d3.easePolyInOut(howFar) 
    }


    /**
     * Checks if a Drawable is a MorphingGraph.
     * If yes, calls `atPoint()` and passes the relative position (calculated in
     * the `howFar()`-method). Then it draws the `Drawable`.
     **/
    private draw(graph:Drawable, howFar:number) {
            //this.logger.animation(graph.name, howFar)
        if(graph instanceof MorphingChart || graph instanceof FadingChart) {
            graph.atPosition(howFar).draw() 
        } else {
            graph.draw() 
        }

    }

    hide(graph:Drawable) {
        graph.hide() 
    }


    /**
     * Returns the storyboard in human-readable form
     **/
    public toString():string {
        let out = ""
        this.storyboard.forEach(step => {
            out = out + step.from + "–"
            out = out + step.to + ": "
            out = out + step.draw.name + "\n"
        })
        return out
    }

}


interface Step {
    from:number
    to:number
    draw:Drawable
}


