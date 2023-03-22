import React from 'react';
import {Button} from 'antd'
import rootStateInstance from '../test/rootStore';
import { getSnapshot } from 'mobx-state-tree';
import { ProTable } from '@ant-design/pro-components';
import type {ProFormInstance } from '@ant-design/pro-components';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const PageList = (props:any) => {
  const navigate = useNavigate();
  const ref = useRef<ProFormInstance>();
  const columns = [
    {
      title:'标题',
      dataIndex: 'title',
      ellipsis: true,
      hideInSearch:true,
    },
    {
      title:'名称',
      dataIndex: 'name',
      ellipsis: true,
      hideInSearch:true,
    },
    {
      title:'数量',
      dataIndex: 'count',
      ellipsis: true,
      hideInSearch:true,
    },
    {
      title:'备注',
      dataIndex: 'remack',
      ellipsis: true,
      hideInSearch:true,
    },
    {
      title:'类型',
      dataIndex: 'type',
      ellipsis: true,
      hideInSearch:true,
    },
    {
      title:'日期',
      dataIndex: 'date',
      ellipsis: true,
      hideInSearch:true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width:'60px',
      render: (text:any, record:any, _:any, action:any) => [
        <span
       
        key="editable"
        onClick={() => {
          navigate('/test', {state:{row:record}})
        }}
      >
        详情
      </span>,
      ],
    },
  ];

  const postList = async (params:any) => {
    params.size = params.pageSize;
    const rootState =  getSnapshot(rootStateInstance)
    return {
      data: rootState.list || [],
      success: true,
      total: 0
    }
  }
  
  return (
    <ProTable
        formRef={ref}
        onReset = {() => {}}
        columns={columns}
        request={async (params = {}) => {
          return postList(params);
        }}
        sticky
        loading = {false}
        rowKey="id"
        editable={{
          type: 'multiple',
        }}
        options={{
            fullScreen: true,
            setting: {
                listsHeight: 400,
            },
        }}
        pagination={{
          pageSizeOptions: [2,10,20,50,100],
          showQuickJumper: true,
          showSizeChanger: true,
          size:'default',
      }}
        dateFormatter="string"
        toolBarRender={() => [
          <Button key="button" onClick={() => {navigate('/multilevel')}} type="primary">
            MST嵌套数据
          </Button>,
          <Button key="button" onClick={() => {navigate('/test')}} type="primary">
          新建
        </Button>,
        ]}
    />
  )
}

export default PageList