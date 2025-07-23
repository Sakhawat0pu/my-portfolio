import React, { useState, useEffect } from 'react';

const ReadingProgressBar: React.FC = () => {
  const [width, setWidth] = useState(0);

  const scrollHeight = () => {
    const el = document.documentElement;
    const scrollTop = el.scrollTop || document.body.scrollTop;
    const scrollHeight = el.scrollHeight || document.body.scrollHeight;
    const percent = (scrollTop / (scrollHeight - el.clientHeight)) * 100;
    setWidth(percent);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHeight);
    return () => window.removeEventListener('scroll', scrollHeight);
  });

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${width}%` }} />
      <style>{`
        .progress-container {
          width: 100%;
          height: 4px;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9999;
          background-color: #f0f0f0;
        }

        .progress-bar {
          height: 4px;
          background-color: #4caf50;
          transition: width 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ReadingProgressBar;
