import {createElement as r} from 'react';
import {render} from 'react-dom';

render(
  r('div', { style: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '7rem'
  } }, 'ATNDR'),
  document.getElementById("app"),
);
