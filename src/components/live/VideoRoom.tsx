/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import { supabase } from '../../lib/supabase';
import { Mic, MicOff, Video, VideoOff, Users, MessageSquare } from 'lucide-react';

interface VideoRoomProps {
  sessionId: string;
  isInstructor: boolean;
}

interface Participant {
  id: string;
  stream?: MediaStream;
  peer?: Peer.Instance;
}

const VideoRoom: React.FC<VideoRoomProps> = ({ sessionId, isInstructor }) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
  const [messageInput, setMessageInput] = useState('');
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const channelRef = useRef<any>(null);

  useEffect(() => {
    // Initialize media stream
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error('Failed to get media stream:', err));

    // Subscribe to room channel
    const channel = supabase.channel(`room:${sessionId}`);
    channelRef.current = channel;

    channel
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        newPresences.forEach((presence: any) => {
          if (presence.user_id !== supabase.auth.user()?.id) {
            initializePeerConnection(presence.user_id);
          }
        });
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        leftPresences.forEach((presence: any) => {
          removeParticipant(presence.user_id);
        });
      })
      .subscribe();

    return () => {
      localStream?.getTracks().forEach(track => track.stop());
      participants.forEach(participant => participant.peer?.destroy());
      channel.unsubscribe();
    };
  }, [sessionId]);

  const initializePeerConnection = (participantId: string) => {
    if (!localStream) return;

    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: localStream
    });

    peer.on('signal', data => {
      channelRef.current?.send({
        type: 'signal',
        to: participantId,
        from: supabase.auth.user()?.id,
        data
      });
    });

    peer.on('stream', stream => {
      setParticipants(prev => 
        prev.map(p => 
          p.id === participantId 
            ? { ...p, stream } 
            : p
        )
      );
    });

    setParticipants(prev => [...prev, { id: participantId, peer }]);
  };

  const removeParticipant = (participantId: string) => {
    setParticipants(prev => 
      prev.filter(p => {
        if (p.id === participantId) {
          p.peer?.destroy();
          return false;
        }
        return true;
      })
    );
  };

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      const newMessage = {
        user: 'You',
        text: messageInput.trim()
      };
      setMessages(prev => [...prev, newMessage]);
      channelRef.current?.send({
        type: 'chat',
        message: newMessage
      });
      setMessageInput('');
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Video grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {/* Local video */}
          <div className="relative bg-gray-800 rounded-lg overflow-hidden">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">
              You {isInstructor ? '(Instructor)' : ''}
            </div>
          </div>

          {/* Remote videos */}
          {participants.map(participant => (
            <div key={participant.id} className="relative bg-gray-800 rounded-lg overflow-hidden">
              {participant.stream && (
                <video
                  autoPlay
                  playsInline
                  srcObject={participant.stream}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute bottom-4 left-4 text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">
                Participant
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-gray-800 p-4 flex items-center justify-center space-x-4">
          <button
            onClick={toggleMute}
            className={`p-3 rounded-full ${isMuted ? 'bg-red-500' : 'bg-gray-600'}`}
          >
            {isMuted ? <MicOff className="text-white" /> : <Mic className="text-white" />}
          </button>
          <button
            onClick={toggleVideo}
            className={`p-3 rounded-full ${isVideoOff ? 'bg-red-500' : 'bg-gray-600'}`}
          >
            {isVideoOff ? <VideoOff className="text-white" /> : <Video className="text-white" />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
        {/* Participants */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center text-white mb-4">
            <Users className="h-5 w-5 mr-2" />
            <span className="font-medium">Participants ({participants.length + 1})</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-gray-300">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span>You {isInstructor ? '(Instructor)' : ''}</span>
            </div>
            {participants.map(participant => (
              <div key={participant.id} className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>Participant</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center text-white">
              <MessageSquare className="h-5 w-5 mr-2" />
              <span className="font-medium">Chat</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className="text-sm">
                <span className="font-medium text-blue-400">{message.user}: </span>
                <span className="text-gray-300">{message.text}</span>
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-gray-700 text-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VideoRoom;