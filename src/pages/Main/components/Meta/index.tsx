import { useState, useEffect, Fragment, ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { AiOutlineZoomIn } from 'react-icons/ai';
import { border, flex, sizes } from 'styles';
import { esrb, pegi, ratings } from 'custom_modules/imgurls';
import { StyleSet } from 'custom_modules/commonUtils';
import {
  useAppDispatch,
  useAppSelector,
  setModalState,
  setModalOrigin,
  setSelMediaId,
  setSelMediaList
} from 'slices';
import MakeMediaList from './components/MakeMediaList';
import ToBack from './components/ToBack';
import AgeRatingDistributor from './components/AgeRatingDistributor';
import { metaStyle } from './styles/metaStyles';

type PropsType = {
  portrait: boolean;
  heights: any;
};

const Meta = ({ portrait, heights }: PropsType) => {
  const selectedItemData = useAppSelector(state => state.sliceReducers.selectedItemData);
  const isMobile = useAppSelector(state => state.sliceReducers.isMobile);
  const [selectedMedia, setSelectedMedia] = useState('screenshots');
  const [isSpread, setIsSpread] = useState(false);
  const [showStat, setShowStat] = useState(false);
  const appDispatch = useAppDispatch();
  const location = useLocation();
  const {
    artworks,
    covers,
    collections,
    genres,
    player_perspectives: perspectives,
    platforms,
    game_modes: modes,
    game_videos: videos,
    age_ratings: ages,
    release_dates: release,
    themes,
    screenshots,
    involved_companies: companies,
    websites,
    name,
    summary,
    totalRating
  } = selectedItemData;
  const metaScore = !totalRating ? 0 : totalRating;

  const titles = [
    '시리즈',
    '장르',
    '시점',
    '게임 모드',
    '테마',
    '플랫폼',
    '출시일',
    '개발사 등',
    '관련 링크'
  ];

  const titleVals = [
    collections,
    genres,
    perspectives,
    modes,
    themes,
    platforms,
    release,
    companies,
    websites
  ];

  const websitesCategory = [
    '공식 사이트',
    'Wikia',
    'Wikipedia',
    'Facebook',
    'Twitter',
    'Twitch',
    'Instagram',
    'Youtube',
    'iPhone',
    'iPad',
    'Android',
    'Steam',
    'Reddit',
    'itch',
    'EpicGames',
    'GoG',
    'Discord'
  ];

  useEffect(() => {
    if (location.pathname !== '/offline' || !navigator.onLine) {
      if (selectedItemData.name !== undefined) {
        appDispatch(setModalState(false));
      }
    }
  }, [selectedItemData]);

  useEffect(() => {
    if (selectedItemData.name !== undefined) {
      if (selectedMedia === 'screenshots') {
        appDispatch(setSelMediaList(screenshots));
      } else if (selectedMedia === 'videos') {
        appDispatch(setSelMediaList(videos));
      } else if (selectedMedia === 'artworks') {
        appDispatch(setSelMediaList(artworks));
      }
    }
  }, [selectedMedia, selectedItemData]);

  if (selectedItemData.name === undefined) {
    return (
      <article
        id="meta_blank"
        css={css`
          ${metaStyle({ flex, sizes, border } as StyleSet, {
            metaScore,
            selectedMedia,
            selectedItemData
          })}
        `}
      ></article>
    );
  }

  return (
    <article
      id="meta"
      css={css`
        ${metaStyle({ flex, sizes, border } as StyleSet, {
          metaScore,
          selectedMedia,
          selectedItemData
        })}
      `}
    >
      <img
        id="background-cover"
        src={
          selectedItemData.covers
            ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${covers}.png`
            : ''
        }
        alt="cover-background"
      />
      <article className="meta-wrapper-top">
        <div className="meta-wrapper-ratings">
          <img
            id="game-cover"
            src={
              selectedItemData.covers
                ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${covers}.png`
                : ''
            }
            alt="game-cover"
          />
          <div id="title-and-numerical">
            <h2>{name}</h2>
            <div id="numerical-data">
              <div id="game-scores">
                <div className="donut-boundary instalment1">
                  <div className="donut-outline"></div>
                  <div className="donut-graph-border"></div>
                  <div className="donut-text">
                    <h3>{selectedItemData.totalRating ? parseInt(metaScore, 10) : 'N/A'}</h3>
                  </div>
                  <div className="donut-case"></div>
                </div>
              </div>
              <div id="age-rating-wrapper">
                <div id="rating-imgs">
                  {ages ? <AgeRatingDistributor ages={ages} props={{ esrb, pegi, ratings }} /> : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
        <article className="meta-wrapper-contents">
          <p id="summary-container">
            {isSpread ? (
              <>
                {summary
                  .replace(/\n/g, '\n\n')
                  .replace(/\n\n\n/g, '\n\n')
                  .split('\n')
                  .map((line: any, idx: number) =>
                    line.length !== 0 ? line : <br key={`br ${idx + 1}`} />
                  )}
                <br />
                <button
                  id="read-less"
                  onClick={e => {
                    e.preventDefault();
                    setIsSpread(false);
                  }}
                >
                  접기
                </button>
              </>
            ) : (
              <>
                {Array.from(summary).slice(0, 430).concat(['... ']).join('')}
                <button
                  id="read-more"
                  onClick={e => {
                    e.preventDefault();
                    setIsSpread(true);
                  }}
                >
                  더 보기
                </button>
              </>
            )}
          </p>
          <article className="meta-wrapper-contents-media">
            <div className="media-contents-wrapper">
              <div className="media-tabs">
                <button
                  onClick={e => {
                    e.preventDefault();
                    setSelectedMedia('screenshots');
                  }}
                >
                  스크린샷 ({selectedItemData.screenshots ? screenshots.length : 0})
                </button>
                <button
                  onClick={e => {
                    e.preventDefault();
                    setSelectedMedia('videos');
                  }}
                >
                  동영상 ({videos ? videos.length : 0})
                </button>
                <button
                  onClick={e => {
                    e.preventDefault();
                    setSelectedMedia('artworks');
                  }}
                >
                  기타 ({selectedItemData.artworks ? artworks.length : 0})
                </button>
              </div>
              <div className="media-contents">
                <MakeMediaList
                  props={{
                    selectedMedia,
                    selectedItemData,
                    setShowStat,
                    showStat,
                    dispatch: appDispatch,
                    modalStateCreator: setModalState,
                    modalOriginCreator: setModalOrigin,
                    selectedMediaIdCreator: setSelMediaId,
                    AiOutlineZoomIn
                  }}
                />
              </div>
            </div>
          </article>
          <article className="meta-wrapper-contents-info">
            <div id="grid-table">
              {titleVals.map((vals, idx) => {
                let result: ReactElement | null = null;
                if (titles[idx] === '출시일') {
                  let releaseCheckList: Record<string, boolean> = {};
                  vals.slice().sort((prev: any, next: any) =>
                    prev.platform_name[0] < next.platform_name[0] ? -1 : 1
                  );
                  result = (
                    <Fragment key={`frag-${titles[idx]}`}>
                      <div key={`${titles[idx]}-title-${idx + 1}`} className="table-title">
                        {titles[idx]}
                      </div>
                      <div key={`${titles[idx]}-value-${idx + 1}`} className="sub-table">
                        {vals.map((val: any, subidx: number) => {
                          let res: ReactElement | null = null;
                          if (releaseCheckList[val.platform_name] !== true) {
                            releaseCheckList[val.platform_name] = true;
                            res = (
                              <Fragment key={`release_info-${subidx + 1}`}>
                                <div
                                  key={`release_platform_name-${subidx + 1}`}
                                  className="table-sub-title"
                                >
                                  {val.platform_name}
                                </div>
                                <div key={`date-${subidx + 1}`} className="table-sub-contents">
                                  {val.human}
                                </div>
                              </Fragment>
                            );
                          }
                          if (subidx === vals.length - 1) {
                            releaseCheckList = {};
                          }
                          return res;
                        })}
                      </div>
                    </Fragment>
                  );
                } else if (titles[idx] === '개발사 등') {
                  vals.slice().reverse();

                  result = (
                    <Fragment key={`frag-${titles[idx]}`}>
                      <div key={`${titles[idx]}-title-${idx + 1}`} className="table-title">
                        {titles[idx]}
                      </div>
                      <div key={`${titles[idx]}-ext_cont-${idx + 1}`} id="sub-table-container">
                        <div key={`${titles[idx]}-inn_cont_1-${idx + 1}`} className="sub-table">
                          <div key={`dev-${idx + 1}`} className="table-sub-title">
                            개발사
                          </div>
                          {
                            vals.filter((val: any) => val.developer === true).length !== 0 ? (
                              vals.filter((val: any) => val.developer === true).length === 1 ? (
                                vals.map((val: any, subidx: number) => {
                                  let res: ReactElement | null = null;
                                  if (val.developer === true) {
                                    res = (
                                      <div
                                        key={`dev_comp-${subidx + 1}`}
                                        className="table-sub-contents"
                                      >
                                        {val.company_name}
                                      </div>
                                    );
                                  }
                                  return res;
                                })
                              ) : (
                                <div key={`dev_comp_cont-${idx + 1}`}>
                                  {
                                    vals.map((val: any, subidx: number) => {
                                      let res: ReactElement | null = null;
                                      if (val.developer === true) {
                                        res = (
                                          <div
                                            key={`dev_comp-${subidx + 1}`}
                                            className="table-sub-contents"
                                          >
                                            {val.company_name}
                                          </div>
                                        );
                                      }
                                      return res;
                                    })
                                  }
                                </div>
                              )
                            ) : (
                              <div key={`dev_comp-${idx + 1}`} className="table-sub-contents">
                                N/A
                              </div>
                            )
                          }
                        </div>
                        <div key={`${titles[idx]}-inn_cont_2-${idx + 1}`} className="sub-table">
                          <div key={`prod-${idx + 1}`} className="table-sub-title">
                            배급사
                          </div>
                          {
                            vals.filter((val: any) => val.publisher === true).length !== 0 ? (
                              vals.filter((val: any) => val.publisher === true).length === 1 ? (
                                vals.map((val: any, subidx: number) => {
                                  let res: ReactElement | null = null;
                                  if (val.publisher === true) {
                                    res = (
                                      <div
                                        key={`prod_comp-${subidx + 1}`}
                                        className="table-sub-contents"
                                      >
                                        {val.company_name}
                                      </div>
                                    );
                                  }
                                  return res;
                                })
                              ) : (
                                <div key={`prod_comp_cont-${idx + 1}`}>
                                  {vals.map((val: any, subidx: number) => {
                                    let res: ReactElement | null = null;
                                    if (val.publisher === true) {
                                      res = (
                                        <div
                                          key={`prod_comp-${subidx + 1}`}
                                          className="table-sub-contents"
                                        >
                                          {val.company_name}
                                        </div>
                                      );
                                    }
                                    return res;
                                  })}
                                </div>
                              )
                            ) : (
                              <div key={`prod_comp-${idx + 1}`} className="table-sub-contents">
                                N/A
                              </div>
                            )
                          }
                        </div>
                      </div>
                    </Fragment>
                  );
                } else if (titles[idx] === '관련 링크') {
                  vals.slice().sort((prev: any, next: any) => (prev.category < next.category ? -1 : 1));
                  result = (
                    <Fragment key={`frag-${titles[idx]}`}>
                      <div key={`${titles[idx]}-title-${idx + 1}`} className="table-title">
                        {titles[idx]}
                      </div>
                      <div key={`${titles[idx]}-ext_cont-${idx + 1}`} className="sub-table">
                        {
                          vals.map((val: any, subidx: number) => {
                            let res: ReactElement | null = null;
                            const categoryIdx = val.category < 7 ? val.category : val.category - 1;
                            res = (
                              <Fragment key={`web_frag-${subidx + 1}`}>
                                <div key={`web_title-${subidx + 1}`} className="table-sub-title">
                                  {websitesCategory[categoryIdx - 1]}
                                </div>
                                <div key={`web_link-${subidx + 1}`} className="table-sub-contents">
                                  <a key={`link-${subidx + 1}`} href={val.url}>
                                    링크
                                  </a>
                                </div>
                              </Fragment>
                            );
                            return res;
                          })
                        }
                      </div>
                    </Fragment>
                  );
                } else {
                  result = (
                    <Fragment key={`frag-${titles[idx]}`}>
                      <div key={`${titles[idx]}-title-${idx + 1}`} className="table-title">
                        {titles[idx]}
                      </div>
                      <div key={`${titles[idx]}-val_wrap-${idx + 1}`} className="table-contents">
                        {
                          vals.map((val: any, subidx: number) => (
                            <div key={`${titles[idx]}-val-${subidx + 1}`}>{val}</div>
                          ))
                        }
                      </div>
                    </Fragment>
                  );
                }
                return result;
              })}
            </div>
          </article>
        </article>
      </article>
      {portrait || isMobile ? <ToBack heights={heights} /> : <></>}
    </article>
  );
};

export default Meta;
