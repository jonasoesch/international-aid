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
                {name: "United States", color: "#57534E", },
                {name: "Japan", color: "#57534E",},
                {name: "Germany", color: "#57534E",},
                {name: "France", color: "#57534E",},
                {name: "United Kingdom", color: "#57534E",},
                {name: "Netherlands", color: "#57534E",},
                {name: "Australia", color: "#57534E",},
                {name: "Belgium", color: "#57534E",},
                {name: "Canada", color: "#57534E",},
                {name: "Denmark", color: "#57534E",},
                {name: "Kuwait", color: "#57534E",},
                {name: "Norway", color: "#57534E",},
                {name: "Saudi Arabia", color: "#57534E",},
                {name: "Sweden", color: "#57534E",},
                {name: "Switzerland", color: "#57534E",},
                {name: "United Arab Emirates", color: "#57534E",},
                {name: "Others", color: "#57534E",}
                ]
            },
        }


        return new SlopeChart(a)
    })
}
