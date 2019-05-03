import * as d3 from "d3"
import {StackedTimeseriesChart} from "../lib/StackedTimeseriesChart"

export function rankingNewKids2():Promise<any> {return d3.csv("../data/1-rise.csv").then((data) => {
        let dd:any = data.map((d, i) => {return {
            donor: d.donor,
            decade: parseDate(d.decade),
            amount: parseFloat(d.amount)
        }})

        function parseDate(decade:string) {
            if(decade === "70s")  {return Date.parse("1980-01-01")}
            if(decade === "00s")  {return Date.parse("2010-01-01")}
        }
     console.log(dd)


        let a = {
            name: "rankingNewKids2",
            data: dd,
            axes: [
                {
                    name: "y",
                    field: "amount",
                    domain: [0, 120],},
           
                {
                    name: "x",
                    field: "decade",
                    domain: [Date.parse("1980-01-01"), Date.parse("2010-01-01")]
                }
            ],
            cast:
            {
                field: "donor",
                axes: {y: "y", x: "x"},
                characters: [
                {name: "United Arab Emirates", color: "#58768D",},
                {name: "Saudi Arabia", color: "#58768D",},
                {name: "Kuwait", color: "#58768D",},
                {name: "Belgium", color: "#58768D",},
                {name: "Switzerland", color: "#58768D",},
                {name: "Denmark", color: "#58768D",},
                {name: "Australia", color: "#58768D",},
                {name: "Sweden", color: "#58768D",},
                {name: "Norway", color: "#58768D",},
                {name: "Canada", color: "#58768D",},
                {name: "Netherlands", color: "#58768D",},
                {name: "United Kingdom", color: "#58768D",},
                {name: "Others", color: "#58768D",},
                {name: "France", color: "#58768D",},
                {name: "Germany", color: "#58768D",},
                {name: "Japan", color: "#58768D",},
                {name: "United States", color: "#58768D", },
                ]
            },
        }

        return new StackedTimeseriesChart(a)
    })
}
