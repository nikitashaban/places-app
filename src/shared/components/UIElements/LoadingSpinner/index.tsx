import React from 'react';

import './LoadingSpinner.scss';


interface ILoadingSpinner {
  asOverlay: boolean
}

const LoadingSpinner: React.FC<ILoadingSpinner> = ({ asOverlay }) => {
  return (
    <div className={`${asOverlay && 'loading-spinner__overlay'}`}>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default LoadingSpinner;
