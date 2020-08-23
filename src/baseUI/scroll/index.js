import React, { forwardRef, useState,useEffect, useRef, useImperativeHandle } from "react"
import PropTypes from "prop-types"
import BScroll from "better-scroll"
import styled from 'styled-components';

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const Scroll = forwardRef((props, ref) => {
  // 实例 better-scroll 对象
  const [bScroll, setBScroll] = useState();
  // current 指向 初始化 bs 实例需要的 DOM 元素
  const scrollContaninerRef = useRef(); 

  // 从外面接受 props，解构赋值拿到这些参数:
  const { direction, click, refresh, pullUpLoading, pullDownLoading, bounceTop, bounceBottom } = props;
  const { pullUp, pullDown, onScroll } = props;

  // 接下来创建 better-scroll
  useEffect(() => {
    /**
     * @param DomElement 第一参数 实例化 better-scroll的dom元素节点
     * @param options bs的配置项
     */
    const scroll = new BScroll(scrollContaninerRef.current, {
      scrollX: direction === "horizental",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce:{
        top: bounceTop, // 可以向上吸顶
        bottom: bounceBottom // 可以向下吸底
      }
    })

    // 更新 bs
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    }

  }, [])

  // 给实例绑定 scroll 事件
  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on('scroll', (scroll) => {
      onScroll(scroll);
    })
  }, [onScroll, bScroll])

  // 进行上拉到底的判断，调用上拉刷新的函数
  useEffect(() => {
    if(!bScroll || !pullUp) return;
    // 判断是否滑动到了底部
    if(bScroll.y < bScroll.maxScrollY + 100) {
      pullUp ();
    }
    return () => {
      bScroll.off('scrollEnd') // 移除scrollEnd（滚动结束）事件
    }
  })

  // 进行下拉的判断，调用下拉刷新的函数
  useEffect(() => {
    if(!bScroll || !pullDown) return;
    bScroll.on('touchEnd', (pos) => {
      // 判断用户的下拉动作
      if(pos.y > 50) {
        pullDown()
      }
    });
    return () => {
      bScroll.off('touchEnd');
    }
  }, [pullDown, bScroll])

  // 每次重新渲染都要刷新实例，防止无法滑动:
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh(); //重新计算子容器和父容器内容的高度 来确保滚动效果 （要求：子容器内容的高度 超过 父容器内容的高度，才可以滑动）
    }
  })

  useImperativeHandle(ref, () => ({
    // 给外界暴露 refresh 方法
    refresh() {
      if (bScroll){
        bScroll.refresh();
        bScroll.scrollTo(0,0);
      }
    },
    // 给外界暴露 getBScroll 方法，提供 bs 实例
    getBScroll() {
      if(bScroll) {
        return bScroll;
      }
    }
  }))


  return (
    <ScrollContainer ref={scrollContaninerRef}>
      {props.children}
    </ScrollContainer>
  )
})


// Scroll 组件的默认参数
Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll:null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
};

// Scroll 组件需要接收的参数
Scroll.propTypes = {
  direction: PropTypes.oneOf (['vertical', 'horizental']),// 滚动的方向
  click: true,// 是否支持点击
  refresh: PropTypes.bool,// 是否刷新
  onScroll: PropTypes.func,// 滑动触发的回调函数
  pullUp: PropTypes.func,// 上拉加载逻辑
  pullDown: PropTypes.func,// 下拉加载逻辑
  pullUpLoading: PropTypes.bool,// 是否显示上拉 loading 动画
  pullDownLoading: PropTypes.bool,// 是否显示下拉 loading 动画
  bounceTop: PropTypes.bool,// 是否支持向上吸顶
  bounceBottom: PropTypes.bool// 是否支持向下吸底
};

export default Scroll;