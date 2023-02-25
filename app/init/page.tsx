'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button, Col, Form, Input, Result, Row, Steps, Typography } from 'antd';
import { useMutation } from 'react-query';
import handleError from '#utils/handleError';
import { InitRequest } from '#pages/api/init';

export const dynamic = 'force-dynamic';

export default function Page() {
  const router = useRouter();
  const [current, setCurrent] = React.useState<number>(0);
  const [siteSettingForm] = Form.useForm();
  const items = React.useMemo(
    () => [
      {
        title: '사이트 기본 설정',
        onClick: () => {
          setCurrent(0);
        },
      },
      {
        title: '관리자 계정 설정',
        onClick: () => {
          setCurrent(1);
        },
      },
      { title: '설정 완료' },
    ],
    [],
  );
  const mutation = useMutation<any, any, InitRequest>((variables) =>
    axios.post('/api/init', variables),
  );
  return (
    <>
      <Typography.Title>초기 설정</Typography.Title>
      <Steps
        size="small"
        current={current}
        items={items}
        style={{ marginBottom: 50 }}
      />
      <Typography.Title level={2}>{items[current].title}</Typography.Title>
      {current === 0 && (
        <Form
          form={siteSettingForm}
          labelCol={{ span: 5 }}
          style={{ maxWidth: 600 }}
          onFinish={() => {
            setCurrent(1);
          }}
        >
          <Form.Item
            name="title"
            label="사이트 이름"
            rules={[{ required: true, message: '사이트 이름을 입력해주세요' }]}
          >
            <Input placeholder="사이트 이름" />
          </Form.Item>
          <Form.Item
            name="description"
            label="사이트 설명"
            rules={[{ required: true, message: '사이트 설명을 입력해주세요' }]}
          >
            <Input placeholder="사이트 설명" />
          </Form.Item>
          <Form.Item>
            <Row justify="end">
              <Col>
                <Button type="primary" htmlType="submit">
                  관리자 계정 설정
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      )}
      {current === 1 && (
        <Form
          labelCol={{ span: 5 }}
          style={{ maxWidth: 600 }}
          onFinish={(values) => {
            mutation.mutate(
              {
                site: {
                  title: siteSettingForm.getFieldValue('title'),
                  description: siteSettingForm.getFieldValue('description'),
                },
                admin: {
                  name: values.name,
                  nickname: values.nickname,
                  username: values.username,
                  email: values.email,
                  password: values.password,
                },
              },
              {
                onSuccess: () => {
                  setCurrent(2);
                },
                onError: handleError,
              },
            );
          }}
        >
          <Form.Item
            name="name"
            label="이름"
            rules={[{ required: true, message: '이름을 입력해주세요' }]}
          >
            <Input placeholder="이름" />
          </Form.Item>
          <Form.Item
            name="nickname"
            label="닉네임"
            rules={[{ required: true, message: '닉네임을 입력해주세요' }]}
          >
            <Input placeholder="닉네임" />
          </Form.Item>
          <Form.Item
            name="username"
            label="아이디"
            rules={[{ required: true, message: '아이디를 입력해주세요' }]}
          >
            <Input placeholder="아이디" />
          </Form.Item>
          <Form.Item
            name="email"
            label="이메일"
            rules={[{ required: true, message: '이메일를 입력해주세요' }]}
          >
            <Input placeholder="이메일" />
          </Form.Item>
          <Form.Item
            name="password"
            label="비밀번호"
            rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
          >
            <Input.Password placeholder="비밀번호" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="비밀번호 확인"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '비밀번호를 입력해주세요',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('비밀번호가 일치하지 않습니다'),
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="비밀번호 확인" />
          </Form.Item>
          <Form.Item>
            <Row justify="end">
              <Col>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={mutation.isLoading}
                >
                  설정
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      )}
      {current === 2 && (
        <Result
          status="success"
          title="초기 설정 완료되었습니다."
          extra={[
            <Button
              type="primary"
              onClick={() => {
                router.replace('/');
              }}
            >
              메인페이지로
            </Button>,
          ]}
        />
      )}
    </>
  );
}
