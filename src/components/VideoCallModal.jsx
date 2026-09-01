import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function VideoCallModal() {
  const { user, isVideoCallOpen, setIsVideoCallOpen, showToast } = useApp();
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "Dr. Priya Sharma", text: "Hello Anchal! How are you feeling today?", time: "10:01 AM" }
  ]);
  const [inputMsg, setInputMsg] = useState("");

  if (!isVideoCallOpen) return null;

  const consultation = user.upcomingConsultation;

  const handleSend = (e) => {
    e.preventDefault();
    if (inputMsg.trim()) {
      setMessages(prev => [...prev, { sender: "You", text: inputMsg, time: "Just now" }]);
      setInputMsg("");
    }
  };

  const endCall = () => {
    setIsVideoCallOpen(false);
    showToast("Consultation call ended. Session summary is being generated!", "info");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-5xl h-[85vh] bg-zinc-950 rounded-2xl overflow-hidden flex flex-col border border-zinc-800 shadow-2xl">
        {/* Top Header */}
        <div className="px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <div>
              <h3 className="font-bold text-sm">{consultation.doctorName}</h3>
              <p className="text-[11px] text-zinc-400">NutriVanta Encrypted Video Session</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-full font-mono">08:45</span>
            <button
              onClick={() => setChatOpen(!chatOpen)}
              className={`p-2 rounded-lg text-zinc-300 hover:bg-zinc-800 transition-colors ${chatOpen ? 'bg-zinc-800 text-primary-fixed' : ''}`}
              title="Chat"
            >
              <span className="material-symbols-outlined text-lg">chat</span>
            </button>
          </div>
        </div>

        {/* Video Area + Chat */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Main Video Screen (Doctor) */}
          <div className="flex-1 bg-zinc-900 relative flex items-center justify-center overflow-hidden">
            <img
              src={consultation.doctorAvatar}
              alt={consultation.doctorName}
              className="w-full h-full object-cover object-center brightness-95"
            />
            {/* Overlay tag */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs flex items-center gap-2">
              <span className="font-semibold">{consultation.doctorName}</span>
              <span className="text-emerald-400 material-symbols-outlined text-xs fill">verified</span>
            </div>

            {/* Self Video (Patient PiP) */}
            <div className="absolute bottom-4 right-4 w-36 sm:w-48 h-28 sm:h-36 bg-zinc-800 rounded-xl overflow-hidden border-2 border-zinc-700 shadow-2xl">
              {cameraOn ? (
                <img
                  src={user.avatar}
                  alt="You"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 text-xs">
                  <span className="material-symbols-outlined text-2xl mb-1">videocam_off</span>
                  <span>Camera Off</span>
                </div>
              )}
              <div className="absolute bottom-1 left-2 text-[10px] text-white/80 bg-black/40 px-1.5 py-0.5 rounded">
                You ({user.name.split(' ')[0]})
              </div>
            </div>
          </div>

          {/* In-Call Live Chat Drawer */}
          {chatOpen && (
            <div className="w-80 bg-zinc-900 border-l border-zinc-800 flex flex-col">
              <div className="p-3 border-b border-zinc-800 text-xs font-semibold text-zinc-300">
                In-Call Consultation Notes
              </div>
              <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                {messages.map((m, idx) => (
                  <div key={idx} className={`flex flex-col ${m.sender === 'You' ? 'items-end' : 'items-start'}`}>
                    <span className="text-[10px] text-zinc-400 mb-0.5">{m.sender} • {m.time}</span>
                    <div className={`p-2.5 rounded-xl text-xs max-w-[85%] ${
                      m.sender === 'You'
                        ? 'bg-emerald-700 text-white rounded-br-none'
                        : 'bg-zinc-800 text-zinc-200 rounded-bl-none'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSend} className="p-3 border-t border-zinc-800 flex gap-2">
                <input
                  type="text"
                  placeholder="Type a query or note..."
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  className="flex-1 bg-zinc-800 text-xs text-white px-3 py-2 rounded-lg outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <button type="submit" className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-500">
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Bottom Control Bar */}
        <div className="px-6 py-4 bg-zinc-900/95 border-t border-zinc-800 flex items-center justify-center gap-4">
          <button
            onClick={() => setMicOn(!micOn)}
            className={`p-3 rounded-full transition-all ${
              micOn ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
            }`}
            title={micOn ? "Mute Microphone" : "Unmute Microphone"}
          >
            <span className="material-symbols-outlined">{micOn ? 'mic' : 'mic_off'}</span>
          </button>

          <button
            onClick={() => setCameraOn(!cameraOn)}
            className={`p-3 rounded-full transition-all ${
              cameraOn ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
            }`}
            title={cameraOn ? "Turn Camera Off" : "Turn Camera On"}
          >
            <span className="material-symbols-outlined">{cameraOn ? 'videocam' : 'videocam_off'}</span>
          </button>

          <button
            onClick={endCall}
            className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold text-sm flex items-center gap-2 shadow-lg transition-transform active:scale-95"
          >
            <span className="material-symbols-outlined text-base">call_end</span>
            <span>End Consultation</span>
          </button>
        </div>
      </div>
    </div>
  );
}
