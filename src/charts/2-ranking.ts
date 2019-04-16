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
                    {name: "70s", offset: {left: 15, top: 0}}
                    ]
                },
                {
                    name: "to",
                    field: "rank",
                    domain: [17, 1],
                    annotations: [
                    {name: "00s", offset: {left: -15, top: 0}}
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
                    color: "#57534E",
                    annotations: [
                        {name: "USA", offset: {left: 0, top: 0}} 
                    ]
                },
                { 
                    name: "Japan",
                    color: "#57534E",
                    annotations: [
                        {name: "Japan", offset: {left:0, top: 0}}
                    ]
                },
                { 
                    name: "Germany",
                    color: "#57534E",
                    annotations: [
                        {name: "Germany", offset: {left:0, top: 0}}
                    ]
                },
                { 
                    name: "France",
                    color: "#58768D",
                    annotations: [
                        {name: "France", offset: {left:0, top: 0}}
                    ],
                },
                { 
                    name: "United Kingdom",
                    color: "#57534E",
                    annotations: [
                        {name: "UK", offset: {left:0, top: 0}}
                    ],
                },
                { 
                    name: "Netherlands",
                    color: "#58768D",
                    annotations: [
                        {name: "Netherlands", offset: {left:0, top: 0}}
                    ]
                },
                { 
                    name: "Australia",
                    color: "#57534E",
                    annotations: [
                        {name: "Australia", offset: {left:0, top: 0}}
                    ]
                },
                { 
                    name: "Belgium",
                    color: "#57534E",
                    annotations: [
                        {name: "Belgium", offset: {left:0, top: 0}}
                    ]
                },
                { 
                    name: "Canada",
                    color: "#57534E",
                    annotations: [
                        {name: "Canada", offset: {left:0, top: 0}}
                    ]
                },
                { 
                    name: "Denmark",
                    color: "#58768D",
                    annotations: [
                        {name: "Denmark", offset: {left:0, top: 0}}
                    ]
                },
                { 
                    name: "Kuwait",
                    color: "#D66F61",
                    annotations: [
                        {name: "Kuwait", offset: {left:0, top: 0}}
                    ]
                },
                { 
                    name: "Norway",
                    color: "#58768D",
                    annotations: [
                        {name: "Norway", offset: {left:0, top: 0}}
                    ]
                },
                { 
                    name: "Saudi Arabia",
                    color: "#D66F61",
                    annotations: [
                        {name: "Saudi Arabia", offset: {left:0, top: 0}}
                    ]
                },
                { 
                    name: "Sweden",
                    color: "#57534E",
                    annotations: [
                        {name: "Sweden", offset: {left:0, top: 0}}
                    ]
                },
                { 
                    name: "Switzerland",
                    color: "#57534E",
                    annotations: [
                        {name: "Switzerland", offset: {left:0, top: 0}}
                    ]
                },
                { 
                    name: "United Arab Emirates",
                    color: "#D66F61",
                    annotations: [
                        {name: "United Arab Emirates", offset: {left:0, top: 0}}
                    ]
                },
                { 
                    name: "Others",
                    color: "#58768D",
                    annotations: [
                        {name: "All others", offset: {left:0, top: 0}}
                    ]
                }

                ]
            },
            design: {
                margin: {right: 200}
            }
        }


        return new SlopeChart(a)
    })
}
