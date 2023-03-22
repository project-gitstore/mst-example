import React, { useEffect, useRef} from 'react'
import {
    ProForm,
    ProFormDatePicker,
    ProFormSelect,
    ProFormText,
    ProFormInstance,
    ProFormTextArea
  } from '@ant-design/pro-components';
  import rootStateInstance from './rootStore';
  import { getSnapshot } from 'mobx-state-tree';
  import { defaultFormData, tabItems } from './data';
  import { useLocation } from 'react-router-dom';
  import { useNavigate } from 'react-router-dom';
  import { Tabs } from 'antd';
  import { observer } from 'mobx-react-lite';

const Multilevel = (props:any) => {
    const navigate = useNavigate();
    const formRef = useRef<ProFormInstance>();
    const location = useLocation()
    const id = location?.state?.row.id || ''

    useEffect( () => {
      if (id) {
        const reDetail =  rootStateInstance.getDetail(location?.state?.row)
        reDetail.then((res) => {
          rootStateInstance.setFormData(res)
          formRef?.current?.setFieldsValue(res);
        })
      }
    },[])

    const tabsChange = (value:string) => {
        rootStateInstance.setcurrentTab(value)
    }

    const onValuesChange = (formValues:any) => {
      const values =  formRef?.current?.getFieldsFormatValue?.();
      const key =  Object.keys(formValues)[0]
      if (key?.includes('fruilDetail')) {
        rootStateInstance.setFormValue(key, formValues[key])
      } else {
        rootStateInstance.setFormValue(key,formValues[key] )
      }
    }

    return (
      <div style={{padding:'20px'}}>
        <ProForm
          formRef={formRef}
          onFinish={async (values) => {
            const formdatas = getSnapshot(rootStateInstance)
            console.log('MST数据:',getSnapshot(rootStateInstance).formData);
            alert(`MST数据:${JSON.stringify(getSnapshot(rootStateInstance).formData)}`)
          }}
          onReset = {() => {
            const resetFormData = defaultFormData
            rootStateInstance.resetFormData(resetFormData)
          }}
          onValuesChange = {onValuesChange}
          params={{}}
        >
          <ProFormText  width={500} name="classifyName" label="分类名称" placeholder={'水果'} />
          <ProFormText  width={500} name="from" label="产地" placeholder={'产地'} />
          <ProFormText  width={500} name="transport" label="运输方式" placeholder={'运输方式'} />
          <ProFormText  width={500} name="countNumber" label="总量" placeholder={'总量'} />
          <ProFormTextArea  width={500} colProps={{ span: 24 }} name="info" label="详情" />
          <Tabs
            onChange={tabsChange}
            type="card"
            items={tabItems}
          />
            {
              rootStateInstance?.currentTab === '1' &&
              <div>
                    <ProFormSelect
                      allowClear = {false}
                      width={500}
                      label="苹果颜色"
                      name={['fruilDetail','apple','color']}
                      valueEnum={{
                          1: '红',
                          2: '黄',
                          3: '黑',
                      }}
                  />
                  <ProFormSelect
                      allowClear = {false}
                      width={500}
                      label="苹果口味"
                      name={['fruilDetail','apple','taste']}
                      valueEnum={{
                          1: '甜',
                          2: '酸',
                          3: '酸甜',
                      }}
                  />
                    <ProFormDatePicker  allowClear = {false}  width={500} colProps={{ xl: 8, md: 12 }} label="苹果包装日期" name={['fruilDetail','apple','time', 'timeStart']} />
                    <ProFormDatePicker  allowClear = {false} width={500} colProps={{ xl: 8, md: 12 }} label="苹果有效期至" name={['fruilDetail','apple','time', 'timeEnd']} />
                    <ProFormText  width={500} disabled={true}  name={['fruilDetail','apple', 'remack']} label="描述" placeholder={'苹果'} />
              </div>
            }
            {
              rootStateInstance?.currentTab === '2' &&
              <div>
                    <ProFormSelect
                      width={500}
                      allowClear = {false}
                      label="梅子颜色"
                      name={['fruilDetail','plum','color']}
                      valueEnum={{
                          1: '红',
                          2: '黄',
                          3: '黑',
                      }}
                  />
                  <ProFormSelect
                      allowClear = {false}
                      width={500}
                      label="梅子口味"
                      name={['fruilDetail','plum','taste']}
                      valueEnum={{
                          1: '甜',
                          2: '酸',
                          3: '酸甜',
                      }}
                  />
                    <ProFormDatePicker  allowClear = {false}  width={500} colProps={{ xl: 8, md: 12 }} label="梅子包装日期" name={['fruilDetail','plum','time', 'timeStart']} />
                    <ProFormDatePicker  allowClear = {false}  width={500} colProps={{ xl: 8, md: 12 }} label="梅子有效期至" name={['fruilDetail','plum','time', 'timeEnd']} />
                    <ProFormText  disabled={true} width={500}  name={['fruilDetail','plum', 'remack']} label="描述" placeholder={'梅子'}  />
              </div>
            }
            <div>
             MST实时数据:&nbsp;&nbsp;
              {
                JSON.stringify(getSnapshot(rootStateInstance).formData)
              }
            </div>
        </ProForm>
      </div>
    );
  };

  export default  observer (Multilevel)