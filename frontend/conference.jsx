import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import HostViewPage from './HostViewPage';
import ParticipantViewPage from './ParticipantViewPage';

const ConferencePage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isHost, setIsHost] = useState(false);
  const [participantName, setParticipantName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/conference/${id}`, { token: 'your-auth-token' });
        const { status, isHost: hostStatus } = response.data;

        setIsLoading(false);

        if (status === 'success') {
          setIsHost(hostStatus);
        } else {
          setError('Conference ID is invalid');
        }
      } catch (error) {
        setIsLoading(false);
        setError('Conference ID is invalid');
      }
    };

    fetchData();
  }, [id]);

  const handleParticipantNameSubmit = (event) => {
    event.preventDefault();
    // Perform any necessary actions, such as sending participant name to the server
    // This is just a placeholder code
    setParticipantName(event.target.name.value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (isHost) {
    return <HostViewPage />;
  }

  if (!participantName) {
    return (
      <form onSubmit={handleParticipantNameSubmit}>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  }

  return (
    <ParticipantViewPage
      participantName={participantName}
    />
  );
};

export default ConferencePage;
