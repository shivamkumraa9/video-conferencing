import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with your server URL

const HostViewPage = () => {
  const [participants, setParticipants] = useState([]);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    // Socket event listeners
    socket.on('timerStart', handleTimerStart);
    socket.on('timerStop', handleTimerStop);
    socket.on('newParticipant', handleNewParticipant);

    // Clean up socket listeners on component unmount
    return () => {
      socket.off('timerStart');
      socket.off('timerStop');
      socket.off('newParticipant');
    };
  }, []);

  const handleTimerStart = (time) => {
    setTimer(time);
    setIsTimerRunning(true);
  };

  const handleTimerStop = () => {
    setIsTimerRunning(false);
  };

  const handleNewParticipant = (participant) => {
    setParticipants((prevParticipants) => [...prevParticipants, participant]);
  };

  const handleStartTimer = (time) => {
    socket.emit('startTimer', time);
  };

  const handleStopTimer = () => {
    socket.emit('stopTimer');
  };

  return (
    <div>
      <h2>Host View</h2>
      <div>
        <h3>Participants:</h3>
        <ul>
          {participants.map((participant) => (
            <li key={participant.id}>{participant.name}</li>
          ))}
        </ul>
      </div>

      {isTimerRunning ? (
        <div>
          <h3>Timer: {timer} seconds</h3>
          <button onClick={handleStopTimer}>Stop Timer</button>
        </div>
      ) : (
        <div>
          <button onClick={() => handleStartTimer(60)}>Start 1 Minute Timer</button>
          <button onClick={() => handleStartTimer(120)}>Start 2 Minute Timer</button>
        </div>
      )}
    </div>
  );
};

export default HostViewPage;