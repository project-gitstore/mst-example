import { ProCard, ProForm, ProFormList, ProFormText,FormListActionType,ProFormInstance } from '@ant-design/pro-components';
import { Button, Input, Select}  from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import  {attributeInstance, attributeItemInstance} from './multilevel-instance'
import { observer } from 'mobx-react-lite';
import { getSnapshot} from 'mobx-state-tree';
// import style from './index.module.less';

const Specifications = () => {
  const actionRef = useRef<FormListActionType<{ name: string;}>>()
  const formRef = useRef<ProFormInstance>();

  return (
    <div >
      <div >
          <Button
              onClick={() => {
                attributeInstance.addAttribute();
                formRef?.current?.setFieldValue('attributes',getSnapshot(attributeInstance).attributes)
              }}
          >
            新增
          </Button>
      </div>
      <ProForm 
        formRef = {formRef }
        layout="horizontal"
        onFinish={async (values) => {
          console.log('values:', getSnapshot(attributeInstance).attributes);
        }}
        >
        <ProFormList
          creatorButtonProps = {false}
          actionRef = {actionRef}
          name="attributes"
          label="规格"
          min={1}
          copyIconProps={false}
          itemRender={({ listDom, action }, { index }) => (
            <ProCard
              bordered
              style={{ marginBlockEnd: 8 }}
              title={`规格${index + 1}`}
              extra={action}
              bodyStyle={{ paddingBlockEnd: 0 }}
            >
              {listDom}
            </ProCard>
          )}
          creatorRecord={{ name: '', items: [{ name: '' }] }}
          initialValue={getSnapshot(attributeInstance).attributes.slice()}
        >
           {(
            // 当前行的基本信息 {name: number; key: number}
            meta,
            // 当前的行号
            attributeIndex,
            action,
            // 总行数
            count,
          ) => {
            return (
              <div>
                <ProFormText style={{ padding: 0 }} width="md" name="name" label="规格名" />
                <ProForm.Item isListField style={{ marginBlockEnd: 0 }} label="规格值">
                  <ProFormList
                    name="attributeItems"
                    actionRender = {
                      (field,action)=> [
                        <span key = {field?.key}  onClick={()=>{
                          attributeInstance.deleteAttributeItem(attributeIndex, attributeIndex);
                          formRef?.current?.setFieldValue('attributes',getSnapshot(attributeInstance).attributes)

                        }}></span>
                      ]
                  }
                    
                    min={1}
                    copyIconProps={false}
                    creatorButtonProps = {false}
                    itemRender={({ listDom, action }) => (
                      <div
                        style={{
                          display: 'inline-flex',
                          marginInlineEnd: 25,
                        }}
                      >
                        {listDom}
                        {action}
                      </div>
                    )}
                  >
                    {(
                      // 当前行的基本信息 {name: number; key: number}
                      meta,
                      // 当前的行号
                      itemIndex,
                      action,
                      // 总行数
                      count,
                    )  => {
                      return (
                        <div style={{}}>
                          <ProFormText allowClear={false} fieldProps = {{
                            onChange:(e) => {
                              attributeInstance.setAttributeItem(attributeIndex, itemIndex, e.target.value)
                            }
                          }} width="xs" name={['name']} />
                          <span  onClick={()=>{
                          attributeInstance.deleteAttributeItem(attributeIndex, attributeIndex);
                          formRef?.current?.setFieldValue('attributes',getSnapshot(attributeInstance).attributes)

                        }}>删除69</span>
                        </div>
                      )
                    }}
                  </ProFormList>
                  <span style={{position:'relative', top:'-30px', cursor:'pointer'}} onClick={
                    () => {
                      attributeInstance.addAttributeItem(attributeIndex);
                      formRef?.current?.setFieldValue('attributes',getSnapshot(attributeInstance).attributes)
                    }
                  }>
                    新建规格
                  </span>
                </ProForm.Item>
              </div>
            );
          }}
        </ProFormList>
      </ProForm>
    </div>
  );
};



export default observer(Specifications);