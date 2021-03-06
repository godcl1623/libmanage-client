/* eslint-disable no-alert */
import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import InputTemplate from './InputTemplate';
import FormSubmit from './FormSubmit';
import { encryptor } from '../../../../custom_modules/aeser';
import { hasher } from '../../../../custom_modules/hasher';
import { verifyPwd } from '../utils';
import { sendTo } from '../../../../custom_modules/address';
import { border, flex, sizes } from '../../../../styles';
import style from '../styles/components/ChangePwdStyles';
import { StyleSet } from '../../../../custom_modules/commonUtils';
import { useAppDispatch, setTokenStat } from '../../../../slices';

const MemoedInput = memo(InputTemplate);
const MemoedSubmit = memo(FormSubmit);

type TokenCnt = Record<string, string>;

const ChangePwd = ({ token, reqTime }: Record<string, TokenCnt | (() => void)>) => {
  const [pwdMatch, setPwdMatch] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userId, ttl, tokenId, originTime } = token as TokenCnt;
  const checkValidation = (pwd: string, pwdCheck: string, verifyFunc: (val: string) => boolean) => {
    let isReadyToSubmit;
    if (!verifyFunc(pwd) && pwd !== pwdCheck) {
      setIsValid(false);
      setPwdMatch(false);
      isReadyToSubmit = false;
    } else if (verifyFunc(pwd) && pwd !== pwdCheck) {
      setIsValid(true);
      setPwdMatch(false);
      isReadyToSubmit = false;
    } else if (!verifyFunc(pwd) && pwd === pwdCheck) {
      setIsValid(false);
      setPwdMatch(true);
      isReadyToSubmit = false;
    } else {
      setIsValid(true);
      setPwdMatch(true);
      isReadyToSubmit = true;
    }
    return isReadyToSubmit;
  };
  return (
    <form
      css={css`
        ${style({ sizes, flex, border } as StyleSet, { isValid, pwdMatch })}
      `}
      onSubmit={e => {
        e.preventDefault();
        const pwd = e.currentTarget.PWD.value;
        const pwdCheck = e.currentTarget.PWD_check.value;
        const inputs = Array.from(document.querySelectorAll('input'));
        const isEmpty = inputs.filter(input => input.value === '');
        const formData: Record<string, string | void> = {};
        if (isEmpty[0] !== undefined) {
          alert('????????? ?????? ??????????????????');
        } else if (checkValidation(pwd, pwdCheck, verifyPwd)) {
          formData.id = userId;
          formData.pwd = hasher(pwd);
          formData.tokenId = tokenId;
          formData.ttl = ttl;
          formData.reqTime = (reqTime as () => void)();
          formData.originTime = originTime;
          // axios.post('http://localhost:3003/member/reset/pwd', { formData: encryptor(formData, process.env.REACT_APP_TRACER as string) }, {withCredentials: true})
          axios.post(`https://${sendTo}/member/reset/pwd`, { formData: encryptor(formData, process.env.REACT_APP_TRACER as string) }, {withCredentials: true})
            .then(res => {
              if (res.data === 'complete') {
                alert('??????????????? ?????????????????????.\n?????? ?????????????????????.');
                navigate('/');
              } else if (res.data === 'expired') {
                appDispatch(setTokenStat(false));
              }else {
                alert('????????? ??????????????????.');
              }
            })
            .catch(err => alert(err));
        }
      }}
    >
      <div className="input-wrapper">
        <InputTemplate
          inputType="password"
          labelText="????????????"
          inputFor="PWD"
          handler={() => {
            setIsValid(true);
          }}
          placeholder='???????????? (8~16??? ??????, ??????, ??????, ??????(!,@,#,$,%,^,&,*) ??????)'
        />
        <p
          className="verify-error"
          id="input-pwd"
        >??? ???????????? ????????? ?????? ????????????.</p>
        <InputTemplate
          inputType="password"
          labelText="???????????? ??????"
          inputFor="PWD_check"
          handler={() => setPwdMatch(true)}
          placeholder='??????????????? ??? ??? ??? ??????????????????.'
        />
        <p
          className="verify-error"
          id="input-pwd-check"
        >??? ??????????????? ???????????? ????????????.</p>
      </div>
      <div className="submit-wrapper">
        <FormSubmit />
      </div>
    </form>
  );
};

export default ChangePwd;