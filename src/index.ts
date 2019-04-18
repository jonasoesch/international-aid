import {rise} from "./charts/1-rise"
import {ranking} from "./charts/2-ranking"
import {newKids} from "./charts/3-newKids"
import {whoAreThey} from "./charts/4-whoAreThey"
import {precisely} from "./charts/5-precisely"
import {recieved} from "./charts/6-recieved"
import {repaying} from "./charts/7-repaying"
import {MorphingChartDefinition, StepDefinition} from "./lib/Definitions"
import {MorphingChart} from "./lib/MorphingChart"
import {Director} from "./lib/Director"

Promise.all([ rise(), ranking(), newKids(), whoAreThey()
]).then(charts => {

    let rise = charts[0]
    let ranking = charts[1]
    let newKids = charts[2]
    let whoAreThey = charts[3]



    let riseRanking = new MorphingChart({
        name: "riseRanking",
        from: rise,
        to: ranking,
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


        let rankingNewKids = new MorphingChart({
        name: "rankingNewKids",
        from: ranking,
        to: newKids,
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


        let newKidsWhoAreThey = new MorphingChart({
        name: "newKidsWhoAreThey",
        from: newKids,
        to: whoAreThey,
        characters: [
            {from: "new", to: "India"},
            {from: "new", to: "Greece"},
            {from: "new", to: "Others"},
            {from: "new", to: "Taiwan"},
            {from: "new", to: "Ireland"},
            {from: "new", to: "Korea"},
            {from: "new", to: "Liechtenstein"},
            {from: "new", to: "Portugal"},
            {from: "new", to: "Spain"},
        ]
    })

    let steps:StepDefinition[] = [
        {from: -200, to:100, draw:rise},
        {from: 100, to:300, draw:riseRanking},
        {from: 300, to:600, draw:ranking},
        {from: 600, to:800, draw:rankingNewKids},
        {from: 800, to:1000, draw:newKids},
        {from: 1000, to:1200, draw:newKidsWhoAreThey},
        {from: 1200, to:1500, draw:whoAreThey},
    ]
    let d = new Director(steps)
    whoAreThey.draw()
         
})
