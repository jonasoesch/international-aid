import {rise} from "../charts/1-rise"
import {newKids} from "../charts/3-newKids"
import {MorphingChartDefinition, StepDefinition} from "../lib/Definitions"
import {MorphingChart} from "../lib/MorphingChart"
import {SuperposedDirector} from "../lib/Director"

Promise.all([ rise(), newKids()]).then(charts => {

    let rise = charts[0]
    let newKids = charts[1]

    let steps:StepDefinition[] = [
        {from: -300, to:200, draw:rise},
        {from: 200, to:7000, draw:newKids},
    ]
    new SuperposedDirector(steps)
         
})
