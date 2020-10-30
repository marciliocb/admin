import { Button, Col, DatePicker, Form, Input, notification, Row, Select, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { ModalForm, HeaderComponent } from "../../components";
import { ROUTES_LIST } from "../../constants";
import { useLayout } from "../../contexts";
import { dataMock } from "./mock";

const { Option } = Select;

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
    const [initialValues, setInitialValues] = useState<any>();
    const [sending, setSending] = useState(false);
    const layoutContext = useLayout();
    const { setNavigationSelected } = layoutContext;

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
                    <a onClick={() => {
                        setInitialValues({...record});
                    }}>Edit</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        setNavigationSelected(ROUTES_LIST());

        return () => {
            setNavigationSelected('');
        }
    }, []);

    function formClose() {
        setInitialValues(undefined);
    }

    function handleSubmit() {
        setSending(true);
        setTimeout(() => {
            setSending(false);
            setInitialValues(false);
            notification.success({
                message: 'Sucesso!'
            })
        }, 2000);
    }

    return (
        <>
            <div>
                <HeaderComponent title="List Page" childrenEnd={
                    <Button type="primary" size="large" onClick={() => setInitialValues({})}>
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
            {initialValues && (
                <ModalForm title="Form example" sending={sending} initialValues={initialValues} onSubmit={handleSubmit} onClose={formClose}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: 'Please enter user name' }]}
                            >
                                <Input placeholder="Please enter user name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="url"
                                label="Url"
                                rules={[{ required: true, message: 'Please enter url' }]}
                            >
                                <Input
                                    style={{ width: '100%' }}
                                    addonBefore="http://"
                                    addonAfter=".com"
                                    placeholder="Please enter url"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="owner"
                                label="Owner"
                                rules={[{ required: true, message: 'Please select an owner' }]}
                            >
                                <Select placeholder="Please select an owner">
                                    <Option value="xiao">Xiaoxiao Fu</Option>
                                    <Option value="mao">Maomao Zhou</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="type"
                                label="Type"
                                rules={[{ required: true, message: 'Please choose the type' }]}
                            >
                                <Select placeholder="Please choose the type">
                                    <Option value="private">Private</Option>
                                    <Option value="public">Public</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="approver"
                                label="Approver"
                                rules={[{ required: true, message: 'Please choose the approver' }]}
                            >
                                <Select placeholder="Please choose the approver">
                                    <Option value="jack">Jack Ma</Option>
                                    <Option value="tom">Tom Liu</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="dateTime"
                                label="DateTime"
                                rules={[{ required: true, message: 'Please choose the dateTime' }]}
                            >
                                <DatePicker.RangePicker
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'please enter url description',
                                    },
                                ]}
                            >
                                <Input.TextArea rows={4} placeholder="please enter url description" />
                            </Form.Item>
                        </Col>
                    </Row>
                </ModalForm>
            )}
        </>
    );
}