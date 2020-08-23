import React, { useState } from 'react';
import Horizen from '../../baseUI/horizen-item';
import { categoryTypes, alphaTypes } from '../../api/config';
import { 
  NavContainer,
  ListContainer,
  List,
  ListItem,
} from "./style";
import Scroll from '../../baseUI/scroll';


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

  //mock 数据
  const singerList = [1, 2,3, 4,5,6,7,8,9,10,11,12].map (item => {
    return {
      picUrl: "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
      name: "张杰勇敢飞",
      accountId: 277313426,
    }
  }); 

  // 渲染函数，返回歌手列表
  const renderSingerList = () => {
    return (
      <List>
        {
          singerList.map ((item, index) => {
            return (
              <ListItem key={item.accountId+""+index}>
                <div className="img_wrapper">
                  <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
                </div>
                <span className="name">{item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  };

  return (
    <div>
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
      <ListContainer>
        <Scroll>
          {renderSingerList()}
        </Scroll>
      </ListContainer>
    </div>
  )
}

export default React.memo(Singers);