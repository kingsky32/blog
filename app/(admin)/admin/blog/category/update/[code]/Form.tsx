'use client';

import React from 'react';
import Link from 'next/link';
import Descriptions from '#components/Descriptions';
import Space from '#components/Space';
import Button from '#components/Button';
import Input from '#components/Form/Input';
import { useForm } from 'react-hook-form';
import { UpdateCategoryRequest } from '#pages/api/admin/category/[code]';
import { useMutation } from 'react-query';
import axios from 'axios';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import handleError from '#utils/handleError';

export default function Form({ code, name }: { code: string; name: string }) {
  const router = useRouter();
  const { register, handleSubmit } = useForm<UpdateCategoryRequest>({
    defaultValues: {
      code,
      name,
    },
  });
  const updateMutation = useMutation<null, null, UpdateCategoryRequest>(
    (variables) => axios.put(`/api/admin/category/${code}`, variables),
  );
  const deleteMutation = useMutation(() =>
    axios.delete(`/api/admin/category/${code}`),
  );
  return (
    <Space
      direction="column"
      gap={16}
      element="form"
      onSubmit={handleSubmit((data) =>
        updateMutation.mutate(data, {
          onSuccess: () => {
            message.success('카테고리가 수정되었습니다');
            router.push(`/admin/blog/category/detail/${data.code}`);
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
        <Button>
          <Link href={`/admin/blog/category/detail/${code}`}>취소</Link>
        </Button>
        <Button
          type="primary"
          loading={updateMutation.isLoading}
          htmlType="submit"
        >
          수정
        </Button>
        <Button
          type="danger"
          loading={deleteMutation.isLoading}
          onClick={() => {
            deleteMutation.mutate(undefined, {
              onSuccess: () => {
                message.success('카테고리가 삭제되었습니다');
                router.push(`/admin/blog/category`);
              },
              onError: handleError,
            });
          }}
        >
          삭제
        </Button>
      </Space>
    </Space>
  );
}
