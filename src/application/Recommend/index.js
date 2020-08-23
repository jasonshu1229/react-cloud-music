import React, { useEffect } from 'react';
import Slider from '../../components/slider'
import RecommendList from '../../components/list';
import Scroll from '../../baseUI/scroll/index';
import { Content } from './style';
import { connect } from 'react-redux';
import * as actionTypes from './store/actionCreators';
// 引入 forceCheck 方法 配合懒加载 插件 实现滑动列表 加载相应的图片
import { forceCheck } from 'react-lazyload';

function Recommend (props) {

  // 从 store中的 reducer 获取公共状态
  const { bannerList, recommendList } = props;

  // 从 store中的 reducer 获取 异步处理函数
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

  useEffect(() => {
    getBannerDataDispatch();
    getRecommendListDataDispatch();
  }, [])

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];


  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
    </Content>
  )
}

// 映射 Redux 全局的 state 到 Recommend组件的 props 上
const mapStateToProps = (state) => ({
  // 不要在这里将数据 toJS
  // 不然每次 diff对比 props的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList'])
})

// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      dispatch (actionTypes.getBannerList ());
    },
    getRecommendListDataDispatch () {
      dispatch (actionTypes.getRecommendList ());
    },
  }
}

// 将ui 组件包装成容器组件
export default connect (mapStateToProps, mapDispatchToProps)(React.memo(Recommend));