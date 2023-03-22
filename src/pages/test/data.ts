import { types } from 'mobx-state-tree';
export const defaultFormData = {
    id:0,
    title:'', 
    name:'', 
    count:null, 
    remack:'', 
    type: null,
    date:null
}

export const typeModule = {
    id:types.number,
    title:types.string,
    name:types.string,
    count:types.maybeNull(types.number),
    remack:types.string,
    type:types.maybeNull(types.string),
    date:types.maybeNull(types.string),
}