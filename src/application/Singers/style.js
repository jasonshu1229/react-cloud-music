import styled from'styled-components';
import style from '../../assets/global-style';

// todo 解决横向列表的滚动问题 添加一个 NavContainer 容器，宽度100%
// 1. 外部容器未限定宽度，也就是两个 Horizen 外面包裹的 div 元素。
// 2. 内部宽度没有进行相应的计算，始终为屏幕宽度。
export const NavContainer  = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 95px;
  width: 100%;
  padding: 5px;
  overflow: hidden;
`;