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
  Table as AntdTable,
} from 'antd';
import * as Icons from '@ant-design/icons';
import update from 'immutability-helper';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import produce from 'immer';

interface DraggableBodyRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  index: number;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
}

const type = 'DraggableBodyRow';

function DraggableBodyRow({
  index,
  moveRow,
  className,
  style,
  ...restProps
}: DraggableBodyRowProps) {
  const ref = React.useRef<HTMLTableRowElement>(null);
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item: { index: number }) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));

  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  );
}

export interface Data {
  key: React.Key;
  icon?: string | null;
  name: string;
  link: string;
  children?: Data[];
}

export interface TableProps {
  data: Data[];
}

export default function Table({ data }: TableProps) {
  const [dataSource, setDataSource] = React.useState<Data[]>(data);
  const [mutate, { loading }] = useMutation(gql`
    mutation Mutation($adminMenus: [UpdateAdminMenuInput!]!) {
      updateAdminMenu(adminMenus: $adminMenus) {
        id
      }
    }
  `);
  const router = useRouter();

  return (
    <Form
      onFinish={() => {
        return mutate({
          variables: {
            adminMenus: dataSource.map((data) => ({
              icon: data.icon,
              name: data.name,
              link: data.link,
            })),
          },
          onCompleted: () => {
            message.success('저장완료');
            router.refresh();
          },
          onError: (error) => message.error(error.message),
        });
      }}
    >
      <Space style={{ display: 'flex' }} direction="vertical">
        <Row>
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
                  },
                ]);
              }}
            >
              메뉴 추가
            </Button>
          </Col>
        </Row>
        <DndProvider backend={HTML5Backend}>
          <AntdTable
            columns={[
              {
                title: '아이콘',
                dataIndex: 'icon',
                align: 'center',
                width: 200,
                render: (value, _, index) => (
                  <Select
                    value={value}
                    style={{ width: 200 }}
                    onChange={(value) => {
                      setDataSource(
                        produce((draft) => {
                          draft[index].icon = value;
                        }),
                      );
                    }}
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
                ),
              },
              {
                title: '이름',
                dataIndex: 'name',
                render: (value, _, index) => (
                  <Input
                    placeholder="이름"
                    value={value}
                    onChange={(event) => {
                      setDataSource(
                        produce((draft) => {
                          draft[index].name = event.target.value;
                        }),
                      );
                    }}
                  />
                ),
              },
              {
                title: '링크',
                dataIndex: 'link',
                width: 200,
                render: (value, _, index) => (
                  <Input
                    placeholder="링크"
                    value={value}
                    onChange={(event) => {
                      setDataSource(
                        produce((draft) => {
                          draft[index].link = event.target.value;
                        }),
                      );
                    }}
                  />
                ),
              },
              {
                title: '작업',
                width: 60,
                align: 'center',
                render: (_, record) => (
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      setDataSource((prevState) =>
                        prevState.filter((data) => data.key !== record.key),
                      );
                    }}
                  >
                    삭제
                  </Button>
                ),
              },
            ]}
            dataSource={dataSource}
            components={{
              body: {
                row: DraggableBodyRow,
              },
            }}
            onRow={(_, index) => {
              const attr = {
                index,
                moveRow: (dragIndex: number, hoverIndex: number) => {
                  setDataSource((prevState) =>
                    update(prevState, {
                      $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, prevState[dragIndex]],
                      ],
                    }),
                  );
                },
              };
              return attr as React.HTMLAttributes<any>;
            }}
            pagination={false}
          />
        </DndProvider>
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
