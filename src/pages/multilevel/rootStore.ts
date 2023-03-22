
import { Slider, Switch } from 'antd';
import { types, flow, cast } from 'mobx-state-tree';
import { type } from 'os';
import { defaultFormData,fruitModule } from './data';

let keys:any[] = [];
let lastValue = '';

const isObject = (obj: any) => {
    return Object.prototype.toString.call(obj) === "[object Object]";
};
  
// 获取嵌套对象key
const getKeys = (data:any) => {
    keys = [];
    getValue(data)
    return {keys:keys, lastValue:lastValue}
}

const getValue = (data: any): any => {
    for (const key of Object.keys(data)) {
        keys.push(key)
      if (isObject(data[key])) {
        getValue(data[key]);
      } else {
        lastValue = data[key]
      }
    }
};

const setFruilDetail = (self:any, currentKey:string) => {
    switch(currentKey) {
        case 'apple.time.timeStart':
             self.formData.fruilDetail.apple.time.timeStart = lastValue
        break;
        case 'apple.time.timeEnd':
              self.formData.fruilDetail.apple.time.timeEnd = lastValue
        break;
        case 'apple.color':
             self.formData.fruilDetail.apple.color = lastValue
        break;
        case 'apple.taste':
              self.formData.fruilDetail.apple.taste = lastValue
        break;
        case 'apple.remack':
             self.formData.fruilDetail.apple.remack = lastValue
        break;

        case 'plum.time.timeStart':
             self.formData.fruilDetail.plum.time.timeStart = lastValue
        break;
        case 'plum.time.timeEnd':
              self.formData.fruilDetail.plum.time.timeEnd = lastValue
        break;
        case 'plum.color':
             self.formData.fruilDetail.plum.color = lastValue
        break;
        case 'plum.taste':
              self.formData.fruilDetail.plum.taste = lastValue
        break;
        case 'plum.remack':
             self.formData.fruilDetail.plum.remack = lastValue
        break;
     default:
    } 
}

const rootState = types.model({
    formData:types.maybe(fruitModule),
    currentTab:types.string,
})
.views((self ) => ({
    getFormData: () => {
        return self.formData
    },
    getFormDataKey: (key:string) => {
        return (self as any)[key]
    },
    getTabValue: () => {
        return self.currentTab
    }
})).actions(self => ({
    setcurrentTab: (tabValue:string) => {
        self.currentTab = tabValue;
    },

    setFormValue: (key:string,value:number | null) => {
        if (key) {
            getKeys(value)
            const currentKey =  keys.join('.')
            if (key.includes('fruilDetail')) {
                setFruilDetail (self, currentKey)
            }  else{
               ( self.formData as any)[key] = value
            }
        }
    },
    setFormData: (formData:any) => {
        self.formData = cast(formData)
    },
    resetFormData: (resetFormData:any) => {
        (self as any).formData = resetFormData
    },
    // 获取表单详情
    getDetail: flow(function * (rowData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(rowData)
            }, 1000);
        })
    }),
}))
const rootStateInstance = rootState.create({formData:defaultFormData,currentTab:'1'})

export default rootStateInstance;