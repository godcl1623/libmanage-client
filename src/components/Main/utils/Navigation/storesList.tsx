/* eslint-disable no-else-return */
import React, { useState, useEffect, useRef } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { sizes } from '../../../../styles';
import { storesListStyle } from '../../styles/NavStyles';
import { StyleSet } from '../../../../custom_modules/commonUtils';
// eslint-disable-next-line import/no-relative-packages
import cloneDnd, { DropOption } from '../../../../clone-dnd';
import { useAppSelector } from '../../../../slices';
import { decryptor } from '../../../../custom_modules/aeser';

type FindCategory = HTMLElement | ((param: HTMLElement) => HTMLElement) | undefined;
// 터치 사용

type CoordsObject = Record<string, number>; // 터치 사용

type MoveResIdxs = {
  originalLists: (HTMLElement | null)[];
  insertCrit: number;
  tgtIdx: number;
  direction: string;
}; // 터치 사용

function findCategory(ele: HTMLElement, findTgt: string): FindCategory {
  if (ele.classList.contains(findTgt)) {
    return ele;
  } else if (ele.parentElement) {
    return findCategory(ele.parentElement, findTgt);
  }
} // 터치 사용

function sumAfterParse(...args: string[]): any {
  return args
    .map((size: string) => parseInt(size, 10))
    .reduce((init: number, add: number) => init + add, 0);
} // 터치 사용

function returnMoveRes(moveResIdxs: MoveResIdxs): string[] {
  const { originalLists, insertCrit, tgtIdx, direction } = moveResIdxs;
  const front = originalLists.slice(0, insertCrit);
  const back = originalLists.slice(insertCrit);
  const moveItem =
    direction === 'down'
      ? front.splice(front.indexOf(originalLists[tgtIdx]), 1)[0]
      : back.splice(back.indexOf(originalLists[tgtIdx]), 1)[0];
  back.unshift(moveItem);
  return [...front, ...back].map(ele => (ele as HTMLElement).classList[1]);
} // 터치 사용

