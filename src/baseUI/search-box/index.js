import React, {useRef, useState, useEffect, useMemo} from 'react';
import styled from 'styled-components';
import style from '../../assets/global-style';
import { debounce } from './../../api/utils';

const SearchBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  padding-right: 20px;
  height: 40px;
  background: ${style["theme-color"]};
  .icon-back{
    font-size: 24px;
    color: ${style["font-color-light"]};
  }
  .box{
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: ${style["theme-color"]};
    color: ${style["highlight-background-color"]};
    font-size: ${style["font-size-m"]};
    outline: none;
    border: none;
    border-bottom: 1px solid ${style["border-color"]};
    &::placeholder{
      color: ${style["font-color-light"]};
    }
  }
  .icon-delete{
    font-size: 16px;
    color: ${style["background-color"]};
  }
`

const SearchBox = (props) => {
  const queryRef = useRef ();
  const [query, setQuery] = useState ('');
  // 从父组件热门搜索中拿到的新关键词
  const { newQuery } = props;
  // 父组件针对搜索关键字发请求相关的处理
  const { handleQuery } = props;
  // 根据关键字是否存在决定清空按钮的显示 / 隐藏 
  const displayStyle = query ? {display: 'block'}: {display: 'none'};

  const handleChange = (e) => {
    // 搜索框内容改变时的逻辑
    setQuery (e.currentTarget.value); // 获取输入框的 value值
  };

  // 输入框事件 防抖处理，500ms内 只取第一次的结果，重复点击，则重新计算时间
  let handleQueryDebounce = useMemo (() => {
    return debounce (handleQuery, 500);
  }, [handleQuery]);

  useEffect (() => {
    queryRef.current.focus (); // 进场时，input框 出现 焦点
  }, []);
  
  useEffect(() => {
    handleQueryDebounce(query);
    // eslint-disable-next-line 
  }, [query]);

  // 父组件点击了热门搜索的关键字，newQuery 更新:
  useEffect (() => {
    if (newQuery !== query){
      setQuery (newQuery);
    }
  }, [newQuery]);

  const clearQuery = () => {
    // 清空框内容的逻辑
    setQuery ('');
    queryRef.current.focus ();
  }

  return (
    <SearchBoxWrapper>
      <i className="iconfont icon-back" onClick={() => props.back ()}>&#xe655;</i>
      <input ref={queryRef} className="box" placeholder="搜索歌曲、歌手、专辑" value={query} onChange={handleChange}/>
      <i className="iconfont icon-delete" onClick={clearQuery} style={displayStyle}>&#xe600;</i>
    </SearchBoxWrapper>
  )
};

export default SearchBox;