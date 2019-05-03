import {rise} from "../charts/1-rise"
import {riseNewKids2} from "../charts/2-riseNewKids2"
import {newKids} from "../charts/3-newKids"
import {MorphingChartDefinition, StepDefinition} from "../lib/Definitions"
import {MorphingChart} from "../lib/MorphingChart"
import {FadingChart} from "../lib/FadingChart"
import {JuxtaposedDirector} from "../lib/Director"

Promise.all([ rise(), riseNewKids2(), newKids()]).then(charts => {

    let rise = charts[0]
    let riseNewKids2 = charts[1]
    let newKids = charts[2]


       let riseNewKids1 = new MorphingChart({
        name: "riseNewKids1",
        from: rise,
        to: riseNewKids2,
        characters: [
            {from: "United States", to: "United States"},
            {from: "Japan", to: "Japan"},
            {from: "Germany", to: "Germany"},
            {from: "France", to: "France"},
            {from: "United Kingdom", to: "United Kingdom"},
            {from: "Netherlands", to: "Netherlands"},
            {from: "Canada", to: "Canada"},
            {from: "Norway", to: "Norway"},
            {from: "Norway", to: "Norway"},
            {from: "Australia", to: "Australia"},
            {from: "Sweden", to: "Sweden"},
            {from: "Denmark", to: "Denmark"},
            {from: "Switzerland", to: "Switzerland"},
            {from: "Belgium", to: "Belgium"},
            {from: "Kuwait", to: "Kuwait"},
            {from: "United Arab Emirates", to: "United Arab Emirates"},
            {from: "Saudi Arabia", to: "Saudi Arabia"},
            {from: "Others", to: "Others"},
        ]
    })


    let riseNewKids3 = new MorphingChart({
        name: "riseNewKids3",
        from: riseNewKids2,
        to: newKids, //rankingNewKids4,
        characters: [
            {from: "United States", to: "old"},
            {from: "Japan", to: "old"},
            {from: "Germany", to: "old"},
            {from: "France", to: "old"},
            {from: "United Kingdom", to: "old"},
            {from: "Netherlands", to: "old"},
            {from: "Canada", to: "old"},
            {from: "Norway", to: "old"},
            {from: "Norway", to: "old"},
            {from: "Australia", to: "old"},
            {from: "Sweden", to: "old"},
            {from: "Denmark", to: "old"},
            {from: "Switzerland", to: "old"},
            {from: "Belgium", to: "old"},
            {from: "Kuwait", to: "old"},
            {from: "United Arab Emirates", to: "old"},
            {from: "Saudi Arabia", to: "old"},
            {from: "Others", to: "old"},
        ]
    })


    let steps:StepDefinition[] = [
        {from: -300, to:200, draw:rise},
        {from: 200, to:600, draw:riseNewKids1},
        {from: 600, to:1000, draw:riseNewKids3},
        {from: 1000, to:6000, draw:newKids},
    ]
    new JuxtaposedDirector(steps)

})
