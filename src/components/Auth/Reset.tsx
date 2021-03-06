/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
import React, { useState, useEffect, memo } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FaHome } from "react-icons/fa";
import ChangePwd from './module/components/ChangePwd';
import { encryptor } from '../../custom_modules/aeser';
import { sendTo } from '../../custom_modules/address';
import { flex, sizes } from '../../styles';
import { changePwdRoot, tokenExpired } from './module/styles/ResetStyles';
import { StyleSet } from '../../custom_modules/commonUtils';
import { useAppDispatch, useAppSelector, setTokenStat } from '../../slices';

const MemoedIco = memo(FaHome);
const MemoedPwd = memo(ChangePwd);

const now = () => {
  const date = new Date();
  const year = date.getFullYear();
  const rawMonth = date.getMonth();
  const month = rawMonth + 1 < 10 ? `0${rawMonth + 1}` : rawMonth + 1;
  const rawDay = date.getDate();
  const day = rawDay < 10 ? `0${rawDay}` : rawDay;
  const rawHour = date.getHours();
  const hour = rawHour < 10 ? `0${rawHour}` : rawHour;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
};

const Reset = () => {
  const tokenState = useAppSelector(state => state.sliceReducers.tokenState);
  const [requestedToken, setRequestToken] = useState({});
  const appDispatch = useAppDispatch();
  const location = useLocation();
  const tokenTail = location.pathname.slice(-7,);
  const requestedTime = now();

  useEffect(() => {
    const abortCon = new AbortController();
    const postData = {
      tokenTail,
      requestedTime
    }
    // axios.post('http://localhost:3003/member/reset', { postData: encryptor(postData, process.env.REACT_APP_TRACER as string) }, { withCredentials: true })
    axios.post(`https://${sendTo}/member/reset`, { postData: encryptor(postData, process.env.REACT_APP_TRACER as string) }, { withCredentials: true })
      .then(res => {
        appDispatch(setTokenStat(res.data.tokenState));
        setRequestToken(res.data.token);
      })
      .catch(err => alert(err));
    return () => abortCon.abort();
  }, []);

  const errors = (tokenState: boolean | string) => {
    switch(tokenState) {
      case false:
        return '????????? ?????????????????????.';
      case 'no_token':
        return window.innerWidth > 410
          ? '????????? ???????????? ????????????.'
          : '????????? ????????????\n????????????.';
      default:
        return '????????? ???????????????.';
    }
  }

  switch(tokenState) {
    case true:
      return (
        <div id="change-pwd"
          css={css`
            ${changePwdRoot({ sizes, flex } as StyleSet)}
          `}
        >
          <ChangePwd token={requestedToken} reqTime={now} />
        </div>
      );
    default:
      return(
        <div id="token-expired"
          css={css`
            ${tokenExpired({ sizes, flex } as StyleSet)}
          `}
        >
          <h1>{errors(tokenState)}</h1>
          <a
            id="to_home"
            title="????????????"
            href="https://godcl1623-libmanage.herokuapp.com"
          >
            <FaHome />
          </a>
        </div>
      );
  }
};

export default Reset;