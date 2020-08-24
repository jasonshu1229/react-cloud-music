import * as actionTypes from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  bannerList: [],
  recommendList: [],
  enterLoading: true, // 定义出场动画 状态
});


//  将 store reducer中的公共状态传给 ui组件 - Recommend
export default (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.CHANGE_BANNER:
      return state.set('bannerList', action.data); // action： {type: "recommend/CHANGE_BANNER", data: List}
    case actionTypes.CHANGE_RECOMMEND_LIST: 
      return state.set('recommendList', action.data); // action： {type: "recommend/RECOMMEND_LIST", data: List}
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.data)  // action {type: "recommend/CHANGE_BANNER", data: List}
    default:
      return state;
  }
}

