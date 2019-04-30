import * as d3 from "d3"
import {StackedTimeseriesChart} from "../lib/StackedTimeseriesChart"

export function newKidsWhoAreThey2():Promise<any> {
    return d3.csv("../data/3-newKids.csv").then((data) => {

        let dd:any = data.map(d => {
            return {
                group: d.variable,
                year: Date.parse(`${d.year}`),
                donations: 100
            }})


        let a = {
            name: "newKidsWhoAreThey2",
            data: dd,
            axes: [
                {
                    name: "y",
                    field: "donations",
                    domain: [0,100],
                    ticks: new Array()
                },
                {
                    name: "x",
                    field: "year",
                    domain: [Date.parse("1975-01-01"), Date.parse("2013-01-01")],
                    ticks: new Array(),
                }
            ],
            cast:
            {
                field: "group",
                axes: {
                    y: "y",
                    x: "x"
                },
                characters: [{ name: "new", color: "#D8563D", annotations: [{name: "New donors", offset: {top: 200}}]}]
            }
        }


        return new StackedTimeseriesChart(a)
    })
}


