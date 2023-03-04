'use client';

import React from 'react';
import Descriptions from '#components/Descriptions';
import Space from '#components/Space';
import Button from '#components/Button';
import Input from '#components/Form/Input';
import { useForm } from 'react-hook-form';
import { CreateCategoryRequest } from '#pages/api/admin/category';
import { useMutation } from 'react-query';
import axios from 'axios';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import handleError from '#utils/handleError';

export default function Page() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<CreateCategoryRequest>();
  const createMutation = useMutation<null, null, CreateCategoryRequest>(
    (variables) => axios.post(`/api/admin/category`, variables),
  );
  return (
    <Space
      direction="column"
      gap={16}
      element="form"
      onSubmit={handleSubmit((data) =>
        createMutation.mutate(data, {
          onSuccess: () => {
            message.success('카테고리가 등록되었습니다');
            router.push(`/admin/blog/category`);
          },
          onError: handleError,
        }),
      )}
    >
      <Descriptions>
        <Descriptions.Item title="카테고리 코드">
          <Input {...register('code')} />
        </Descriptions.Item>
        <Descriptions.Item title="카테고리 이름">
          <Input {...register('name')} />
        </Descriptions.Item>
      </Descriptions>
      <Space justify="end">
        <Button type="primary" htmlType="submit">
          등록
        </Button>
      </Space>
    </Space>
  );
}
