import * as d3 from "d3"
import {SlopeChart} from "../lib/SlopeChart"




export function oldBoys():Promise<any> {
    return d3.csv("data/oldBoys.csv").then((data) => {

        let dd:any = data.map(d => {
            return {
            donor: d.donor,
            decade: d.decade,
            donations: parseInt(d.donations)
        }})

        let a = {
            name: "oldBoys",
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
                    field: "donations",
                    domain: [0, 300],
                    annotations: [
                        {name: "70s", offset: {left: 0, top: 0}}
                    ]
                },
                {
                    name: "to",
                    field: "donations",
                    domain: [0, 300]
                },
                {
                    name: "x",
                    domain: [0, 1]
                }
            ],
            group:
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
                        {name: "France", offset: {left:0, top: 0}}
                    ],
                },
                { 
                    name: "United Kingdom",
                    color: "#9B9B9B",
                    annotations: [
                        {name: "UK", offset: {left:0, top: 0}}
                    ],
                },
                { 
                    name: "Netherlands",
                    color: "#9B9B9B",
                    annotations: [
                        {name: "Netherlands", offset: {left:0, top: 0}}
                    ]
                },
                { 
                    name: "Australia",
                    color: "#9B9B9B",
                    annotations: [
                        {name: "Australia", offset: {left:0, top: 0}}
                    ]
                },
                { 
                    name: "Sweden",
                    color: "#9B9B9B",
                    annotations: [
                        {name: "Sweden", offset: {left:0, top: 0}}
                    ]
                },
                { 
                    name: "Norway",
                    color: "#9B9B9B",
                    annotations: [
                        {name: "Norway", offset: {left:0, top: 0}}
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
