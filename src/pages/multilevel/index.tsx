import { ProCard, ProForm, ProFormList,ProFormField, ProFormText,FormListActionType,ProFormInstance } from '@ant-design/pro-components';
import { Button }  from 'antd';
import React, { useRef } from 'react';
import  {attributeInstance} from './multilevel-instance'
import { observer } from 'mobx-react-lite';
import { getSnapshot} from 'mobx-state-tree';
import style from './index.module.less';
import { useNavigate } from 'react-router-dom';

const Specifications = () => {
  const navigate = useNavigate();
  const actionRef = useRef<FormListActionType<{ name: string;}>>()
  const formRef = useRef<ProFormInstance>();

  return (
    <div className={style.multilevelInstanceRoot} >
      <div className={style.addBtnEl} >
          <Button
              onClick={() => {
                attributeInstance.addAttribute();
                attributeInstance.formReload(formRef);
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
        onReset = {
          () => {
            attributeInstance.resetForm(formRef)
          }
        }
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
          actionRender = {
              (field,action)=> [
                <span className={style.deleteEl} 
                  onClick={() => {
                    attributeInstance.deleteAttribute(Number(field.key))
                    attributeInstance.formReload(formRef)
                  }} 
                  key = {field?.key} 
                >
                  删除
                </span>
              ]
          }
          creatorRecord={{ name: '', items: [{ name: '' }] }}
          initialValue={getSnapshot(attributeInstance).attributes.slice()}
        >
           {(
            meta,
            attributeIndex,
            action,
            count,
          ) => {
            return (
              <div>
                <ProFormText 
                  style={{ padding: 0 }} 
                  width="md" 
                  name="name" 
                  label="规格名" 
                  fieldProps={{
                    onChange:(e) => {
                      attributeInstance.setAttributeName(attributeIndex, e.target.value)
                    }
                  }}
                />
                <ProForm.Item isListField style={{ marginBlockEnd: 0 }} label="规格值">
                  <div className={style.addAttributeItemEl} onClick={
                    () => {
                      attributeInstance.addAttributeItem(attributeIndex);
                      attributeInstance.formReload(formRef)
                    }
                  }>
                    新建规格
                  </div>
                  <ProFormList
                    name="attributeItems"
                    actionRender = {
                        (field,action)=> [
                          <span key = {field?.key} ></span>
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
                      meta,
                      itemIndex,
                      count,
                    )  => {
                      return (
                        <div className={style.attributeItemBox}>
                          <ProFormText allowClear={false} fieldProps = {{
                            onChange:(e) => {
                              attributeInstance.setAttributeItem(attributeIndex, itemIndex, e.target.value)
                            }
                          }} width="xs" name={['name']} />
                          <span className={style.deleteEl}  onClick={()=>{
                              attributeInstance.deleteAttributeItem(attributeIndex, itemIndex);
                              attributeInstance.formReload(formRef)
                          }}>删除</span>
                        </div>
                      )
                    }}
                  </ProFormList>
                  
                </ProForm.Item>
              </div>
            );
          }}
        </ProFormList>
          <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
            <ProFormField
              ignoreFormItem
              fieldProps={{
                style: {
                  width: '100%',
                },
              }}
              mode="read"
              valueType="jsonCode"
              text={JSON.stringify(getSnapshot(attributeInstance).attributes)}
            />
        </ProCard>
      </ProForm>
    </div>
  );
};



export default observer(Specifications);