import * as d3 from "d3"
import {SlopeChart} from "../lib/SlopeChart"




export function ranking():Promise<any> {
    return d3.csv("../data/2-ranking.csv").then((data) => {

        let dd:any = data.map(d => {
            return {
            donor: d.donor,
            decade: d.decade,
            rank: parseInt(d.rank)
        }})




        let a = {
            name: "ranking",
            data: dd,
            annotations: [{
                name: "The importance of some of these major donors has changed between the seventies and the noughties",
            offset: {left: -20}}],
            axes: [
                {
                    name: "from",
                    field: "rank",
                    domain: [17, 1],
                    ticks: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
                    annotations: [
                    {name: "1975–80", offset: {left: -25}},
                    {name: "Rank", anchor: "start", offset: {left: -25, top: -70}}
                    ]
                },
                {
                    name: "to",
                    field: "rank",
                    domain: [17, 1],
                    annotations: [
                    {name: "2000–05", offset: {left: -35}}
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
                    color: "#6C6C6C",
                    annotations: [
                        {name: "USA"} 
                    ]
                },
                { 
                    name: "Japan",
                    color: "#6C6C6C",
                    annotations: [
                        {name: "Japan"}
                    ]
                },
                { 
                    name: "Germany",
                    color: "#6C6C6C",
                    annotations: [
                        {name: "Germany"}
                    ]
                },
                { 
                    name: "France",
                    color: "#1D7DC9",
                    annotations: [
                        {name: "France"}
                    ],
                },
                { 
                    name: "United Kingdom",
                    color: "#174365",
                    annotations: [
                        {name: "UK"}
                    ],
                },
                { 
                    name: "Netherlands",
                    color: "#1D7DC9",
                    annotations: [
                        {name: "Netherlands"}
                    ]
                },
                { 
                    name: "Australia",
                    color: "#174365",
                    annotations: [
                        {name: "Australia"}
                    ]
                },
                { 
                    name: "Belgium",
                    color: "#1D7DC9",
                    annotations: [
                        {name: "Belgium"}
                    ]
                },
                { 
                    name: "Canada",
                    color: "#174365",
                    annotations: [
                        {name: "Canada"}
                    ]
                },
                { 
                    name: "Denmark",
                    color: "#1D7DC9",
                    annotations: [
                        {name: "Denmark"}
                    ]
                },
                { 
                    name: "Kuwait",
                    color: "#174365",
                    annotations: [
                        {name: "Kuwait"}
                    ]
                },
                { 
                    name: "Norway",
                    color: "#1D7DC9",
                    annotations: [
                        {name: "Norway"}
                    ]
                },
                { 
                    name: "Saudi Arabia",
                    color: "#174365",
                    annotations: [
                        {name: "Saudi Arabia"}
                    ]
                },
                { 
                    name: "Sweden",
                    color: "#174365",
                    annotations: [
                        {name: "Sweden"}
                    ]
                },
                { 
                    name: "Switzerland",
                    color: "#1D7DC9",
                    annotations: [
                        {name: "Switzerland"}
                    ]
                },
                { 
                    name: "United Arab Emirates",
                    color: "#174365",
                    annotations: [
                        {name: "Emirates"}
                    ]
                },
                { 
                    name: "Others",
                    color: "#1D7DC9",
                    annotations: [
                        {name: "All others"}
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
