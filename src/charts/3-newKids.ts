import * as d3 from "d3"
import {StackedTimeseriesChart} from "../lib/StackedTimeseriesChart"

export function newKids():Promise<any> {
    return d3.csv("../data/3-newKids.csv").then((data) => {

        let dd:any = data.map(d => {
            return {
                group: d.variable,
                year: Date.parse(`${d.year}`),
                donations: parseFloat(d.value)
            }})

        console.log(dd)

        let a = {
            name: "newKids",
            data: dd,
            annotations: [{
                name: "Over time, more and more donations have been coming from countries who were not previously donors",
            }],
            axes: [
                {
                    name: "y",
                    field: "donations",
                    domain: [0,140],
                    annotations: [
                        {name: "Donations in billion USD", anchor: "start", offset: {top: -30, left: -30}}
                    ]
                },
                {
                    name: "x",
                    field: "year",
                    domain: [Date.parse("1975-01-01"), Date.parse("2013-01-01")]
                }
            ],
            cast:
            {
                field: "group",
                axes: {
                    y: "y",
                    x: "x"
                },
                characters: [ 
                    {
                        name: "old",
                        color: "#58768D",
                        annotations: [
                            {name: "Old donors"}
                        ]
                    },
                    {
                        name: "new",
                        color: "#E56868",
                        annotations: [
                            {name: "New donors" }
                        ]
                    }
                ]
            }
        }


        return new StackedTimeseriesChart(a)
    })
}


