'use client';

import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Form from '#components/Form';
import { useMutation } from 'react-query';
import handleError from '#utils/handleError';
import { useRouter } from 'next/navigation';
import { message } from 'antd';
import styles from './page.module.scss';

export default function Page() {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{
    name: string;
    nickname: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    defaultValues: {
      name: '',
      nickname: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const mutation = useMutation<
    any,
    any,
    {
      name: string;
      username: string;
      nickname: string;
      email: string;
      password: string;
    }
  >((variables) => axios.post('/api/auth/join', variables));
  return (
    <Form
      className={styles.container}
      onSubmit={handleSubmit((data) => {
        mutation.mutate(
          {
            name: data.name,
            username: data.username,
            nickname: data.nickname,
            email: data.email,
            password: data.password,
          },
          {
            onSuccess: () => {
              message.success('계정이 생성되었습니다');
              return router.push('/sign_in');
            },
            onError: handleError,
          },
        );
      })}
    >
      <div className={styles.inner}>
        <h3 className={styles.title}>회원가입</h3>
        <Form.Input
          {...register('name', {
            required: '이름을 입력해주세요',
          })}
          className={styles.input}
          type="text"
          label="이름"
          placeholder="이름을 입력해주세요"
          autoComplete="given-name"
          error={errors.name}
        />
        <Form.Input
          {...register('nickname', {
            required: '닉네임을 입력해주세요',
          })}
          className={styles.input}
          type="text"
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
          autoComplete="nickname"
          error={errors.nickname}
        />
        <Form.Input
          {...register('username', {
            required: '아이디를 입력해주세요',
          })}
          className={styles.input}
          type="text"
          label="아이디"
          placeholder="아이디를 입력해주세요"
          autoComplete="username"
          error={errors.username}
        />
        <Form.Input
          {...register('email', {
            required: '이메일을 입력해주세요',
          })}
          className={styles.input}
          type="email"
          label="이메일"
          placeholder="이메일을 입력해주세요"
          autoComplete="email"
          error={errors.email}
        />
        <Form.Input
          {...register('password', {
            required: '비밀번호를 입력해주세요',
          })}
          className={styles.input}
          type="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          autoComplete="new-password"
          error={errors.password}
        />
        <Form.Input
          {...register('confirmPassword', {
            required: '비밀번호를 한번 더 입력해주세요',
            validate: (value, formValues) => {
              if (value !== formValues.password)
                return '비밀번호가 맞지 않습니다';
              return true;
            },
          })}
          className={styles.input}
          type="password"
          label="비밀번호 확인"
          placeholder="비밀번호를 한번 더 입력해주세요"
          autoComplete="new-password"
          error={errors.confirmPassword}
        />
        <Form.Button htmlType="submit" className={styles.submitButton}>
          회원가입
        </Form.Button>
      </div>
    </Form>
  );
}
