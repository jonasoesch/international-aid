import {rise} from "../charts/1-rise"
import {ranking} from "../charts/2-ranking"
import {MorphingChart} from "../lib/MorphingChart"
import {SuperposedDirector} from "../lib/Director"

Promise.all([ rise(), ranking()]).then(charts => {

    let rise = charts[0]
    let ranking = charts[1]


    let rankingRise = new MorphingChart({
        name: "rankingRise",
        from: ranking,
        to: rise,
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


     


    let steps = [
        {from: -200, to:100, draw:ranking},
        {from: 100, to:300, draw:rankingRise},
        {from: 300, to:6000, draw:rise},
    ]
    new SuperposedDirector(steps)
         
})
