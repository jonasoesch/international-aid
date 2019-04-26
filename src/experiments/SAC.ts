import {newKids} from "../charts/3-newKids"
import {newKidsWhoAreThey2} from "../charts/3-newKidsWhoAreThey2"
import {whoAreThey} from "../charts/4-whoAreThey"
import {MorphingChartDefinition, StepDefinition} from "../lib/Definitions"
import {MorphingChart} from "../lib/MorphingChart"
import {FadingChart} from "../lib/FadingChart"
import {SuperposedDirector} from "../lib/Director"

Promise.all([ newKids(), newKidsWhoAreThey2(), whoAreThey()]).then(charts => {

    let newKids = charts[0]
    let newKidsWhoAreThey2 = charts[1]
    let whoAreThey = charts[2]


    let newKidsWhoAreThey1 = new MorphingChart({
        name: "newKidsWhoAreThey1",
        from: newKids,
        to: newKidsWhoAreThey2,
        characters: [
            {from: "new", to: "new"},
        ]
    })

    let newKidsWhoAreThey3 = new FadingChart({
        name: "newKidsWhoAreThey3",
        from: newKidsWhoAreThey2,
        to: whoAreThey,
    })



    let steps:StepDefinition[] = [
        {from: -300, to:200, draw:newKids},
        {from: 200, to:600, draw:newKidsWhoAreThey1},
        {from: 600, to:700, draw:newKidsWhoAreThey2},
        {from: 700, to:1000, draw:newKidsWhoAreThey3},
        {from: 1000, to:20000, draw:whoAreThey},
    ]
    new SuperposedDirector(steps)

})
