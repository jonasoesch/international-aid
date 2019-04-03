import {oldBoys} from "./charts/oldBoys"
import {newKids} from "./charts/newKids"
import {MorphingChartDefinition} from "./lib/Definitions"
import {MorphingChart} from "./lib/MorphingChart"

Promise.all([ oldBoys(), newKids() ]).then(charts => {
    charts.forEach(c => c.draw())

    let oldBoys = charts[0]
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
            {from: "All others", to: "Others"},
        ]
    }

    let m = new MorphingChart(morphin)
    m.draw()
})
