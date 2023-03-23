
import { types, flow } from 'mobx-state-tree';

// 活动项目
const activityItem = types.model(
    {
        id: types.string,
        title: types.string,
        decs: types.string,
        state: types.string,
        days: types.maybeNull(types.number),
    },
).actions((self) => ({
    updateValue: (key:string,value:any) => {
        (self as any)[key] = value
    }
}))

const activity = types.model({
    editKeys:types.array(types.string),
    activityList: types.array(activityItem)
}).views((self) => ({
    getActivityList: () => {
        return self.activityList;
    }
})).views((self) => ({
    getEditKeys: () => {
        return self.editKeys
    }
})).actions((self) => ({
    setEditKeys: (editKey:string) => {
        self.editKeys.push(editKey)
    },
    deleteEdikey: (editKey:string) => {
        self.editKeys.forEach((currenEditKey, index) => {
            if (currenEditKey === editKey) {
                self.editKeys.splice(index, 1)
            }
        })
    }
})).actions((self) => ({
    addActivity: () => {
        let id = (Math.random() * 1000000).toFixed(0)
        self.setEditKeys(id)
        self.activityList.push(
            {
                id: id,
                title:'',
                decs: '',
                state: '1',
                days: 0,
            }
        )
    },
})).actions((self) => ({
    activityItemChange(id:string, key:string, value:any) {
        self.activityList.forEach((activityItem) => {
            if (activityItem.id === id) {
                activityItem.updateValue(key, value)
            }
        })
    },
    delete: (id:string) => {
        
        self.activityList.forEach((activityItem,index) => {
            console.log('id:', id);
            console.log('activityItem.id:', activityItem.id);
            if (activityItem.id === id) {
                self.activityList.splice(index,1)
            }
        })
    }
}))

export const activityInstance = activity.create({
    editKeys:[],
    activityList:[]
})


