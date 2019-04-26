import {ranking} from "../charts/2-ranking"
import {rankingNewKids2} from "../charts/2-rankingNewKids2"
import {newKids} from "../charts/3-newKids"
import {MorphingChartDefinition, StepDefinition} from "../lib/Definitions"
import {MorphingChart} from "../lib/MorphingChart"
import {SuperposedDirector} from "../lib/Director"

Promise.all([ ranking(), rankingNewKids2(), newKids()
]).then(charts => {

    let ranking = charts[0]
    let rankingNewKids2 = charts[1]
    let newKids = charts[2]


        let rankingNewKids1 = new MorphingChart({
        name: "rankingNewKids1",
        from: ranking,
        to: rankingNewKids2,
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


        let rankingNewKids3 = new MorphingChart({
        name: "rankingNewKids3",
        from: rankingNewKids2,
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
        {from: -300, to:300, draw:ranking},
        {from: 300, to:600, draw:rankingNewKids1},
        {from: 600, to:1000, draw:rankingNewKids3},
        {from: 1000, to:6000, draw:newKids},
    ]
    new SuperposedDirector(steps)
         
})
