import {Character} from "./Character"
import {interpolatePath} from "./interpolation/interpolatePath"

export class MorphingCharacter {
    from:Character
    to:Character
    stage:d3.Selection<any, any, any, any>
        position:number = 0

    constructor(from:Character, to:Character, stage:d3.Selection<any, any, any, any>) {
        this.from = from
        this.to = to
        this.stage = stage
    }

    draw() {new Date()

            let p:string
            p = interpolatePath(this.from.path, this.to.path)(this.position)

        this.stage.append("path") 
            .attr("d", p)
            .attr("stroke", "black")
    }


    atPosition(position:number) {
        this.position = position 
        return this
    }
}
