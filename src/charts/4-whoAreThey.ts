import * as d3 from "d3"
import {StackedTimeseriesChart} from "../lib/StackedTimeseriesChart"

export function whoAreThey():Promise<any> {
    return d3.csv("data/4-whoAreThey.csv").then((data) => {

        let dd:any = data.map(d => {
            return {
            donor: d.donor,
            year: Date.parse(d.year),
            ratio: parseFloat(d.ratio)
        }})

        // TODO: Correct defintion
        let a = {
            name: "whoAreThey",
            data: dd,
            annotations: [{
                name: "Blabla"
            }],
            axes: [
                {
                    name: "y",
                    field: "ratio",
                    domain: [0, 1],
                    annotations: [
                    {name: "Ratio"}
                    ]
                },
                {
                    name: "x",
                    field: "year",
                    domain: [Date.parse("1980-01-01"),Date.parse("2013-01-01")],
                },
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
                    name: "Liechtenstein",
                    color: "#06410E",
                    annotations: [
                        {name: "Liechtenstein", offset: {left:0, top: 5}}
                    ]
                },
                { 
                    name: "Portugal",
                    color: "#588D60",
                    annotations: [
                        {name: "Portugal", offset: {left:0, top: 5}}
                    ]
                },
                { 
                    name: "Spain",
                    color: "#A45A58",
                    annotations: [
                        {name: "Spain", offset: {left:0, top: 5}}
                    ]
                },

                                    { 
                    name: "Taiwan",
                    color: "#D66F61",
                    annotations: [
                        {name: "Taiwan", offset: {left:0, top: -5}}
                    ]
                },
                                                        { 
                    name: "Others",
                    color: "#58768D",
                    annotations: [
                        {name: "Others", offset: {left:0, top: 5}}
                    ]
                },
                                    { 
                    name: "Ireland",
                    color: "#062D41",
                    annotations: [
                        {name: "Ireland", offset: {left:0, top: 5}}
                    ]
                },
                { 
                    name: "Greece",
                    color: "#4A2386",
                    annotations: [
                        {name: "Greece", offset: {left: 0, top: -5}} 
                    ]
                },
                { 
                    name: "India",
                    color: "#8A61D6",
                    annotations: [
                        {name: "India", offset: {left:0, top: 5}}
                    ]
                },

                { 
                    name: "Korea",
                    color: "#57534E",
                    annotations: [
                        {name: "Korea", offset: {left:0, top: 5}}
                    ]
                },




                ]
            }
        }


        return new StackedTimeseriesChart(a)
    })
}
