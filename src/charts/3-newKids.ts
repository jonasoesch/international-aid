import * as d3 from "d3"
import {StackedTimeseriesChart} from "../lib/StackedTimeseriesChart"

export function newKids():Promise<any> {
    return d3.csv("data/3-newKids.csv").then((data) => {

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
                name: "Over time, more and more donations have been coming from countries that where not previously donors",
            }],
            axes: [
                {
                    name: "y",
                    field: "donations",
                    domain: [0,1],
                    annotations: [
                        {name: "Dontations over time"}
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
                field: "group",
                axes: {
                    y: "y",
                    x: "x"
                },
                characters: [ 
                    {
                        name: "old",
                        color: "black",
                        annotations: [
                            {name: "Old donors"}
                        ]
                    },
                    {
                        name: "new",
                        color: "blue",
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


