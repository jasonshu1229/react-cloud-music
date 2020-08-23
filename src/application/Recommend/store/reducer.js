import * as actionTypes from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  bannerList: [],
  recommendList: [],
});


//  将 store reducer中的公共状态传给 ui组件 - Recommend
export default (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.CHANGE_BANNER:
      return state.set('bannerList', action.data);
    case actionTypes.CHANGE_RECOMMEND_LIST: 
      return state.set('recommendList', action.data);
    default:
      return state;
  }
}

