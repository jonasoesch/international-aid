import * as d3 from "d3"
import {TimeseriesChart} from "../lib/TimeseriesChart"

export function newKids():Promise<any> {
    return d3.csv("data/newKids.csv").then((data) => {

        let dd:any = data.map(d => {
            return {
            donor: d.donor,
            year: Date.parse(`${d.year}-01-01`),
            donations: parseInt(d.amount)
        }})

        // TODO: Correct definition
        let a = {
            name: "newKids",
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
                    name: "y",
                    field: "donations",
                    domain: [0,8000000000],
                    annotations: [
                        {name: "70s", offset: {left: 0, top: 0}}
                    ]
                },
                {
                    name: "x",
                    field: "year",
                    domain: [Date.parse("1990-01-01"), Date.parse("2013-01-01")]
                }
            ],
            cast:
            {
                field: "donor",
                axes: {
                    y: "y",
                    x: "x"
                },
                characters: [
                { 
                    name: "Taiwan",
                    color: "red",
                    annotations: [
                        {name: "Taiwan", offset: {left: 0, top: 0}} 
                    ]
                },
                { 
                    name: "India",
                    color: "blue",
                    annotations: [
                        {name: "India", offset: {left:0, top: 0}}
                    ]
                },
                { 
                    name: "Ireland",
                    color: "black",
                    annotations: [
                        {name: "Ireland", offset: {left:0, top: 0}}
                    ]
                },
                { 
                    name: "Greece",
                    color: "black",
                    annotations: [
                        {name: "Greece", offset: {left:0, top: 0}}
                    ],
                },
                { 
                    name: "Korea",
                    color: "black",
                    annotations: [
                        {name: "Korea", offset: {left:0, top: 0}}
                    ],
                },
                { 
                    name: "Others",
                    color: "black",
                    annotations: [
                        {name: "Others", offset: {left:0, top: 0}}
                    ]
                }
                ]
            }
        }


        return new TimeseriesChart(a)
    })
}

