import {oldBoys} from "./charts/oldBoys"
import {newKids} from "./charts/newKids"
import {MorphingChartDefinition, StepDefinition} from "./lib/Definitions"
import {MorphingChart} from "./lib/MorphingChart"
import {Director} from "./lib/Director"

Promise.all([ oldBoys(), newKids() ]).then(charts => {

    let oldBoys = charts[0]
    oldBoys.draw()
    let newKids = charts[1]

    let morphin:MorphingChartDefinition = {
        name: "morphingNewKids",
        from: oldBoys,
        to: newKids,
        characters: [
            {from: "All others", to: "Taiwan"},
            {from: "All others", to: "India"},
            {from: "All others", to: "Ireland"},
            {from: "All others", to: "Greece"},
            {from: "All others", to: "Korea"},
        ]
    }

    let morphIntoNewKids = new MorphingChart(morphin)


    let steps:StepDefinition[] = [
        {from: -200, to:100, draw:oldBoys},
        {from: 100, to:300, draw:morphIntoNewKids},
        {from: 300, to:1500, draw:newKids},
    ]
    new Director(steps)
         
})
