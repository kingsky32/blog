'use client';

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import Form from '#components/Form';
import styles from './page.module.scss';

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    username: string;
    password: string;
    isSaveUsername: boolean;
    isAuto: boolean;
  }>({
    defaultValues: {
      username:
        typeof window !== 'undefined'
          ? window.localStorage.getItem('username') ?? ''
          : '',
      password: '',
      isSaveUsername: true,
      isAuto: true,
    },
  });

  return (
    <Form
      className={styles.container}
      onSubmit={handleSubmit(
        ({ username, password, isSaveUsername, isAuto }) => {
          return signIn('credentials', {
            username,
            password,
            isAuto,
            redirect: true,
          }).then((res) => {
            if (isSaveUsername) {
              localStorage.setItem('username', username);
            }
            return res;
          });
        },
      )}
    >
      <div className={styles.inner}>
        <h3 className={styles.title}>로그인</h3>
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
          {...register('password', {
            required: '비밀번호를 입력해주세요',
          })}
          className={styles.input}
          type="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          autoComplete="password"
          error={errors.password}
        />
        <div className={styles.checksContainer}>
          <Form.CheckBox
            {...register('isSaveUsername')}
            className={styles.check}
            label="아이디 저장"
          />
          <Form.CheckBox
            {...register('isAuto')}
            className={styles.check}
            label="자동 로그인"
          />
        </div>
        <Form.Button htmlType="submit" className={styles.submitButton}>
          로그인
        </Form.Button>
        <div className={styles.linksContainer}>
          <Link className={styles.link} href="/sign_up">
            회원가입
          </Link>
          <Link className={styles.link} href="/find_id">
            아이디 찾기
          </Link>
          <Link className={styles.link} href="/find_pw">
            비밀번호 찾기
          </Link>
        </div>
      </div>
    </Form>
  );
}
