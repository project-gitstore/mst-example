
import { types } from 'mobx-state-tree';

// 活动项目
const activityItem = types.model(
    {
        id: types.string,
        title: types.string,
        decs: types.string,
        state: types.string,
        days: types.maybeNull(types.number),
        isEdit:types.boolean,
    },
).actions((self) => ({
    updateValue: (key:string,value:any) => {
        (self as any)[key] = value
    }
}))

const activity = types.model({
    activityList: types.array(activityItem)
}).views((self) => ({
    getActivityList: () => {
        return self.activityList;
    }
})).actions((self) => ({
    addActivity: () => {
        let id = (Math.random() * 1000000).toFixed(0)
        self.activityList.push(
            {
                id: id,
                title:'',
                decs: '',
                state: '1',
                days: 0,
                isEdit:true
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
    activityList:[
        {
            id: '1',
            title:'',
            decs: '',
            state: '1',
            days: 0,
            isEdit:true
        }
    ]
})


