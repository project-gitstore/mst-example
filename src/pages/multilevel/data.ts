import { types } from 'mobx-state-tree';
export const tabItems = [
    {
        label: `苹果`,
        key: '1',
    },
    {
        label: `梅子`,
        key: '2',
    },
]
export const defaultFormData = {
    classifyName:'水果',
    from:'',
    info:'',
    transport:'',
    countNumber:'',
    fruilDetail:{
        apple:{
            id:1,
            color:'',
            taste:'',
            remack:'',
            time:{
                timeStart: '2025',
                timeEnd:'',
            }
        },
        plum:{
            id:2,
            color:'',
            taste:'',
            remack:'',
            time:{
                timeStart: '2025',
                timeEnd:'',
            }
        }
    }
}

export const tiemModule = types.model('timeModule',{
    timeStart: types.optional(types.string, ""),
    timeEnd: types.optional(types.string, "")
}).actions((self) => ({
    setValue:(key:string, value:string) => {
        (self as any)[key] = value
    }
}))

export const timeInstance = tiemModule.create({timeStart:'', timeEnd:''});

const moduleItem = types.model('moduleItem', {
    id:types.identifierNumber,
    color:types.string,
    remack:types.string,
    taste:types.string,
    time:tiemModule
})

const moduleItemStore = moduleItem.create({
    id:1,
    color:'',
    taste:'',
    remack:'',
    time:{
        timeStart: '2025',
        timeEnd:'',
    }
})

const fruits = types.model({
    apple: moduleItem,
    plum: moduleItem
})

export const fruitModule = types.model({
    classifyName:types.string,
    from:'',
    info:'',
    transport:'',
    countNumber:'',
    fruilDetail:fruits,
    editTarget: moduleItemStore.color

}) 