// props 타입 설정 필요
const StoresList = ({ props }: any) => {
  const {
    selectedCategory,
    storesList,
    dispatch,
    selectedStoresCreator,
    dragRef,
    dragInfo,
    makeDraggable,
    updateDropRes
  } = props;
  const { userState, catDropResult, isReorderActivated } = useAppSelector(
    state => state.sliceReducers
  );
  const [currentHover, setCurrentHover] = useState<HTMLElement>();
  const [dragStartEle, setDragStartEle] = useState<HTMLElement>();
  const [listState, setListState] = useState<string | string[]>('');
  const originalList = useRef<string | string[]>('');
  const originalTouchElement = useRef<HTMLElement | null>(null); // 터치 사용 - 파라미터로
  const clonedElement = useRef<HTMLElement | null>(null); // 터치 사용 - 반환 값으로
  const originalTopCoord = useRef<number>(0); // 터치 사용 - 내부
  const originalProcCoords = useRef<CoordsObject>({}); // 터치 사용 - 내부
  const endTopCoord = useRef<number>(0); // 터치 사용 - 내부
  const fooRef = useRef<number[] | null>(null); // 터치 사용 - 내부
  const game = 'game';
  const music = 'music';
  const series = 'series';
  const movie = 'movie';
  const storagedList =
    localStorage.length !== 0
      ? JSON.parse(decryptor(localStorage.getItem('frog'), process.env.REACT_APP_TRACER as string))
          .customCatOrder
      : null;
  const userSetList =
    storagedList === userState.customCatOrder ? userState.customCatOrder : storagedList;
  const { useDropClone, useTouchDnd } = cloneDnd;
  const dropOption: DropOption = {
    currentItemCategory: {
      level0: ['nav_category']
    },
    applyToChildren: false
  };
  const [dropRef, dropInfo] = useDropClone(dropOption);
  function handleDragStart(event: React.MouseEvent) {
    setCurrentHover(event.target as HTMLElement);
    setDragStartEle(event.target as HTMLElement);
  }
  const [makeTouchTgtClone, trackClonedTgt, highlightDragItem] = useTouchDnd();
  function handleTouchStart(event: React.TouchEvent): void {
    if (isReorderActivated) {
      if (event.target !== dropRef.current) {
        const touchTgt = findCategory(event.target as HTMLElement, 'category') as HTMLElement;
        makeTouchTgtClone(event, touchTgt, dropRef.current);
      }
    }
  }
  function handleTouchMove(event: React.TouchEvent): void {
    if (isReorderActivated) {
      if (event.target !== dropRef.current) {
        trackClonedTgt(event);
        highlightDragItem(event, dropRef.current)
      }
    }
  }
  useEffect(() => {
    let currentList: string | string[] = '';
    if (!userState.customCatOrder || userState.customCatOrder === 'default') {
      currentList = [game, music, series, movie];
    } else {
      currentList = userSetList;
    }
    setListState(currentList);
    originalList.current = currentList;
  }, [userState.customCatOrder]);
  useEffect(() => {
    if (isReorderActivated) {
      makeDraggable(true);
    } else {
      makeDraggable(false);
      if (catDropResult[0] === 'cancel') {
        setListState(originalList.current);
      }
    }
  }, [isReorderActivated, catDropResult]);
  // params 타입 설정 필요
  const displayMenu = React.useCallback(
    (category: string, ...params: any[]) => {
      const inputArr = typeof params[0] !== 'string' ? params[0] : params[0].split(',');
      return inputArr.map((param: any, index: number) => {
        const categoryVal = typeof param !== 'string' ? param.props.children.toLowerCase() : param;
        const eachCategoriesStores = storesList[categoryVal];
        const heading = param.charAt(0).toUpperCase() + param.slice(1);
        if (eachCategoriesStores !== undefined) {
          return (
            <div
              key={`category ${index}`}
              className={`category ${categoryVal} all`}
              css={css`
                ${storesListStyle({ sizes } as StyleSet)}
                display: ${category === categoryVal || category === 'all' ? 'block' : 'none'};
              `}
            >
              <div key={`category-header ${index}`} className="category-header">
                <h2>{heading}</h2>
                <button
                  className="select-all-btn"
                  onClick={e => {
                    dispatch(selectedStoresCreator('all'));
                  }}
                  css={css`
                    pointer-events: ${isReorderActivated ? 'none' : 'auto'};
                  `}
                >
                  ALL
                </button>
              </div>
              {
                // store 타입 설정 필요
                eachCategoriesStores.map((store: any) => (
                  <p
                    key={store}
                    className="store-list-item"
                    onClick={e => {
                      dispatch(selectedStoresCreator(store));
                    }}
                    css={css`
                      pointer-events: ${isReorderActivated ? 'none' : 'auto'};
                    `}
                  >
                    - {[store[0].toUpperCase()].concat(store.slice(1, store.length))}
                  </p>
                ))
              }
            </div>
          );
          // eslint-disable-next-line no-else-return
        } else {
          return (
            <div
              key={`category ${index}`}
              className={`category ${categoryVal} all`}
              css={css`
                display: ${category === categoryVal || category === 'all' ? 'block' : 'none'};
              `}
            >
              <div key={`category-header ${index}`} className="category-header">
                <h2>{heading}</h2>
              </div>
            </div>
          );
        }
      });
    },
    [listState]
  );

  const reorderList = (e: React.DragEvent): void => {
    const dragTgt = dragStartEle as HTMLElement;
    const parent = dragTgt.parentNode as HTMLElement;
    const originalLists: HTMLElement[] = Array.from(parent.children) as HTMLElement[];
    const list = Array.from(parent.childNodes);
    const currentIdx = list.indexOf(dragTgt);
    const { startEleInfo, startCoords } = dragInfo;
    const { dropEleInfo, dropCoords } = dropInfo;
    const computedStyle = window.getComputedStyle(dragTgt);
    const targetMargin =
      parseInt(computedStyle.marginTop, 10) + parseInt(computedStyle.marginBottom, 10);
    if (dropEleInfo) {
      const targetHeight = startEleInfo.height;
      const minNextEleTop = targetMargin + targetHeight;
      const targetMovedDistance = dropCoords.clientY - startCoords.clientY;
      if (targetMovedDistance > minNextEleTop) {
        const distanceToIdx = Math.floor(targetMovedDistance / minNextEleTop);
        const idxToAdd = distanceToIdx >= list.length ? list.length - 1 : distanceToIdx;
        const insertCrit =
          currentIdx + idxToAdd + 1 > list.length ? list.length : currentIdx + idxToAdd + 1;
        const result = returnMoveRes({
          originalLists,
          insertCrit,
          tgtIdx: currentIdx,
          direction: 'down'
        });
        setListState(result);
        dispatch(updateDropRes(result));
      } else if (targetMovedDistance * -1 > minNextEleTop) {
        const distanceToIdx = Math.floor((targetMovedDistance * -1) / minNextEleTop);
        const idxToSub = distanceToIdx >= list.length ? list.length - 1 : distanceToIdx;
        const insertCrit = currentIdx - idxToSub <= 0 ? 0 : currentIdx - idxToSub;
        const result = returnMoveRes({
          originalLists,
          insertCrit,
          tgtIdx: currentIdx,
          direction: 'up'
        });
        setListState(result);
        dispatch(updateDropRes(result));
      }
      list.forEach(ele => {
        (ele as HTMLElement).style.boxShadow = 'none';
      });
    }
  };

  const dragHighlighter = (e: React.DragEvent): void => {
    const HTMLEventTarget = e.target! as HTMLElement;
    if (HTMLEventTarget.className === 'category-header') {
      const enterTargetRect = HTMLEventTarget.getBoundingClientRect();
      const enterTargetMiddle = Math.floor((enterTargetRect.top + enterTargetRect.bottom) / 2);
      const parent = HTMLEventTarget.parentElement as HTMLElement;
      const gParent = parent.parentElement as HTMLElement;
      const gpList = Array.from(gParent.children);
      if (parent === currentHover) {
        if (e.clientY - enterTargetMiddle < 0) {
          currentHover.style.boxShadow = '0 -10px 20px skyblue';
          currentHover.style.transition = 'all 0.3s';
        } else {
          currentHover.style.boxShadow = '0 10px 20px skyblue';
        }
      } else {
        setCurrentHover(parent);
      }
      gpList.forEach(cnt => {
        if (cnt !== currentHover) {
          (cnt as HTMLElement).style.boxShadow = 'none';
        }
      });
    }
  };

  return (
    <div
      id="drop-container"
      css={css`
        height: 100%;
        padding-top: var(--gap-standard);
        touch-action: none;

        @media (max-width: 599px) {
          height: max-content;
        }
      `}
      ref={ref => {
        dropRef.current = ref;
        dragRef.current = ref;
      }}
      onDragStart={handleDragStart}
      onDragEnter={dragHighlighter}
      onDrop={reorderList}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={e => {
        if (isReorderActivated) {
          if (e.target !== dropRef.current) {
            clonedElement.current!.remove();
            clonedElement.current = null;
            const originalLists: (HTMLElement | null)[] = Array.from(dropRef.current.children);
            originalLists.forEach(ele => {
              ele!.style.boxShadow = 'none';
            });
            const tgtIdx: number = originalLists.indexOf(originalTouchElement.current);
            const touchTgtMovedDistance: number = originalTopCoord.current - endTopCoord.current;
            let distanceToIdx: number = 0;
            let insertCrit: number = 0;
            if (touchTgtMovedDistance < 0) {
              distanceToIdx = Math.floor((touchTgtMovedDistance * -1) / fooRef.current![0]);
              const idxToAdd: number =
                distanceToIdx >= originalLists.length - 1
                  ? originalLists.length - 1
                  : distanceToIdx;
              insertCrit =
                tgtIdx + idxToAdd + 1 > originalLists.length - 1
                  ? originalLists.length
                  : tgtIdx + idxToAdd + 1;
              const result = returnMoveRes({
                originalLists,
                insertCrit,
                tgtIdx,
                direction: 'down'
              });
              setListState(result);
              dispatch(updateDropRes(result));
            } else if (touchTgtMovedDistance > 0) {
              distanceToIdx = Math.floor(touchTgtMovedDistance / fooRef.current![0]);
              const idxToSub: number =
                distanceToIdx >= originalLists.length - 1
                  ? originalLists.length - 1
                  : distanceToIdx;
              insertCrit = tgtIdx - idxToSub <= 0 ? 0 : tgtIdx - idxToSub;
              const result = returnMoveRes({ originalLists, insertCrit, tgtIdx, direction: 'up' });
              setListState(result);
              dispatch(updateDropRes(result));
            }
          }
        }
      }}
    >
      {displayMenu(selectedCategory, listState)}
    </div>
  );
};

export default StoresList;
