'use client';

import React from 'react';
import Form from '#components/Form';
import { useForm } from 'react-hook-form';
import { gql, useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { GraphQLError } from 'graphql/error';
import { signIn } from 'next-auth/react';
import styles from './page.module.scss';

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
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
  useQuery(
    gql`
      query Query($nickname: String!) {
        validateNickname(nickname: $nickname)
      }
    `,
    {
      variables: {
        nickname: watch('nickname'),
      },
      onCompleted: () => {
        if (errors.nickname) clearErrors('nickname');
      },
      onError: (error) => {
        if (error) setError('nickname', { message: error.message });
      },
    },
  );
  useQuery(
    gql`
      query Query($username: String!) {
        validateUsername(username: $username)
      }
    `,
    {
      variables: {
        username: watch('username'),
      },
      onCompleted: () => {
        if (errors.username) clearErrors('username');
      },
      onError: (error) => {
        if (error) setError('username', { message: error.message });
      },
    },
  );
  useQuery(
    gql`
      query Query($email: String!) {
        validateEmail(email: $email)
      }
    `,
    {
      variables: {
        email: watch('email'),
      },
      onCompleted: () => {
        if (errors.email) clearErrors('email');
      },
      onError: (error) => {
        if (error) setError('email', { message: error.message });
      },
    },
  );
  const [joinMutate, { loading }] = useMutation(gql`
    mutation Mutation(
      $name: String!
      $nickname: String!
      $username: String!
      $email: String!
      $password: String!
    ) {
      join(
        name: $name
        nickname: $nickname
        username: $username
        email: $email
        password: $password
      ) {
        id
      }
    }
  `);

  return (
    <Form
      className={styles.container}
      onSubmit={handleSubmit(
        ({ name, nickname, username, email, password }) => {
          return joinMutate({
            variables: {
              name,
              nickname,
              username,
              email,
              password,
            },
          })
            .then(() => {
              toast.success('회원가입이 완료되었습니다');
              return signIn('credentials', {
                username,
                password,
                redirect: true,
              });
            })
            .catch((error) => {
              error?.graphQLErrors?.forEach((error: GraphQLError) => {
                toast.error(error.message);
              });
            });
        },
      )}
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
        <Form.Button
          htmlType="submit"
          className={styles.submitButton}
          loading={loading}
        >
          회원가입
        </Form.Button>
      </div>
    </Form>
  );
}
