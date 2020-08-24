import React, { useRef, useEffect, memo } from 'react';
import styled from 'styled-components';
import Scroll from '../scroll/index'
import { PropTypes } from 'prop-types'; // 检测数据类型
import style from '../../assets/global-style';

//样式部分
const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;
  >span:first-of-type{
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${style["font-size-m"]};
    vertical-align: middle;
  }
`

const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style["font-size-m"]};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected{
    color: ${style["theme-color"]};
    border: 1px solid ${style["theme-color"]};
    opacity: 0.8;
  }
`

function Horizen (props) {
  // 从默认属性中 解构 列表数据 当前item值 和 左边栏标题
  const { list, oldVal, title } = props;
  const { handleClick } = props;

  //  为 获取 内容栏宽度
  const Category = useRef(null);
  // 加入初始化内容宽度的逻辑
  useEffect(() => {
    let categoryDOM = Category.current;
    // 获取 div 下的所有 span标签
    let tagElems = categoryDOM.querySelectorAll('span');
    let totalWidth = 0;
    // 将 取得的span 类数组 转换为真实数组 ，再分别 把它们的宽度都加在一起
    Array.from(tagElems).forEach(ele => {
      totalWidth += ele.offsetWidth;
    });
    categoryDOM.style.width = `${totalWidth}px`;
  }, []); //  计算内容栏宽度 只需要初始化执行，后续不再执行，所以不需要依赖项
  
  return (
    <Scroll direction={"horizental"}>
      <div ref={Category}>
        <List>
          <span>{title}</span>
          {
            list.map((item) => {
              return (
                <ListItem 
                  key={item.key}
                  className={`${oldVal === item.key ? 'selected' : ''}`}
                  onClick={() => handleClick(item.key)}>
                    {item.name}
                </ListItem>
              )
            })
          }
        </List>
      </div>
    </Scroll>
  )
}

// 首先考虑接受的参数
//list 为接受的列表数据
//oldVal 为当前的 item 值
//title 为列表左边的标题 (默认热门 和 首字母)
//handleClick 为点击不同的 item 执行的方法
Horizen.defaultProps = {
  list: [],
  oldVal: '',
  title: '',
  handleClick: null
};

Horizen.propTypes = {
  list: PropTypes.array,
  oldVal: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func
};
export default memo(Horizen);