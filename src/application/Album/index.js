import React, {useState, useRef, useEffect} from 'react';
import { Container, TopDesc, Menu, SongList, SongItem } from './style';
import { CSSTransition } from 'react-transition-group';
import  Header  from './../../baseUI/header/index';
import Scroll from '../../baseUI/scroll/index';
import { getCount, isEmptyObject, getName } from '../../api/utils';
import style from "../../assets/global-style";
import { connect } from 'react-redux';
import { getAlbumList, changeEnterLoading } from './store/actionCreators';
import Loading from '../../baseUI/loading/index';

export const HEADER_HEIGHT = 45;

function Album (props) {
  const [showStatus, setShowStatus] = useState (true);
  const handleBack = () => {
    setShowStatus(false)
  }
  const [title, setTitle] = useState("歌单");
  const [isMarquee, setIsMarquee] = useState(false); // 是否跑马灯（文字滚动效果）
  const headerEl = useRef (); // 获取Header 组件

  // 从路由中拿到歌单的 id
  const id = props.match.params.id;
  const { currentAlbum: currentAlbumImmutable, enterLoading } = props;
  const { getAlbumDataDispatch } = props;

  // 在didMount 和 UpdateMount中 请求数据
  useEffect(() => {
    getAlbumDataDispatch(id);
  }, [getAlbumDataDispatch, id])

  // todo 实现 header内 文字滚动 走马灯的逻辑
  const handleScroll = (pos) => {
    let minScrollY = -HEADER_HEIGHT; // 滚动条最小的 纵坐标
    let percent = Math.abs (pos.y/minScrollY); // pos.y 滚动条的 纵轴坐标
    let headerDom = headerEl.current; // 通过 ref 获取header组件的 当时 dom元素
    // 滑过顶部的高度开始变化
    if (pos.y < minScrollY) {
      headerDom.style.backgroundColor = style["theme-color"];
      headerDom.style.opacity = Math.min (1, (percent-1)/2);
      setTitle (currentAlbum.name);
      setIsMarquee (true);
    } else {
      headerDom.style.backgroundColor = "";
      headerDom.style.opacity = 1;
      setTitle ("歌单");
      setIsMarquee (false);
    }
  };

  let currentAlbum = currentAlbumImmutable.toJS ();

  // 详情页顶部布局
  const renderTopDesc = () => {
    return (
      <TopDesc background={currentAlbum.coverImgUrl}>
        <div className="background">
          <div className="filter"></div>
        </div>
        <div className="img_wrapper">
          <div className="decorate"></div>
          <img src={currentAlbum.coverImgUrl} alt="" />
          <div className="play_count">
            <i className="iconfont play">&#xe885;</i>
            <span className="count">{getCount(currentAlbum.subscribedCount)}</span>
          </div>
        </div>
        <div className="desc_wrapper">
          <div className="title">{currentAlbum.name}</div>
          <div className="person">
            <div className="avatar">
              <img src={currentAlbum.creator.avatarUrl} alt="" />
            </div>
            <div className="name">{currentAlbum.creator.nickname}</div>
          </div>
        </div>
      </TopDesc>
    )
  }

  // 详情页 菜单栏布局
  const renderMenu = () => {
    return (
      <Menu>
        <div>
          <i className="iconfont">&#xe6ad;</i>
          评论
        </div>
        <div>
          <i className="iconfont">&#xe86f;</i>
          点赞
        </div>
        <div>
          <i className="iconfont">&#xe62d;</i>
          收藏
        </div>
        <div>
          <i className="iconfont">&#xe606;</i>
          更多
        </div>
      </Menu>
    )
  };

  // 详情页 歌曲列表布局
  const renderSongList = () => {
    return (
      <SongList>
        <div className="first_line">
          <div className="play_all">
            <i className="iconfont">&#xe6e3;</i>
            <span>播放全部 <span className="sum">(共{currentAlbum.tracks.length}首)</span></span>
          </div>
          <div className="add_list">
            <i className="iconfont">&#xe62d;</i>
            <span>收藏({getCount(currentAlbum.subscribedCount)})</span>
          </div>
        </div>
        <SongItem>
          {
            currentAlbum.tracks.map((item, index) => {
              return (
                <li key={index}>
                  <span className="index">{index + 1}</span>
                  <div className="info">
                    <span>{item.name}</span>
                    <span>
                      {getName(item.ar)} - {item.al.name}
                    </span>
                  </div>
                </li>
              )
            })
          }
        </SongItem>
      </SongList>
    )
  }

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={props.history.goBack} // 执行退出动画的时候， 跳转路由
    >
      <Container>
        < Header ref={headerEl} title={title}handleClick={handleBack} isMarquee={isMarquee}></Header>
        {
          !isEmptyObject(currentAlbum) ? (
            <Scroll
              bounceTop={false}
              onScroll={handleScroll}
            >
              <div>
                { renderTopDesc() }
                { renderMenu() }
                { renderSongList() }
              </div>
            </Scroll>
          ) : null
        }
       { enterLoading ? <Loading></Loading> : null}
      </Container>
    </CSSTransition>
  )
}


// 映射 redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  currentAlbum: state.getIn (['album', 'currentAlbum']),
  enterLoading: state.getIn (['album', 'enterLoading']),
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAlbumDataDispatch(id) {
      dispatch(getAlbumList(id));
      dispatch(changeEnterLoading(true));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (React.memo (Album));