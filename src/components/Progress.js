import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { comparisonStateCreator } from '../actions';
import { sendTo } from '../custom_modules/address';
import { flex, sizes } from '../styles';

const Progress = () => {
  const comparisonState = useSelector(state => state.comparisonState);
  const [count, setCount] = useState('');
  const [total, setTotal] = useState('');
  const [status, setStatus] = useState('1');
  const [userInfo, setUserInfo] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [maxApiCall, setMaxApiCall] = useState('');
  const [currApiCall, setCurrApiCall] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const abortCon = new AbortController();
  const additionalString = `(${currApiCall+1}회차 / 전체 ${maxApiCall}회)`;
  const forceAbort = (aborter, history) => setTimeout(() => {
    aborter.abort();
    history.push('/main');
  }, 30000);
  const statusText = (status, addStr) => {
    switch (status) {
      case '1':
        return `보유 중인 라이브러리를 IGDB 서비스에 검색 중입니다.`;
      case '2':
        return `누락된 항목을 IGDB 서비스에 재검색 중입니다. ${addStr}`;
      case '3':
        return `IGDB 서비스로부터 메타데이터를 수신하는 중입니다. ${addStr}`;
      case '4':
        return `수신한 메타데이터를 가공하는 중입니다. ${addStr}`;
      case '5':
        return `메타데이터의 저장이 완료됐습니다.`;
      default:
        return `오류가 발생했습니다.`;
    }
  };
  useEffect(() => {
    const message = {
      comparisonState,
      million: localStorage.getItem('frog')
    };
    const timer = forceAbort(abortCon, history);
    axios
      // .post('http://localhost:3002/check_login', { message: '' }, { withCredentials: true })
      // .post('http://localhost:3001/check_login', { message }, { withCredentials: true })
      .post(`https://${sendTo}/check_login`, { message }, { withCredentials: true })
      .then(res => {
        const reqUserInfo = res.data;
        clearTimeout(timer);
        setUserInfo(reqUserInfo);
      })
      .catch(err => console.log('err occured', err));
    return () => abortCon.abort();
  }, []);
  useEffect(() => {
    if (userInfo !== '') {
      const timer = forceAbort(abortCon, history);
      axios
        // .get('http://localhost:3001/storeLib', { withCredentials: true })
        .get(`https://${sendTo}/storeLib`, { withCredentials: true })
        .then(res => {
          clearTimeout(timer);
          setApiKey(res.data.apiKey);
          setMaxApiCall(Math.ceil(res.data.maxGames/25));
          setCurrApiCall(0);
        })
        .catch(err => console.log(err));
    }
    return () => abortCon.abort();
  }, [userInfo]);
  useEffect(() => {
    if (currApiCall !== '' && currApiCall !== 'done') {
      const pack = {
        apiCred: apiKey,
        maxApiCall,
        currApiCall,
        userInfo
      }
      const timer = forceAbort(abortCon, history);
      axios
        // .post('http://localhost:3001/meta/search', { pack }, { withCredentials: true })
        .post(`https://${sendTo}/meta/search`, { pack }, { withCredentials: true })
        .then(res => {
          clearTimeout(timer);
          if (res.data === 'done') {
            setCurrApiCall('done');
          } else {
            setCurrApiCall(currApiCall => currApiCall + Number(res.data));
          }
        })
        .catch(err => console.log(err));
    }
      return () => abortCon.abort();
  }, [currApiCall]);
  useEffect(() => {
    if (currApiCall === 'done') {
      const timer = forceAbort(abortCon, history);
      axios
        // .post('http://localhost:3001/api/search', { reqUserInfo: userInfo }, { withCredentials: true })
        .post(`https://${sendTo}/api/search`, { reqUserInfo: userInfo }, { withCredentials: true })
        .then(res => {
          if (res.data.result) {
            clearTimeout(timer);
            dispatch(comparisonStateCreator(res.data.newInfo));
            setTimeout(() => history.push('/main'), 1500);
          }
        })
        .catch(err => console.log(err));
    }
    return () => abortCon.abort();
  }, [currApiCall]);
  useEffect(() => {
    const requestStatus = setInterval(() => {
      // axios.post('http://localhost:3003/stat/track', {}, { withCredentials: true }).then(res => {
      // axios.post('http://localhost:3001/stat/track', {}, { withCredentials: true }).then(res => {
      axios.post(`https://${sendTo}/stat/track`, {}, { withCredentials: true }).then(res => {
        if (res.data.status === status) {
          setCount(res.data.count);
          setTotal(res.data.total);
        } else {
          setCount(res.data.count);
          setTotal(res.data.total);
          setStatus(res.data.status);
        }
        if (status === '5') {
          clearInterval(requestStatus);
        }
      });
    }, 1000);
    return () => {
      clearInterval(requestStatus);
      abortCon.abort();
    };
  }, [count]);
  return (
    <article
      css={css`
        ${sizes.full}
        ${flex.vertical}

        h1 {
          margin-bottom: 5.208vw;
          font-size: 5.208vw;
        }

        p {
          font-size: 1.25vw;
          font-weight: bold;
        }

        .contents-wrapper {
          border-radius: var(--border-rad-normal);
          ${sizes.free('40%', '50%')}
          background: white;
          ${flex.vertical}
          box-shadow: 0 0 0.521vw 0.052vw var(--grey-dark);
        }

        @media (orientation: portrait) {
          @media (min-width: 600px) {
            h1 {
              margin-bottom: ${5.208 * 1.778}vw;
              font-size: ${5.208 * 1.778}vw;
            }
    
            p {
              font-size: ${1.25 * 1.778}vw;
              font-weight: bold;
            }
    
            .contents-wrapper {
              ${sizes.free('60%', '35%')}
              box-shadow: 0 0 ${0.521 * 1.778}vw ${0.052 * 1.778}vw var(--grey-dark);
            }
          }

          @media (max-width: 599px) {
            h1 {
              margin-bottom: 40px;
              font-size: 40px;
            }

            p {
              font-size: 16px;
              text-align: center;
            }

            .contents-wrapper {
              border-radius: 7px;
              padding: 20px;
              ${sizes.free('90%', '50%')}
              box-shadow: 0 0 10px 1px var(--grey-dark);
            }
          }
        }
      `}
    >
      <div className="contents-wrapper">
        <h1>Progress</h1>
        <p>{`${statusText(status, additionalString)} (${count}/${total})`}</p>
      </div>
    </article>
  );
};

export default Progress;
