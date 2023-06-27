const getParticipantsInConference = (conferenceId) => {
    const participants = [];
  
    // Get the sockets in the conference room
    const sockets = io.sockets.adapter.rooms.get(conferenceId);
  
    if (sockets) {
      // Iterate over each socket in the conference room
      sockets.forEach((socketId) => {
        const socket = io.sockets.sockets.get(socketId);
  
        // Extract the participant's data from the socket
        const participant = {
          participantId: socket.id,
          name: socket.data.name,
          hasRaisedHand: socket.data.hasRaisedHand,
        };
  
        participants.push(participant);
      });
    }
  
    return participants;
  };
  
  const socketHandler = (io) => {
    io.on('connection', async (socket) => {
      // Handle when a socket connects
  
      // Validate the conference ID against the database
      const conference = await Conference.findOne({ where: { id: conferenceId } });
  
      if (!conference) {
        // Conference ID is invalid, disconnect the socket
        socket.disconnect(true);
        return;
      }
  
      // Retrieve the conference ID and participant's name from the client
      const { conferenceId, name } = socket.handshake.query;
  
      // Join the room corresponding to the conference ID
      socket.join(conferenceId);
  
      // Store additional data in the socket object
      socket.data.name = name;
      socket.data.hasRaisedHand = false; // Initialize to false initially
  
      // Send the list of current participants to the connected socket
      const participants = getParticipantsInConference(conferenceId);
      socket.emit('updatedParticipants', participants);
  
      // Broadcast the participant joined event to other sockets in the conference room
      socket.to(conferenceId).emit('participantJoined', {
        participantId: socket.id,
        name,
      });
  
      // Handle when a socket disconnects
      socket.on('disconnect', () => {
        // Remove the participant from the data structure or perform any cleanup
        removeParticipantFromConference(conferenceId, socket.id);
  
        // Broadcast the participant left event to other sockets in the conference room
        socket.to(conferenceId).emit('participantLeft', {
          participantId: socket.id,
        });
      });
  
      // Handle custom events like raising hand or other interactions
      socket.on('raiseHand', () => {
        // Set the hasRaisedHand status for the socket
        socket.data.hasRaisedHand = !socket.data.hasRaisedHand;
  
        // Broadcast the raised hand event to other sockets in the conference room
        socket.to(conferenceId).emit('raisedHand', {
          participantId: socket.id,
        });
      });
  
      // Host-side logic
      socket.on('timerStart', (time) => {
        authenticate(socket.request, socket.request.res, async () => {
          try {
            // Get the user ID from the authenticated socket
            const userId = socket.request.user.id;
  
            // Check if the user is the host of the conference
            const conference = await Conference.findOne({
              where: { id: conferenceId, userId: userId },
            });
  
            if (!conference) {
              throw new Error('User is not the host of the conference');
            }
  
            // Broadcast the timerStart event to all participants in the conference
            socket.to(conferenceId).emit('timerStart', time);
          } catch (error) {
            // Handle authentication or authorization error
            console.error(error);
            // Optionally, emit an error event or send an error response
          }
        });
      });
  
      // Participant-side logic
      socket.on('timerStart', (time) => {
        // Handle the timer start event for participants
        // Display the timer or perform any necessary actions
      });
  
      // ... Other event handlers and logic
    });
  };
  
  module.exports = socketHandler;
  