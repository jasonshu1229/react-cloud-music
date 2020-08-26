import React, {useState, useEffect, useCallback} from 'react';
import { CSSTransition } from 'react-transition-group';
import { Container } from './style';

function Search (props) {
  // 控制动画
  const [show, setShow] = useState (false);
  useEffect (() => {
    setShow (true);
  }, []);

  return (
    <CSSTransition
    in={show}
    timeout={300}
    appear={true}
    classNames="fly"
    unmountOnExit
    onExited={() => props.history.goBack ()}
  >
    <Container>
      <div> 返回 </div>
    </Container>
  </CSSTransition>
  )
}

export default Search;