import React, { useEffect, useRef} from 'react'
import {
    ProForm,
    ProFormDatePicker,
    ProFormDigit,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
    ProFormInstance
  } from '@ant-design/pro-components';
  import { Col, message, Row, Space } from 'antd';
  import type { FormLayout } from 'antd/lib/form/Form';
  import rootStateInstance from './rootStore';
  import { getSnapshot } from 'mobx-state-tree';
  import { defaultFormData } from './data';
  import { useLocation } from 'react-router-dom';
  import { useNavigate } from 'react-router-dom';

  const onValuesChange = (formValues:any) => {
    const key =  Object.keys(formValues)[0]
    rootStateInstance.setFormValue(key,formValues[key] )
  }
  
  export default (props:any) => {
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

    return (
      <div style={{padding:'20px'}}>
        <ProForm
          formRef={formRef}
          onFinish={async (values) => {
            const rootState = getSnapshot(rootStateInstance)
            console.log('formdatas:', rootState.formData);
            message.success('提交成功');
            rootStateInstance.addList(rootState.formData)
            navigate(-1)
          
            
          }}
          onReset = {() => {
            const resetFormData = defaultFormData
            rootStateInstance.resetFormData(resetFormData)
          }}
          onValuesChange = {onValuesChange}
          params={{}}
        >
          
          <ProFormText  width={500} name="title" label="标题" />
          <ProFormText  width={500} colProps={{ md: 12, xl: 8 }} name="name" label="名称" />
          <ProFormDigit  width={500} colProps={{ md: 12, xl: 8 }} name="count" label="数量" />
          <ProFormTextArea  width={500} colProps={{ span: 24 }} name="remack" label="备注" />
          <ProFormDatePicker  width={500} colProps={{ xl: 8, md: 12 }} label="日期" name="date" />
          <ProFormSelect
            width={500}
            colProps={{ xl: 8, md: 12 }}
            label="下拉选择"
            name="type"
            valueEnum={{
              1: '大',
              2: '中',
              3: '小',
            }}
          />
          <ProFormDigit  width={500} colProps={{ md: 12, xl: 8 }} name="id" label="数量" />
        </ProForm>
      </div>
    );
  };