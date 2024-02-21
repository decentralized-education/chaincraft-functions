import Handlebars from "handlebars";

export function recursiveTemplate(obj:any, data: object) {

    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            obj[key] = recursiveTemplate(obj[key], data); 
        } else {
            const compiledTemplate = Handlebars.compile(obj[key]);
            obj[key] = compiledTemplate(data); 
        }
    }

    return obj;
}
