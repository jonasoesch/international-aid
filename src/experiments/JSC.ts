import {newKids} from "../charts/3-newKids"
import {whoAreThey} from "../charts/4-whoAreThey"
import {MorphingChartDefinition, StepDefinition} from "../lib/Definitions"
import {MorphingChart} from "../lib/MorphingChart"
import {FadingChart} from "../lib/FadingChart"
import {JuxtaposedDirector} from "../lib/Director"

Promise.all([ newKids(), whoAreThey()]).then(charts => {

    let newKids = charts[0]
    let whoAreThey = charts[1]

    let steps:StepDefinition[] = [
        {from: -300, to:20000, draw:newKids},
        {from: -300, to:20000, draw:whoAreThey},
    ]
    new JuxtaposedDirector(steps)

})
