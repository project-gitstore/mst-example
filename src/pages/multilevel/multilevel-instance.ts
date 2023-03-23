
import { types, flow, cast, onAction } from 'mobx-state-tree';

const attributeItem = types.model({
    id:types.identifier,
    name:types.string
}).actions((self) => ({
    setName: (value:string) => {
        self.name = value;
    }
}))

export const attributeItemInstance = attributeItem.create({
    id:(Math.random() * 1000000).toFixed(100).toString(),
    name:''
})

const attribute = types.model({
    id:types.identifier,
    name:types.string,
    attributeItems:types.optional(types.array(attributeItem), [])
}).actions((self) => ({
    setName: (value:string) => {
        self.name = value;
    },
    addItem: () => {
        self.attributeItems.push({
            id:'',
            name:''
        })
    },
    
}))

const attributes = types.model({
    attributes:types.array(attribute)
}).actions((self) => ({
    addAttribute: () => {
        self.attributes.push(
            {
                id:(Math.random() * 1000000).toFixed(10).toString(),
                name:'颜色',
                attributeItems:[
                    {
                        id:(Math.random() * 1000000).toFixed(100).toString(),
                        name:'红'
                    },
                    {
                        id:(Math.random() * 1000000).toFixed(100).toString(),
                        name:'黄'
                    },
                    {
                        id:(Math.random() * 1000000).toFixed(100).toString(),
                        name:'蓝'
                    }
                ]
            }
        )
    },
    setAttributeItem: (rowIndex:number,itemIndex:number, value:string) => {
        self.attributes[rowIndex].attributeItems[itemIndex].setName(value)
    },
    addAttributeItem: (rowIndex:number) => {
        self.attributes[rowIndex].attributeItems.push(
            {
                id:(Math.random() * 1000000).toFixed(100).toString(),
                name:''
            },
        )

    },
    deleteAttributeItem:(rowIndex:number, attributeIndex:number) => {
        self.attributes[rowIndex].attributeItems.splice(attributeIndex, 1)


    }
}))

export  const attributeInstance = attributes.create(
    {
        attributes:[
            {
                id:'1111',
                name:'颜色',
                attributeItems:[
                    {
                        id:'00000',
                        name:'红'
                    },
                    {
                        id:'',
                        name:'黄'
                    },
                    {
                        id:'',
                        name:'蓝'
                    }
                ]
            }
        ]
    }
)




