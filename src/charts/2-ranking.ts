import * as d3 from "d3"
import {SlopeChart} from "../lib/SlopeChart"




export function ranking():Promise<any> {
    return d3.csv("data/2-ranking.csv").then((data) => {

        let dd:any = data.map(d => {
            return {
            donor: d.donor,
            decade: d.decade,
            rank: parseInt(d.rank)
        }})


        console.log(dd)


        let a = {
            name: "ranking",
            data: dd,
            annotations: [{
                name: "Changes in the major donors of international aid since the between the seventies and the noughties",
            }],
            axes: [
                {
                    name: "from",
                    field: "rank",
                    domain: [17, 1],
                    ticks: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
                    annotations: [
                    {name: "70s", offset: {left: 0, top: -30}}
                    ]
                },
                {
                    name: "to",
                    field: "rank",
                    domain: [17, 1],
                    annotations: [
                    {name: "00s", offset: {left: 0, top: -30}}
                    ]
                },
                {
                    name: "x",
                    field: "decade",
                    domain: ["70s", "00s"]
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
                    name: "Australia",
                    color: "#9B9B9B",
                    annotations: [
                        {name: "Australia", offset: {left:0, top: -8}}
                    ]
                },
                { 
                    name: "Belgium",
                    color: "#9B9B9B",
                    annotations: [
                        {name: "Belgium", offset: {left:0, top: -8}}
                    ]
                },
                { 
                    name: "Canada",
                    color: "#9B9B9B",
                    annotations: [
                        {name: "Canada", offset: {left:0, top: -8}}
                    ]
                },
                { 
                    name: "Denmark",
                    color: "#9B9B9B",
                    annotations: [
                        {name: "Denmark", offset: {left:0, top: -8}}
                    ]
                },
                { 
                    name: "Kuwait",
                    color: "#9B9B9B",
                    annotations: [
                        {name: "Kuwait", offset: {left:0, top: -8}}
                    ]
                },
                { 
                    name: "Norway",
                    color: "#9B9B9B",
                    annotations: [
                        {name: "Norway", offset: {left:0, top: -8}}
                    ]
                },
                { 
                    name: "Saudi Arabia",
                    color: "#9B9B9B",
                    annotations: [
                        {name: "Saudi Arabia", offset: {left:0, top: -8}}
                    ]
                },
                { 
                    name: "Sweden",
                    color: "#9B9B9B",
                    annotations: [
                        {name: "Sweden", offset: {left:0, top: -8}}
                    ]
                },
                { 
                    name: "Switzerland",
                    color: "#9B9B9B",
                    annotations: [
                        {name: "Switzerland", offset: {left:0, top: -8}}
                    ]
                },
                { 
                    name: "United Arab Emirates",
                    color: "#9B9B9B",
                    annotations: [
                        {name: "United Arab Emirates", offset: {left:0, top: -8}}
                    ]
                },
                { 
                    name: "Others",
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
