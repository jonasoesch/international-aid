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
                    domain: [0,300000000000],
                    annotations: [
                        {name: "70s", offset: {left: 0, top: 0}}
                    ]
                },
                {
                    name: "to",
                    field: "donations",
                    domain: [0, 300000000000]
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
                    color: "red",
                    annotations: [
                        {name: "USA", offset: {left: 0, top: 0}} 
                    ]
                },
                { 
                    name: "Japan",
                    color: "blue",
                    annotations: [
                        {name: "Japan", offset: {left:0, top: 0}}
                    ]
                },
                { 
                    name: "Germany",
                    color: "black",
                    annotations: [
                        {name: "Germany", offset: {left:0, top: 0}}
                    ]
                },
                { 
                    name: "France",
                    color: "black",
                    annotations: [
                        {name: "France", offset: {left:0, top: 0}}
                    ],
                },
                { 
                    name: "United Kingdom",
                    color: "black",
                    annotations: [
                        {name: "UK", offset: {left:0, top: 0}}
                    ],
                },
                { 
                    name: "Netherlands",
                    color: "black",
                    annotations: [
                        {name: "Netherlands", offset: {left:0, top: 0}}
                    ]
                },
                { 
                    name: "Australia",
                    color: "black",
                    annotations: [
                        {name: "Australia", offset: {left:0, top: 0}}
                    ]
                },
                { 
                    name: "Sweden",
                    color: "black",
                    annotations: [
                        {name: "Sweden", offset: {left:0, top: 0}}
                    ]
                },
                { 
                    name: "Norway",
                    color: "black",
                    annotations: [
                        {name: "Norway", offset: {left:0, top: 0}}
                    ]
                },
                { 
                    name: "All others",
                    color: "orange",
                    annotations: [
                        {name: "All others", offset: {left:0, top: 0}}
                    ]
                }

                ]
            }
        }


        return new SlopeChart(a)
    })
}
