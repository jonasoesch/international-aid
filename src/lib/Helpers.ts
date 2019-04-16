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
        if(value === null || value === undefined) {
            throw new Error(valOrDefault(msg, "A value is null and shouldn't be null"))
        }
        return value
    }

export function valOrDefault<T>(value:T, deflt:T):T {
        if(value === null || value === undefined) {return deflt} 
        else {return value}
    }

export function throwIfEmpty<T>(value:T[], msg?:string) {
    throwIfNotSet(value, msg)
    if(value.length === 0) {
        throw new Error(valOrDefault(msg, "An array has nothing in it.")) 
    }
    return value
}


export function overwriteDefaults(defaults:any, override:any):any {
    console.log(defaults)
    let keys = []

    if(override === null || override === undefined || override == {}) {
      return defaults
    }

    for(let k in override) {
        if(override.hasOwnProperty(k))  {
            keys.push(k) 
        }
    }
    if(keys.length === 0) {
        return override 
    }
    else {
        keys.forEach( k => {
            defaults[k] = overwriteDefaults(defaults[k], override[k])
        })
        return defaults
    }
}
