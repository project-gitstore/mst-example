
import { types, cast, getSnapshot} from 'mobx-state-tree';
import { getPathInstance } from '../../common/getPathInstance';

const attributeItem = types.model({
    id:types.identifier,
    name:types.string
}).actions((self) => ({
    setName: (value:string) => {
        // (self as any)[key] = value;
        self.name = value
    }
}))

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
    attributes:types.array(types.maybeNull(attribute))
}).actions((self) => ({
    addAttribute: () => {
        self.attributes.push(
            {
                id:(Math.random() * 1000000).toFixed().toString(),
                name:'',
                attributeItems:[
                    {
                        id:(Math.random() * 1000000).toFixed().toString(),
                        name:''
                    },
                    {
                        id:(Math.random() * 1000000).toFixed().toString(),
                        name:''
                    },
                    {
                        id:(Math.random() * 1000000).toFixed().toString(),
                        name:''
                    }
                ]
            }
        )
    },
    deleteAttribute:(rowIndex:number) => {
        self.attributes.splice(rowIndex, 1)
    },
    setAttributeName: (rowIndex:number, value:string) => {
        self?.attributes[rowIndex]?.setName(value)
    }
    
})).actions((self) => ({
    setAttributeItem: (rowIndex:number,itemIndex:number, value:string) => {
        // const currentInstance = getPathInstance(self, pathArray);
        // (currentInstance as any).setName(key,value);
        self?.attributes[rowIndex]?.attributeItems[itemIndex].setName(value)
    },
    addAttributeItem: (rowIndex:number) => {
        self?.attributes[rowIndex]?.attributeItems.push(
            {
                id:(Math.random() * 1000000).toFixed().toString(),
                name:''
            },
        )
    },
    deleteAttributeItem:(rowIndex:number, itemIndex:number) => {
        self?.attributes[rowIndex]?.attributeItems.splice(itemIndex, 1)
    },
}))
.actions((self) => ({
    formReload: (formRef:any) => {
        formRef?.current?.setFieldValue('attributes',getSnapshot(attributeInstance).attributes)
    },
    resetForm: (formRef:any) => {
        self.attributes = cast([])
        attributeInstance.formReload(formRef)
    }
}))

export  const attributeInstance = attributes.create(
    {
        attributes:[
            {
                id:(Math.random() * 1000000).toFixed().toString(),
                name:'',
                attributeItems:[
                    {
                        id:(Math.random() * 1000000).toFixed().toString(),
                        name:''
                    },
                    {
                        id:(Math.random() * 1000000).toFixed().toString(),
                        name:''
                    },
                    {
                        id:(Math.random() * 1000000).toFixed().toString(),
                        name:''
                    }
                ]
            }
        ]
    }
)