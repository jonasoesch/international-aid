import * as d3 from "d3"
import {SlopeChart} from "../lib/SlopeChart"

export function oldBoys():Promise<any> {
    return d3.csv("data/oldBoys.csv").then((data) => {

        let a = {
            name: "oldBoys",
            data: data,
            annotations: [{
                name: "Blabla",
                offset: {
                    left: 20,
                    top: 20
                }
            }],
            axes: [
                {
                    name: "from",
                    domain: [0,10],
                    annotations: [
                        {name: "70s", offset: {left: 0, top: 0}}
                    ]
                },
                {
                    name: "to",
                    domain: [0, 10]
                },
                {
                    name: "x",
                    domain: [0, 1]
                }
            ],
            characters: [
                { field: "donor",
                    name: "USA",
                    color: "red",
                    annotations: [
                        {name: "USA", offset: {left: 0, top: 0}} 
                    ],
                    axes: {
                        y: "from"
                    }
                }
            ]
        }


        let chart = new SlopeChart(a)
        chart.draw()
    })
}
