import * as d3 from "d3"
import {SlopeChart} from "../lib/SlopeChart"




export function oldBoysRelative():Promise<any> {
    return d3.csv("data/oldBoysRelative.csv").then((data) => {

        let dd:any = data.map(d => {
            return {
            donor: d.donor,
            when: d.when,
            change: parseInt(d.change)
        }})


        let a = {
            name: "oldBoysRelative",
            data: dd,
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
                    field: "change",
                    domain: [0, 900],
                    annotations: [
                    {name: "Start", offset: {left: 0, top: -30}}
                    ]
                },
                {
                    name: "to",
                    field: "change",
                    domain: [0, 900],
                    annotations: [
                    {name: "End", offset: {left: 0, top: -30}}
                    ]
                },
                {
                    name: "x",
                    domain: [0, 1]
                }
            ],
            cast:
            {
                field: "donor",
                axes: {
                    y: "from"
                },
                characters: [
                { 
                    name: "United States",
                    color: "#0038A6",
                    annotations: [
                        {name: "USA", offset: {left: 0, top: 0}} 
                    ]
                },
                { 
                    name: "Japan",
                    color: "#E72440",
                    annotations: [
                        {name: "Japan", offset: {left:0, top: 5}}
                    ]
                },
                { 
                    name: "Germany",
                    color: "#FFD500",
                    annotations: [
                        {name: "Germany", offset: {left:0, top: -10}}
                    ]
                },
                { 
                    name: "France",
                    color: "#fff",
                    annotations: [
                        {name: "France", offset: {left:0, top: 2}}
                    ],
                },
                { 
                    name: "United Kingdom",
                    color: "#9B9B9B",
                    annotations: [
                        {name: "UK", offset: {left:0, top: -10}}
                    ],
                },
                { 
                    name: "Netherlands",
                    color: "#9B9B9B",
                    annotations: [
                        {name: "Netherlands", offset: {left:0, top: -8}}
                    ]
                },


                { 
                    name: "All others",
                    color: "#000",
                    annotations: [
                        {name: "All others", offset: {left:0, top: -10}}
                    ]
                }

                ]
            }
        }


        return new SlopeChart(a)
    })
}
