import {Named} from "Definitions"

export function buildMapWithName(list:Named[], buildMethod:Function):Map<string, any> {
        let m = new Map()
        if (list === undefined) {return}
        list.forEach( (item:Named) => {
            m.set(item.name, buildMethod(item)) 
        })
        return m
    }

export function  throwIfNotSet<T>(value:T, msg?:string):T {
        if(value === null) {
            throw new Error(valOrDefault(msg, "A value is null and shouldn't be null"))
        }
        return value
    }

export function valOrDefault<T>(value:T, deflt:T):T {
        if(value === null || value === undefined) {return deflt} 
        else {return value}
    }

