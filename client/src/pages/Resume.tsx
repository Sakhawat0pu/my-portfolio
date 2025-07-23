import React from 'react';

const Resume: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">My Resume</h1>
      <div className="border rounded-lg" style={{ height: '80vh' }}>
        <iframe src="/Sakhawat_Hossain.pdf" width="100%" height="100%" title="My Resume"></iframe>
      </div>
    </div>
  );
};

export default Resume;
