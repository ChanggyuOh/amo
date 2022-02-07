import { Injectable } from '@angular/core';
@Injectable()

export class MyLogService {
    public log = (msg: any, obj:any = null, color: string = 'black', background: string = "white") => {
        var simpleObject = {};
        for (var prop in obj ){
            if (!obj.hasOwnProperty(prop)){
                continue;
            }
            if (typeof(obj[prop]) == 'object'){
                continue;
            }
            if (typeof(obj[prop]) == 'function'){
                continue;
            }
            simpleObject[prop] = obj[prop];
        }

        if (obj != null){
            console.log(new Date() +`%c ${msg}: ${JSON.stringify(simpleObject)}`, `color:${color}; background:${background};`)
        }
        else console.log(new Date() +`%c ${msg}`, `color:${color}; background:${background};`)
    }
}