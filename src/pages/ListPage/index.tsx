import { Button, Divider, Radio, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { HeaderPage } from "../../components";
import { ROUTES_LIST } from "../../constants";
import { useLayout } from "../../contexts";
import { dataMock } from "./mock";

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: (text: any) => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (tags: any) => (
            <>
                {tags.map((tag: any) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (text: any, record: any) => (
          <Space size="middle">
            <a>Edit</a>
            <a>Delete</a>
          </Space>
        ),
      },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: any) => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};

export default function ListPage() {
    const layoutContext = useLayout();
    const { setNavigationSelected } = layoutContext;

    useEffect(() => {
        setNavigationSelected(ROUTES_LIST());

        return () => {
            setNavigationSelected('');
        }
    }, []);


    return (
        <div>
            <HeaderPage title="List Page" childrenEnd={
                <Button type="primary" size="large">
                    Add
                </Button>
            } />
            <Table
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={dataMock}
            />
        </div>
    );
}