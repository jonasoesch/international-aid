import * as d3 from "d3"
import {SlopeChart} from "../lib/SlopeChart"

export function rise():Promise<any> {
    return d3.csv("data/1-rise.csv").then((data) => {

        let dd:any = data.map(d => {
            return {
            donor: d.donor,
            decade: d.decade,
            amount: parseFloat(d.amount)
        }})



        let a = {
            name: "rise",
            data: dd,
            annotations: [{
                name: "Yearly donations for international aid have been rising for most countries since the seventies", offset: {left: -30}
            }],
            axes: [
                {
                    name: "from",
                    field: "amount",
                    domain: [0, 30],
                    ticks: [5,10,15,20,25,30],
                    annotations: [
                        {name: "1975–80", anchor: "end", offset: {left: -25}},
                        {name: "Donations in billion USD per year", anchor: "start", offset: {top: -70, left: -25}}
                    ]
                },
                {
                    name: "to",
                    field: "amount",
                    domain: [0, 300],
                    annotations: [
                    {name: "2000–05", anchor: "end", offset: {left: -35}}
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
                    name: "Australia",
                    color: "#57534E",
                    annotations: [ 
                        {name: "Australia", offset: {left: 120}}
                    ]
                },
                {
                    name: "Belgium",
                    color: "#57534E",
                    annotations: [ 
                        {name: "Belgium", offset: {left: 130}}
                    ]
                },
                {
                    name: "Canada",
                    color: "#57534E",
                    annotations: [ 
                        {name: "Canada", offset: {top: -3}}
                    ]
                },
                {
                    name: "Denmark",
                    color: "#58768D",
                    annotations: [ 
                        {name: "Denmark"}
                    ]
                },
                {
                    name: "Kuwait",
                    color: "#D66F61",
                    annotations: [ 
                        {name: "Kuwait", offset: {top: 4}}
                    ]
                },
                {
                    name: "Norway",
                    color: "#58768D",
                    annotations: [ 
                        {name: "Norway"}
                    ]
                },
                {
                    name: "Saudi Arabia",
                    color: "#D66F61",
                    annotations: [ 
                        {name: "Saudi Arabia", offset: {left: 50, top: -5}}
                    ]
                },
                {
                    name: "Sweden",
                    color: "#57534E",
                    annotations: [ 
                        {name: "Sweden", offset: {left: 60}}
                    ]
                },
                {
                    name: "Switzerland",
                    color: "#57534E",
                    annotations: [ 
                        {name: "Switzerland", offset: {left: 60}}
                    ]
                },
                {
                    name: "United Arab Emirates",
                    color: "#D66F61",
                    annotations: [ 
                        {name: "Emirates", offset: {left: 130, top: -4}}
                    ]
                },
                { 
                    name: "United States",
                    color: "#57534E",
                    annotations: [
                        {name: "USA"} 
                    ]
                },
                { 
                    name: "Japan",
                    color: "#57534E",
                    annotations: [
                        {name: "Japan"}
                    ]
                },
                { 
                    name: "Germany",
                    color: "#57534E",
                    annotations: [
                        {name: "Germany", offset: {top: -5}}
                    ]
                },
                { 
                    name: "France",
                    color: "#58768D",
                    annotations: [
                        {name: "France"}
                    ],
                },
                { 
                    name: "United Kingdom",
                    color: "#57534E",
                    annotations: [
                        {name: "UK"}
                    ],
                },
                { 
                    name: "Netherlands",
                    color: "#58768D",
                    annotations: [
                        {name: "Netherlands"}
                    ]
                },
                { 
                    name: "Others",
                    color: "#58768D",
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
