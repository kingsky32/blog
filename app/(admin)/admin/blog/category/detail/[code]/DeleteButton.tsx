'use client';

import React from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { message } from 'antd';
import handleError from '#utils/handleError';
import Button from '#components/Button';

export default function DeleteButton({ code }: { code: string }) {
  const router = useRouter();
  const deleteMutation = useMutation(() =>
    axios.delete(`/api/admin/category/${code}`),
  );
  return (
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
  );
}
