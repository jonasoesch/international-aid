import * as d3 from "d3"
import {StackedTimeseriesChart} from "../lib/StackedTimeseriesChart"

export function whoAreThey():Promise<any> {
    return d3.csv("../data/4-whoAreThey.csv").then((data) => {

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
                name: "The importance of countries in this group of new donors has changed over time"
            }],
            axes: [
                {
                    name: "y",
                    field: "ratio",
                    domain: [0, 100],
                    annotations: [
                    {name: "Importance of a country's contribution in %", anchor: "start", offset: {top: -75, left: 20}}
                    ]
                },
                {
                    name: "x",
                    field: "year",
                    domain: [Date.parse("1981-01-01"),Date.parse("2013-01-01")],
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
                    color: "#EDAC74",
                    annotations: [
                        {name: "Liechtenstein", offset: {left:0, top: -8}}
                    ]
                },
                { 
                    name: "Portugal",
                    color: "#F68F5C",
                    annotations: [
                        {name: "Portugal", offset: {left:0, top: -5}}
                    ]
                },
                { 
                    name: "Spain",
                    color: "#D16C59",
                    annotations: [
                        {name: "Spain", offset: {left:0, top: 5}}
                    ]
                },

                                    { 
                    name: "Taiwan",
                    color: "#A6423B",
                    annotations: [
                        {name: "Taiwan", offset: {left:0, top: -8}}
                    ]
                },
                                                        { 
                    name: "Others",
                    color: "#B08A78",
                    annotations: [
                        {name: "Others", offset: {left:0, top: 5}}
                    ]
                },
                                    { 
                    name: "Ireland",
                    color: "#8F7F7D",
                    annotations: [
                        {name: "Ireland", offset: {left:0, top: 5}}
                    ]
                },
                { 
                    name: "Greece",
                    color: "#C48A94",
                    annotations: [
                        {name: "Greece", offset: {left: 0, top: -7}} 
                    ]
                },
                { 
                    name: "India",
                    color: "#B54763",
                    annotations: [
                        {name: "India", offset: {left:0, top: -20}}
                    ]
                },

                { 
                    name: "Korea",
                    color: "#922340",
                    annotations: [
                        {name: "Korea", offset: {left:0, top: 2}}
                    ]
                },




                ]
            }
        }


        return new StackedTimeseriesChart(a)
    })
}
