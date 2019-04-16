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

Promise.all([ rise(), ranking(), 
]).then(charts => {

    let rise = charts[0]
    let ranking = charts[1]



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



    let steps:StepDefinition[] = [
        {from: -200, to:100, draw:rise},
        {from: 100, to:300, draw:riseRanking},
        {from: 300, to:600, draw:ranking},
    ]
    rise.draw()
    new Director(steps)
         
})
