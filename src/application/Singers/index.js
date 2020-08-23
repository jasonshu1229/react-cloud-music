import React, { useState } from 'react';
import Horizen from '../../baseUI/horizen-item';
import { categoryTypes, alphaTypes } from '../../api/config';
import { NavContainer } from './style';

// item 样式随当前索引值变化 
function Singers (props) {

  let [category, setCategory] = useState('');;
  let [alpha, setAlpha] = useState('');

  let handleUpdateAlpha = (val) => {
    setAlpha (val);  // "A" "B"
  }
  let handleUpdateCatetory = (val) => {
    setCategory (val); // 1001 1002
  }

  return (
    <NavContainer>
      <Horizen 
        list={categoryTypes} 
        title={"分类（默认热门）:"}
        handleClick={handleUpdateCatetory}
        oldVal={category}
        ></Horizen>
      <Horizen 
        list={alphaTypes} 
        title={"首字母:"}
        handleClick={val => handleUpdateAlpha(val)}
        oldVal={alpha}
        ></Horizen>
    </NavContainer>
  )
}

export default React.memo(Singers);