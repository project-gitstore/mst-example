
import { types, flow } from 'mobx-state-tree';
import { defaultFormData,typeModule } from './data';

const rootState = types.model('state',{
    formData:types.model(typeModule),
    list:types.array(types.model(typeModule))
})
.views((self ) => ({
    getFormData: () => {
        return self.formData
    },
    getFormDataKey: (key:string) => {
        return (self as any)[key]
    },
    // 获取列表数据
    getList: () => {
        return self.list
    }
})).actions(self => ({
    afterCreate: () => {
        // rootStateInstance.resetFormData(defaultFormData)
    },

    setFormValue: (key:string,value:number | null) => {
        if (key) {
         (self.formData as any)[key] = value
        }
    },
    setFormData: (formData:any) => {
        self.formData = formData
    },
    resetFormData: (resetFormData:any) => {
        (self as any).formData = resetFormData
    },
    // 获取表单详情
    getDetail: flow(function * (rowData, formRef) {
            yield  new Promise((resolve, reject) => {
            setTimeout(() => {
                formRef?.current?.setFieldsValue(rowData);
                resolve(rowData)
            }, 1000);
        })
    }),
    
    addList: (formData:any) => {
        self.list.push(formData)
    }
})).actions(() => {
    

    


    return {

    }
})

const rootStateInstance = rootState.create({formData:defaultFormData, list:[]})

export default rootStateInstance;