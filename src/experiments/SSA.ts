import {rise} from "../charts/1-rise"
import {ranking} from "../charts/2-ranking"
import {MorphingChart} from "../lib/MorphingChart"
import {Director} from "../lib/Director"

Promise.all([ rise(), ranking()
]).then(charts => {

    let rise = charts[0]
    let ranking = charts[1]

    let steps = [
        {from: -200, to:300, draw:rise},
        {from: 300, to:600, draw:ranking},
    ]
    let d = new Director(steps)
    rise.draw()
         
})
