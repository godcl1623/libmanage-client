/* eslint-disable no-else-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Header from './Header';
import Library from './Library';
import Meta from './Meta';
import Navigation from './Navigation';
import Modal from '../Modal/Modal';
import MemberInfoWrap from '../Member/MemberInfoWrap';
import {
  loginStatusCreator,
  userStateCreator,
  balloonStateCreator,
  comparisonStateCreator,
  modalStateCreator,
  selectedItemDataCreator
} from '../../actions';
import { sendTo } from '../../custom_modules/address';
import { sizes, flex, border } from '../../styles';

const modalOption = origin => ({
  position: 'absolute',
  width: origin !== 'Header_MemInfo' ? '50%' : '45%',
  height: origin !== 'Header_MemInfo' ? '50%' : '85%',
  background: 'white',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '2'
});

const modalContents = (...args) => {
  const [
    state,
    dispatch,
    setState1,
    setState2,
    origin,
    setLibs,
    setItem
  ] = args;
  if (origin === 'Header_Option') {
    // 모든 스토어에 대응 가능하도록 개선 필요
    if (
      state.stores === undefined ||
      state.stores.game === undefined ||
      state.stores.game.steam === false
    ) {
      return (
        <article>
          <h2>스토어 목록</h2>
          <hr />
          <section className="store_container">
            <h3>스팀</h3>
            <a
              // href="http://localhost:3003/auth/steam"
              // href="http://localhost:3001/auth/steam"
              href={`https://${sendTo}/auth/steam`}
              // target="_blank"
              // rel="noreferrer"
            >
              스팀으로 로그인
            </a>
          </section>
        </article>
      );
      // eslint-disable-next-line no-else-return
    } else {
      return (
        <article>
          <h2>스토어 목록</h2>
          <hr />
          <section className="store_container">
            <h3>스팀</h3>
            <button
              onClick={e => {
                const temp = state;
                temp.stores.game.steam = false;
                // 반영을 위해서는 comparisonState 변경이 필요
                axios
                .post(
                  // 'http://localhost:3003/disconnect',
                  // 'http://localhost:3001/disconnect',
                  `https://${sendTo}/disconnect`,
                  { reqUserInfo: JSON.stringify(temp) },
                  { withCredentials: true }
                  )
                  .then(res => {
                    if (res) {
                      dispatch(setState2(false));
                      setLibs('');
                      dispatch(setItem({}));
                      dispatch(setState1(temp));
                    }
                  });
              }}
            >
              연동 해제
            </button>
          </section>
        </article>
      );
    }
  } else if (origin === 'Header_MemInfo') {
    return <MemberInfoWrap />;
  }
  return (
    <article
      style={{
        pointerEvents: 'none'
      }}
    >
      <h1>Loading...</h1>
    </article>
  );
};

const Main = () => {
  const loginStatus = useSelector(state => state.loginStatus);
  const logoutClicked = useSelector(state => state.logoutClicked);
  const balloonState = useSelector(state => state.balloonState);
  const userState = useSelector(state => state.userState);
  const comparisonState = useSelector(state => state.comparisonState);
  const selectedItem = useSelector(state => state.selectedItem);
  const selectedItemData = useSelector(state => state.selectedItemData);
  const modalOrigin = useSelector(state => state.modalOrigin);
  const modalState = useSelector(state => state.modalState);
  const [storesList, setStoresList] = useState('');
  const [userLibrary, setUserLibrary] = useState('');
  const [headerHeight, setHeaderHeight] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const headerRef = React.useRef();

  useEffect(() => {
    // const abortCon = new AbortController();
    const checkLogin = async () => {
      const message = {
        comparisonState,
        million: localStorage.getItem('frog')
      };
      await axios
        .post(
          // 'http://localhost:3002/check_login',
          // 'http://localhost:3001/check_login',
          `https://${sendTo}/check_login`,
          // { message: comparisonState },
          { message },
          { withCredentials: true }
        )
        .then(res => {
          if (res.data.isLoginSuccessful) {
            if (!res.data.isGuest) {
              dispatch(loginStatusCreator(res.data.isLoginSuccessful));
              if (userState.nickname === undefined) {
                dispatch(userStateCreator(res.data));
                dispatch(comparisonStateCreator(''));
              } else if (userState.stores.game.steam !== res.data.stores.game.steam) {
                dispatch(userStateCreator(res.data));
              }
            } else {
              dispatch(loginStatusCreator(res.data.isLoginSuccessful));
              if (userState.nickname === undefined) {
                dispatch(userStateCreator(res.data));
                dispatch(comparisonStateCreator(''));
              } else if (userState.stores.game.steam !== res.data.stores.game.steam) {
                dispatch(userStateCreator(res.data));
              }
            }
          } else if (res.data === 'session_expired' || res.data === 'check_failed') {
            (() =>
              new Promise(resolve => {
                localStorage.removeItem('frog');
                localStorage.removeItem('flies');
                if (!localStorage.getItem('frog')) {
                  resolve(true);
                }
              }).then(res => {
                if (res) {
                  alert('로그인이 필요합니다');
                  history.push('/');
                }
              }))();
          } else if (res.data === 'no_sessions') {
            alert('로그인이 필요합니다');
            history.push('/');
          }
        })
        .catch(err => console.log(err));
    };
    if (comparisonState !== '') {
      checkLogin();
    }
    checkLogin();
    // return () => {
    //   abortCon.abort();
    // }
  }, [comparisonState]);

  useEffect(() => {
    const abortCon = new AbortController();
    const { stores } = userState;
    if (stores !== undefined) {
      const categories = Object.keys(stores);
      const eachStoresOfCategories = categories.map(ele => Object.keys(stores[ele]));
      const eachStatusOfStoresOfCategories = categories.map(ele => Object.values(stores[ele]));
      const activatedStores = eachStatusOfStoresOfCategories.map(storeStat =>
        storeStat.map((ele, index) => (ele === true ? index : '')).filter(ele => ele !== '')
      );
      const storesToDisplay = activatedStores.map((status, index) =>
        status.map(iTrue => eachStoresOfCategories[index][iTrue])
      );
      // setStoresList(storesToDisplay);
      const testObj = {};
      categories.forEach((category, index) => {
        if (storesToDisplay[index] !== undefined) {
          testObj[category] = storesToDisplay[index];
        } else {
          testObj[category] = 'foo';
        }
      });
      setStoresList(testObj);
    }
    return () => {
      abortCon.abort();
    };
  }, [userState.stores]);

  useEffect(() => {
    const abortCon = new AbortController();
    const dataToSend = {
      reqUser: userState.nickname,
      // 임시로 작업 - 모든 카테고리 및 모든 스토어에 대응할 수 있도록 수정 필요
      reqLibs: storesList.game
    };
    if (dataToSend.reqLibs !== '') {
      axios
        // .post('http://localhost:3003/get/db', { reqData: dataToSend }, { withCredentials: true })
        // .post('http://localhost:3001/get/db', { reqData: dataToSend }, { withCredentials: true })
        .post(`https://${sendTo}/get/db`, { reqData: dataToSend }, { withCredentials: true })
        .then(res => {
          // 임시로 작업 - 모든 카테고리 및 모든 스토어에 대응할 수 있도록 수정 필요
          if (res.data !== 'no_result') {
            setUserLibrary({ steam: res.data });
          }
        });
      // .catch(err => alert(err));
    }
    return () => {
      abortCon.abort();
    };
  }, [storesList]);

  useEffect(() => {
    const abortCon = new AbortController();
    if (selectedItemData.name) {
      if (selectedItem !== selectedItemData.name) {
        dispatch(modalStateCreator(true));
      } else {
        dispatch(modalStateCreator(false));
      }
    } else if (selectedItem) {
      dispatch(modalStateCreator(true));
    }
    return () => {
      abortCon.abort();
    };
  }, [selectedItem, selectedItemData]);

  if (loginStatus === false && logoutClicked === false) {
    return <></>;
  }

  return (
    <>
      <main
        id="main"
        css={css`
          ${sizes.free('100%', '100vh')}
          ${flex.vertical}
          pointer-events: ${modalState && modalOrigin === 'Library' ? 'none' : 'auto'};
          z-index: 1;
          position: relative;
          overflow: hidden;

          * {
            // ${border}
          }
        `}
        onClick={e => {
          // e.preventDefault();
          if (balloonState !== 'none' && e.target.id === 'balloon') {
            dispatch(balloonStateCreator('none'));
          }
        }}
      >
        <Header headerRef={headerRef} setHeight={setHeaderHeight} />
        <div
          id="main-contents"
          css={css`
            ${sizes.free('100%', `calc(100% - ${headerHeight}px)`)}
            ${flex.horizontal}
          `}
        >
          <Navigation storesList={storesList} />
          <Library userLib={userLibrary} />
          <Meta />
        </div>
      </main>
      <Modal
        style={modalOption(modalOrigin)}
        contents={() =>
          modalContents(
            userState,
            dispatch,
            comparisonStateCreator,
            modalStateCreator,
            modalOrigin,
            setUserLibrary,
            selectedItemDataCreator
          )
        }
        origin={modalOrigin}
      />
    </>
  );
};

export default Main;
