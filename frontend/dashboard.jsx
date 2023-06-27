import React, { useState } from 'react';
import axios from 'axios';

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [conferenceLink, setConferenceLink] = useState('');

  const generateConferenceLink = () => {
    setIsLoading(true);
    axios
      .post('/api/generateLink') // Replace with your actual API endpoint
      .then(response => {
        const generatedLink = response.data.link;
        setConferenceLink(generatedLink);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error generating conference link:', error);
        setIsLoading(false);
      });
  };

  const copyConferenceLink = () => {
    navigator.clipboard.writeText(conferenceLink);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button
        disabled={isLoading}
        onClick={generateConferenceLink}
      >
        {isLoading ? 'Loading...' : 'Generate Conference Link'}
      </button>
      {conferenceLink && (
        <div>
          <input type="text" value={conferenceLink} disabled />
          <button onClick={copyConferenceLink}>Copy Link</button>
          <button>Share Link</button>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;