import React, { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import ButtonRounded from '../ButtonRounded';
import './styles.scss';

function CSSTransitionExample() {
  const [showButton, setShowButton] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const nodeRef = useRef(null);
  return (
    <div style={{ paddingTop: '2rem' }}>
      {showButton && (
        <ButtonRounded
          onClick={() => setShowMessage(true)}
          title="Show Message"
        >
        </ButtonRounded>
      )}
      <CSSTransition
        in={showMessage}
        nodeRef={nodeRef}
        timeout={2000}
        classNames="alert"
        unmountOnExit
        onEnter={() => setShowButton(false)}
        onExited={() => setShowButton(true)}
      >
        <div
          ref={nodeRef}
          variant="primary"
          onClick={() => setShowMessage(false)}
        >
          <h1>
            Animated alert message
          </h1>
          <p>
            This alert message is being transitioned in and
            out of the DOM.
          </p>
          <ButtonRounded
            onClick={() => setShowMessage(false)}
            title="Close"
          />
        </div>
      </CSSTransition>
    </div>
  );
}

export default CSSTransitionExample;
