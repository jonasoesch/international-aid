import * as d3 from 'd3'
import {Logger} from './Logger'
import {Drawable} from './Drawable'


/**
 * A director is responsible for drawing and hiding Drawables based on the current scroll position. The director will also instantiate a `Logger` object and add a new record everytime it redraws the view.
 * It is used like this:
 * ```javascript
 *  // graph1, morphingGraph and graph2 are Drawables 
 *  let director = new Director() 
 *  director.addStep(graph1, 0, 500)
 *  director.addStep(morphingGraph, 500, 1000)
 *  director.addStep(graph2, 1000, 10000)
 * ```
 * With this code, the director will draw `graph1` from scroll position 0 to 500, `morphingGraph` from scroll position 500 to 1000 and `graph2` from scroll position 1000 to 10000.
 **/
export class Director {
    storyboard:Step[] = []
    timer:Date = new Date()
    logTimer:Date = new Date()
    lastScrollTop:number
    logger:Logger

    constructor() {
       this.lastScrollTop = window.scrollY;
       this.logger = new Logger()
        
        if (window.requestAnimationFrame) {
            let that = this
            try {
                this.loop();
            } catch(e) {
                this.logger
            }
        }

        // Send log every 5 seconds
        setInterval(() => this.save(), 5 * 1000);
        setInterval(() => this.alive(), 20 * 1000)
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
    this.storyboard.forEach( (step) => {
            if (offset > step.start && offset <= step.end) {
                this.draw(step.graph, this.howFar(step, offset)) 
            } else {
                this.hide(step.graph) 
            }
        })
    }


    /**
     *  Adding a new entry to the storyboard
     **/
    public addStep(start:number, end:number, graph:Drawable) {
        this.storyboard.push({
            start: start,
            end: end,
            graph: graph
        })
    }

    /**
     * This method transforms the global scroll position
     * to a percent value representing how far into the transition
     * the reader is.
     **/
    protected howFar(step:Step, offset:number):number {
        let total = step.end-step.start
        let position = offset - step.start

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
            out = out + step.start + "–"
            out = out + step.end + ": "
            out = out + step.graph.name + "\n"
        })
        return out
    }

}


interface Step {
    start:number
    end:number
    graph:Drawable
}


