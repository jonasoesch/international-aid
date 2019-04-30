import * as d3 from "d3"
import {SlopeChart} from "../lib/SlopeChart"

export function rankingNewKids2():Promise<any> {return d3.csv("../data/2-ranking.csv").then((data) => {
        let dd:any = data.map((d, i) => {return {
            donor: d.donor,
            decade: d.decade,
            rank: parseInt(d.rank)
        }})

        let clone = (obj:object) => JSON.parse(JSON.stringify(obj))
        let setValue = (key:any, value:any, obj:object) => {let o = clone(obj); o[key] = value; return o}
        dd  = d3.nest().key( (d:any) => d.donor ).entries(dd).map( (e:any) => e.values.filter( (d:any) => d.decade === "70s" ) ).map( (d:any) => [d[0], setValue("decade", "00s", d[0])] ).reduce((acc, val) => acc.concat(val), []);

    console.log(dd)



        let a = {
            name: "rankingNewKids2",
            data: dd,
            axes: [
                {
                    name: "from",
                    field: "rank",
                    ticks: new Array(),
                    domain: [17, 1],},
                {
                    name: "to",
                    field: "rank",
                    domain: [17, 1],},
                {
                    name: "x",
                    field: "decade",
                    domain: ["70s", "70s"]
                }
            ],
            cast:
            {
                field: "donor",
                axes: {y: "from"
                },
                characters: [
                {name: "United States", color: "#58768D", },
                {name: "Japan", color: "#58768D",},
                {name: "Germany", color: "#58768D",},
                {name: "France", color: "#58768D",},
                {name: "United Kingdom", color: "#58768D",},
                {name: "Netherlands", color: "#58768D",},
                {name: "Australia", color: "#58768D",},
                {name: "Belgium", color: "#58768D",},
                {name: "Canada", color: "#58768D",},
                {name: "Denmark", color: "#58768D",},
                {name: "Kuwait", color: "#58768D",},
                {name: "Norway", color: "#58768D",},
                {name: "Saudi Arabia", color: "#58768D",},
                {name: "Sweden", color: "#58768D",},
                {name: "Switzerland", color: "#58768D",},
                {name: "United Arab Emirates", color: "#58768D",},
                {name: "Others", color: "#58768D",}
                ]
            },
        }


        return new SlopeChart(a)
    })
}
