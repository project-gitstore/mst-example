import { EditableProTable, ProCard, ProFormField, ActionType } from '@ant-design/pro-components';
import { useRef } from 'react';
import {activityInstance} from './activity-instance'
import { observer, } from 'mobx-react-lite';
import { Button, Input, Select}  from 'antd';
import { getSnapshot} from 'mobx-state-tree';

const Activity = () => {
  const actionRef = useRef<ActionType>();

  const columns = [
    {
      title: '活动名称',
      dataIndex: 'title',
      width: '15%',
      renderFormItem: (_:any, row:any) => {
        return (
          <Input onChange={ (e) => {
            activityInstance.activityItemChange(row?.record?.id, 'title', e?.target?.value)
          }}/>
        )
      },
      render: (_:any, row:any) => {
        return (<span>{row?.title || '_'}</span>)
      }
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      width: '15%',
      renderFormItem: (_:any, row:any) => {
        return (
          <Select
            style={{ width: 120 }}
            onChange={(value) => {
              console.log('value:', value);
              activityInstance.activityItemChange(row?.record?.id, 'state', value)
            }}
            options={[
              {
                value: "1",
                label: "未解决",
              },
              {
                value: "2",
                label: "已解决",
              },
            ]}
          />
          
        )
      },
      render: (_:any, row:any) => {
        return (<span>{row?.state === '1' ? '未解决' : '已解决'}</span>)
      }
    },
    {
      title: '描述',
      dataIndex: 'decs',
      renderFormItem: (_:any, row:any) => {
        return (
          <Input onChange={ (e) => {
            activityInstance.activityItemChange(row?.record?.id, 'decs', e?.target?.value)
          }}/>
        )
      },
    },
    {
      title: '活动天数',
      dataIndex: 'days',
      renderFormItem: (_:any, row:any) => {
        return (
          <Input onChange={ (e) => {
            activityInstance.activityItemChange(row?.record?.id, 'days', Number(e?.target.value))
          }}/>
        )
      },
      render: (_:any, row:any) => {
        return (<span>{row?.days || '-'}</span>)
      }
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text:any, record:any, _:any, action:any) => [
        <span
          style = {{cursor:'pointer'}}
          key="editable"
          onClick={() => {
            activityInstance.setEditKeys(record.id)
          }}
        >
          编辑
        </span>,
        <span
          style = {{cursor:'pointer'}}
          key="delete"
          onClick={() => {
            activityInstance.delete(record?.id)
          }}
        >
          删除
        </span>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable
        toolBarRender={() => [
          <Button
              onClick={() => {
                activityInstance.addActivity()
              }}
            >
            新增
          </Button>
        ]}
        actionRef = {actionRef}
        rowKey="id"
        headerTitle="可编辑表格"
        maxLength={5}
        scroll={{
          x: 960,
        }}
        recordCreatorProps={false}
        loading={false}
        columns={columns}
        request={async () => ({
          data: [],
          total: 3,
          success: true,
        })}
        value={getSnapshot(activityInstance).activityList}
        editable={{
          type: 'multiple',
          editableKeys:getSnapshot(activityInstance).editKeys,
          onSave: async (rowKey, data, row) => {
            activityInstance.deleteEdikey(row.id)
          },
          actionRender: (row, config, defaultDom) => {
            return [
              <span 
                style = {{cursor:'pointer'}}
                key = {row.id} 
                onClick={() => {
                    activityInstance.deleteEdikey(row.id)
                }}
              >
                保存
              </span>,
            ]
          }
        }}
      />
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
          text={JSON.stringify(getSnapshot(activityInstance).activityList)}
        />
      </ProCard>
    </>
  );
};

export default observer(Activity)