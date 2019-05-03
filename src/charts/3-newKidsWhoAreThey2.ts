import * as d3 from "d3"
import {StackedTimeseriesChart} from "../lib/StackedTimeseriesChart"

export function newKidsWhoAreThey2():Promise<any> {
    return d3.csv("../data/4-whoAreThey-contour.csv").then((data) => {

        let dd:any = data.map(d => {
            return {
                donor: d.donor,
                year: Date.parse(`${d.year}`),
                amount: parseFloat(d.amount)
            }})


        let a = {
            name: "newKidsWhoAreThey2",
            data: dd,
            axes: [
                {
                    name: "y",
                    field: "amount",
                    domain: [0,12],
                    annotations: [
                        {name: "Donations in billion USD", anchor: "start", offset: {top: -75, left: 20}}
                    ]
                },
                {
                    name: "x",
                    field: "year",
                    domain: [Date.parse("1981-01-01"), Date.parse("2013-01-01")],
                }
            ],
            cast:
            {
                field: "donor",
                axes: {
                    y: "y",
                    x: "x"
                },
                characters: [{ name: "all", color: "#E56868", annotations: [{name: "New donors", offset: {top: 200}}]}]
            }
        }


        return new StackedTimeseriesChart(a)
    })
}


