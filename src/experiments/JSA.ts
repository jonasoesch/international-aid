import {rise} from "../charts/1-rise"
import {ranking} from "../charts/2-ranking"
import {MorphingChart} from "../lib/MorphingChart"
import {JuxtaposedDirector} from "../lib/Director"

Promise.all([ rise(), ranking()]).then(charts => {

    let rise = charts[0]
    let ranking = charts[1]

    let steps = [
        {from: -200, to:9000, draw:rise},
        {from: -200, to:9000, draw:ranking},
    ]
    new JuxtaposedDirector(steps)
})
