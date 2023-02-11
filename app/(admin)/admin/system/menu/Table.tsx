'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { gql, useMutation } from '@apollo/client';
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Switch,
  Table as AntdTable,
} from 'antd';
import * as Icons from '@ant-design/icons';
import produce from 'immer';

export interface Data {
  key: React.Key;
  icon?: string | null;
  name: string;
  link: string;
  isActive: boolean;
  children: Omit<Data, 'children'>[];
}

export interface TableProps {
  data: Data[];
}

export default function Table({ data }: TableProps) {
  const router = useRouter();
  const [dataSource, setDataSource] = React.useState<Data[]>(data);
  const [mutate, { loading }] = useMutation(gql`
    mutation Mutation($adminMenus: [UpdateAdminMenuInput!]!) {
      updateAdminMenu(adminMenus: $adminMenus) {
        id
      }
    }
  `);
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      onFinish={
        // eslint-disable-next-line no-shadow
        ({ data }: { data: Data[] }) => {
          return mutate({
            variables: {
              adminMenus: data.map(
                // eslint-disable-next-line no-shadow
                (data) => ({
                  icon: data.icon,
                  name: data.name,
                  link: data.link,
                  isActive: data.isActive,
                  children: data.children?.map(
                    // eslint-disable-next-line no-shadow
                    (data) => ({
                      icon: data.icon,
                      name: data.name,
                      link: data.link,
                      isActive: data.isActive,
                    }),
                  ),
                }),
              ),
            },
            onCompleted: () => {
              router.refresh();
              return message.success('저장완료');
            },
            onError: (error) => message.error(error.message),
          });
        }
      }
    >
      <Space style={{ display: 'flex' }} direction="vertical">
        <Row justify="end">
          <Col>
            <Button
              type="primary"
              onClick={() => {
                setDataSource((prevState) => [
                  ...prevState,
                  {
                    key: `Menu-${Date.now()}`,
                    icon: null,
                    name: '',
                    link: '',
                    isActive: true,
                    children: [],
                  },
                ]);
              }}
            >
              메뉴 추가
            </Button>
          </Col>
        </Row>
        <AntdTable
          dataSource={dataSource}
          expandable={{
            defaultExpandAllRows: true,
          }}
          columns={[
            {
              title: '확장',
              width: 30,
            },
            {
              title: '아이콘',
              dataIndex: 'icon',
              align: 'center',
              width: 200,
              render: (value, record, index) => {
                const parentIndex = !record.children
                  ? dataSource.findIndex(
                      // eslint-disable-next-line no-shadow
                      (data) =>
                        (record.key as string).startsWith(data.key as string),
                    )
                  : -1;
                return (
                  <Form.Item
                    initialValue={value}
                    noStyle
                    name={
                      parentIndex > -1
                        ? ['data', parentIndex, 'children', index, 'icon']
                        : ['data', index, 'icon']
                    }
                  >
                    <Select
                      style={{ width: 200 }}
                      allowClear
                      showSearch
                      placeholder="Search to Select"
                      optionFilterProp="children"
                      filterOption={(input, option) => {
                        return `${
                          option?.label?.props?.children[1] ?? ''
                        }`.includes(input);
                      }}
                      filterSort={(optionA, optionB) =>
                        `${optionA?.label?.props?.children[1] ?? ''}`
                          .toLowerCase()
                          .localeCompare(
                            `${
                              optionB?.label?.props?.children[1] ?? ''
                            }`.toLowerCase(),
                          )
                      }
                      options={Object.entries(Icons).reduce<any[]>(
                        (previousValue, [name, Icon]: [string, any]) => {
                          if (!Icon.$$typeof) return previousValue;
                          return [
                            ...previousValue,
                            {
                              label: (
                                <>
                                  <Icon style={{ marginRight: 5 }} />
                                  {name}
                                </>
                              ),
                              value: name,
                            },
                          ];
                        },
                        [],
                      )}
                    />
                  </Form.Item>
                );
              },
            },
            {
              title: '이름',
              dataIndex: 'name',
              align: 'center',
              render: (value, record, index) => {
                const parentIndex = !record.children
                  ? dataSource.findIndex(
                      // eslint-disable-next-line no-shadow
                      (data) =>
                        (record.key as string).startsWith(data.key as string),
                    )
                  : -1;
                return (
                  <Form.Item
                    initialValue={value}
                    noStyle
                    name={
                      parentIndex > -1
                        ? ['data', parentIndex, 'children', index, 'name']
                        : ['data', index, 'name']
                    }
                  >
                    <Input placeholder="이름" />
                  </Form.Item>
                );
              },
            },
            {
              title: '링크',
              dataIndex: 'link',
              width: 200,
              align: 'center',
              render: (value, record, index) => {
                const parentIndex = !record.children
                  ? dataSource.findIndex(
                      // eslint-disable-next-line no-shadow
                      (data) =>
                        (record.key as string).startsWith(data.key as string),
                    )
                  : -1;
                return (
                  <Form.Item
                    initialValue={value}
                    noStyle
                    name={
                      parentIndex > -1
                        ? ['data', parentIndex, 'children', index, 'link']
                        : ['data', index, 'link']
                    }
                  >
                    <Input placeholder="링크" />
                  </Form.Item>
                );
              },
            },
            {
              title: '사용',
              dataIndex: 'isActive',
              width: 50,
              align: 'center',
              render: (value, record, index) => {
                const parentIndex = !record.children
                  ? dataSource.findIndex(
                      // eslint-disable-next-line no-shadow
                      (data) =>
                        (record.key as string).startsWith(data.key as string),
                    )
                  : -1;
                return (
                  <Form.Item
                    initialValue={value}
                    noStyle
                    name={
                      parentIndex > -1
                        ? ['data', parentIndex, 'children', index, 'isActive']
                        : ['data', index, 'isActive']
                    }
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                );
              },
            },
            {
              title: '작업',
              width: 60,
              align: 'center',
              render: (_, record, index) => {
                const parentIndex = !record.children
                  ? dataSource.findIndex(
                      // eslint-disable-next-line no-shadow
                      (data) =>
                        (record.key as string).startsWith(data.key as string),
                    )
                  : -1;
                return (
                  <Space>
                    {record.children && (
                      <Button
                        type="primary"
                        onClick={() => {
                          setDataSource(
                            produce((draft) => {
                              draft[index].children.push({
                                key: `${record.key}-${Date.now()}`,
                                icon: null,
                                name: '',
                                link: '',
                                isActive: true,
                              });
                            }),
                          );
                        }}
                      >
                        추가
                      </Button>
                    )}
                    <Button
                      type="primary"
                      danger
                      onClick={() => {
                        // eslint-disable-next-line no-shadow
                        const data = form.getFieldValue('data').map(
                          // eslint-disable-next-line no-shadow
                          (data: Data, dataIndex: number) => ({
                            ...dataSource[dataIndex],
                            ...data,
                            children:
                              data.children?.map(
                                (childData, childDataIndex) => ({
                                  ...dataSource[dataIndex].children?.[
                                    childDataIndex
                                  ],
                                  ...childData,
                                }),
                              ) ?? [],
                          }),
                        );
                        if (parentIndex > -1) {
                          data[parentIndex].children.splice(index, 1);
                        } else {
                          data.splice(index, 1);
                        }
                        form.setFieldValue('data', data);
                        setDataSource(data);
                      }}
                    >
                      삭제
                    </Button>
                  </Space>
                );
              },
            },
          ]}
          pagination={false}
        />
        <Row justify="end">
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={loading}
            >
              저장
            </Button>
          </Col>
        </Row>
      </Space>
    </Form>
  );
}
