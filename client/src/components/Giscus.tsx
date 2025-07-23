import React, { useEffect, useRef } from 'react';

const Giscus: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';

    script.setAttribute('data-repo', 'sakhawathossain/my-portfolio');
    script.setAttribute('data-repo-id', 'R_kgDOMA-5-A');
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'DIC_kwDOMA-5-M4Ch924');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'light');
    script.setAttribute('data-lang', 'en');

    ref.current.appendChild(script);

    return () => {
      if (ref.current) {
        ref.current.innerHTML = '';
      }
    };
  }, []);

  return <div ref={ref} />;
};

export default Giscus;
