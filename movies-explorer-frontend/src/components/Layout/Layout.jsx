import React from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import styles from './Layout.scss';

function Layout({ noFooter, children, ...restProps }) {
  return (
    <div className="layout">
      <div className="layout__header">
        <Header {...restProps} />
      </div>
      <div className="layout__content">{children}</div>
      {!noFooter && (
        <div className="layout__footer">
          <Footer />
        </div>
      )}
    </div>
  );
}

export default Layout;
