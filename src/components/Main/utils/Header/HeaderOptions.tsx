import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { sizes } from '../../../../styles';
import { optionsStyle } from '../../styles/HeaderStyles';
import { StyleSet } from '../../../../custom_modules/commonUtils';

// props 타입 설정 필요
const HeaderOptions = ({ setStates, states, components }: any) => {
  const {
    dispatch,
    modalOriginCreator,
    modalStateCreator,
    balloonStateCreator,
    modalState,
  } = setStates;
  const {
    selectedBtn,
    optionRef,
    isMobile,
  } = states;
  const [
    searchBar,
    memStat
  ] = components;
  return (
    <>
      <button
        css={css`${optionsStyle({ sizes } as StyleSet)}`}
        onClick={() => {
          dispatch(
            modalOriginCreator(
              selectedBtn.current === optionRef.current ? 'Header_Option' : 'Header_MemInfo'
            )
          );
          if (!modalState) {
            dispatch(modalStateCreator(true));
            dispatch(balloonStateCreator('none'));
          } else {
            dispatch(modalStateCreator(false));
          }
        }}
      >
        {selectedBtn.current === optionRef.current ? '라이브러리 추가' : '회원정보 관리'}
      </button>
      {
        isMobile
          ?
            selectedBtn.current === optionRef.current
              ? searchBar
              : memStat
          :
            ''
      }
    </>
  )
};

export default HeaderOptions;