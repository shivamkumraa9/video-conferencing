import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with your server URL

const ParticipantViewPage = () => {
  const [participants, setParticipants] = useState([]);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [participantId, setParticipantId] = useState('');

  useEffect(() => {
    // Socket event listeners
    socket.on('connect', handleSocketConnect);
    socket.on('updatedParticipants', handleUpdatedParticipants);
    socket.on('timerStart', handleTimerStart);
    socket.on('handRaised', handleHandRaised);
    socket.on('participantId', handleParticipantId);

    // Clean up socket listeners on component unmount
    return () => {
      socket.off('connect', handleSocketConnect);
      socket.off('updatedParticipants', handleUpdatedParticipants);
      socket.off('timerStart', handleTimerStart);
      socket.off('handRaised', handleHandRaised);
      socket.off('participantId', handleParticipantId);
    };
  }, []);

  const handleSocketConnect = () => {
    console.log('Connected to socket');
    socket.emit('getInitialParticipants');
  };

  const handleParticipantId = (id) => {
    setParticipantId(id);
  };

  const handleUpdatedParticipants = (updatedParticipants) => {
    setParticipants(updatedParticipants);
  };

  const handleTimerStart = (time) => {
    setTimer(time);
    setIsTimerRunning(true);

    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(countdown);
      setIsTimerRunning(false);
      playSound();
    }, time * 1000);
  };

  const handleHandRaised = () => {
    setIsHandRaised(!isHandRaised);
    socket.emit('raiseHand', { participantId, isRaised: !isHandRaised });
  };

  const handleLeaveCall = () => {
    socket.emit('leaveCall');
    closeTab();
  };

  const closeTab = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isSafari = userAgent.includes('safari') && !userAgent.includes('chrome');
    if (isSafari) {
      // Safari doesn't allow closing tabs programmatically
      window.open('', '_self').close();
    } else {
      window.close();
    }
  };

  const playSound = () => {
    // Play sound logic goes here
    console.log('Playing sound');
  };

  return (
    <div>
      <h2>Participant View</h2>
      <div>
        <h3>Participants:</h3>
        <ul>
          {participants.map((participant) => (
            <li key={participant.id}>{participant.name}</li>
          ))}
        </ul>
      </div>

      <button onClick={handleHandRaised}>{isHandRaised ? 'Lower Hand' : 'Raise Hand'}</button>
      {isHandRaised && <p>Your hand is raised!</p>}

      {isTimerRunning && (
        <div>
          <h3>Timer: {timer} seconds</h3>
        </div>
      )}

      <button onClick={handleLeaveCall}>Leave Call</button>
    </div>
  );
};

export default ParticipantViewPage;