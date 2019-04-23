import {rise} from "./charts/1-rise"
import {ranking} from "./charts/2-ranking"
import {rankingNewKids2} from "./charts/2-rankingNewKids2"
import {newKids} from "./charts/3-newKids"
import {newKidsWhoAreThey2} from "./charts/3-newKidsWhoAreThey2"
import {whoAreThey} from "./charts/4-whoAreThey"
import {precisely} from "./charts/5-precisely"
import {recieved} from "./charts/6-recieved"
import {repaying} from "./charts/7-repaying"
import {MorphingChartDefinition, StepDefinition} from "./lib/Definitions"
import {MorphingChart} from "./lib/MorphingChart"
import {FadingChart} from "./lib/FadingChart"
import {Director} from "./lib/Director"

Promise.all([ rise(), ranking(), rankingNewKids2(), newKids(), newKidsWhoAreThey2(), whoAreThey()
]).then(charts => {

    let rise = charts[0]
    let ranking = charts[1]
    let rankingNewKids2 = charts[2]
    let newKids = charts[3]
    let newKidsWhoAreThey2 = charts[4]
    let whoAreThey = charts[5]


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
        {from: -200, to:100, draw:rise},
        {from: 100, to:300, draw:riseRanking},
        {from: 300, to:600, draw:ranking},
        {from: 600, to:700, draw:rankingNewKids1},
        {from: 700, to:800, draw:rankingNewKids3},
        {from: 800, to:1000, draw:newKids},
        {from: 1000, to:1100, draw:newKidsWhoAreThey1},
        {from: 1100, to:1150, draw:newKidsWhoAreThey2},
        {from: 1150, to:1300, draw:newKidsWhoAreThey3},
        {from: 1300, to:1800, draw:whoAreThey},
    ]
    let d = new Director(steps)
         
})
