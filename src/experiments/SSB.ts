import {ranking} from "../charts/2-ranking"
import {newKids} from "../charts/3-newKids"
import {MorphingChartDefinition, StepDefinition} from "../lib/Definitions"
import {MorphingChart} from "../lib/MorphingChart"
import {SuperposedDirector} from "../lib/Director"

Promise.all([ ranking(), newKids()]).then(charts => {

    let ranking = charts[0]
    let newKids = charts[1]

    let steps:StepDefinition[] = [
        {from: -300, to:200, draw:ranking},
        {from: 200, to:7000, draw:newKids},
    ]
    new SuperposedDirector(steps)
         
})
