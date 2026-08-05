"use client"

import { useState, useEffect } from "react"
import { Play, Video, Search, Filter, UploadCloud, Link as LinkIcon, CheckCircle2, Clock, Sparkles, HardDrive, X, Loader2, Upload } from "lucide-react"
import * as motion from 'framer-motion/client'
import { AnimatePresence, motion as fmotion } from 'framer-motion'

import { AIHighlightInterface } from "./AIHighlightInterface"
import { fadeUp, staggerContainer } from "@/lib/utils/animations"

interface VideoItem {
  id: string;
  title: string;
  date: string;
  duration: string;
  thumbnailSeed: number;
}

const INITIAL_VIDEOS: VideoItem[] = [
  { id: '1', title: "OPA U15 vs Mexico City FC", date: "May 24, 2026", duration: "90:00", thumbnailSeed: 1 },
  { id: '2', title: "First Team Training", date: "May 22, 2026", duration: "120:00", thumbnailSeed: 2 },
  { id: '3', title: "U17 Elite Showdown", date: "May 20, 2026", duration: "95:00", thumbnailSeed: 3 },
  { id: '4', title: "Goalkeeper Drills", date: "May 18, 2026", duration: "45:00", thumbnailSeed: 4 }
];

export function VideoAnalysisDashboard() {
  const [activeTab, setActiveTab] = useState("library")
  
  // State
  const [videos, setVideos] = useState<VideoItem[]>(INITIAL_VIDEOS);
  const [veoConnected, setVeoConnected] = useState(false);
  
  // Modals
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isVeoOpen, setIsVeoOpen] = useState(false);

  return (
    <>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="p-4 lg:p-8 space-y-6 bg-white min-h-[calc(100vh-4rem)] m-2 lg:m-4 rounded-3xl text-gray-900 shadow-lg border border-gray-100"
      >
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-gray-900 drop-shadow-sm">Video & AI Hub</h1>
            <p className="text-gray-500 mt-1 font-medium">Manage match footage, training videos, and AI highlights.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsVeoOpen(true)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm shadow-sm transition-all border ${veoConnected ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-700 border-gray-200 hover:shadow-md hover:bg-white'}`}
            >
              {veoConnected ? <CheckCircle2 className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
              {veoConnected ? 'Veo Synced' : 'Connect Veo'}
            </button>
            <button 
              onClick={() => setIsUploadOpen(true)}
              className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <UploadCloud className="w-4 h-4" /> Upload Video
            </button>
          </div>
        </motion.div>

        {/* KPI Overview */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-2">
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2 text-gray-500">
              <Clock className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-bold">Total Hours</span>
            </div>
            <div className="text-3xl font-black text-gray-900">142<span className="text-sm text-gray-500 ml-1">Hrs</span></div>
          </div>
          
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2 text-gray-500">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-bold">AI Clips</span>
            </div>
            <div className="text-3xl font-black text-gray-900">28<span className="text-sm text-gray-500 ml-1 text-green-500 font-bold">+12 this week</span></div>
          </div>
          
          <div className={`border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow ${veoConnected ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-100'}`}>
            <div className={`flex items-center gap-3 mb-2 ${veoConnected ? 'text-green-700' : 'text-gray-500'}`}>
              <Video className="w-5 h-5" />
              <span className="text-sm font-bold">Veo Sync</span>
            </div>
            <div className={`text-2xl font-black flex items-center gap-2 ${veoConnected ? 'text-green-800' : 'text-gray-900'}`}>
              {veoConnected ? <><CheckCircle2 className="w-6 h-6" /> Active</> : <span className="text-gray-400">Not Connected</span>}
            </div>
          </div>
          
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2 text-gray-500">
              <HardDrive className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-bold">Storage</span>
            </div>
            <div className="text-3xl font-black text-gray-900">45% <span className="text-sm text-gray-500 ml-1 font-medium">used</span></div>
            <div className="w-full bg-gray-200 h-1.5 rounded-full mt-3"><div className="bg-orange-500 h-1.5 rounded-full w-[45%]"></div></div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <div className="flex gap-6">
                {["Library", "AI Highlights", "Player Analysis"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`pb-2 text-sm font-bold transition-all relative ${activeTab === tab.toLowerCase() ? "text-purple-600" : "text-gray-500 hover:text-gray-900"}`}
                  >
                    {tab}
                    {activeTab === tab.toLowerCase() && (
                      <motion.div layoutId="video-tab" className="absolute bottom-[-2px] left-0 right-0 h-0.5 bg-purple-600" />
                    )}
                  </button>
                ))}
              </div>
              
              <div className="hidden md:flex relative w-64 mb-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input type="text" placeholder="Search videos..." className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-full pl-10 pr-4 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 shadow-sm transition-all" />
              </div>
            </div>

            {activeTab === "library" && (
              <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="grid sm:grid-cols-2 gap-6">
                {videos.map((item, i) => (
                  <div key={item.id} className="group cursor-pointer">
                    <div className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden mb-3 border border-gray-200 shadow-sm">
                      <img src={`https://images.unsplash.com/photo-1518605368461-1e1e1273948e?q=80&w=600&auto=format&fit=crop&sig=${item.thumbnailSeed}`} alt="thumbnail" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                        <div className="h-14 w-14 rounded-full bg-purple-600 text-white flex items-center justify-center pl-1 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                          <Play className="h-7 w-7" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded-lg backdrop-blur-sm">
                        {item.duration}
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-900 line-clamp-1 group-hover:text-purple-600 transition-colors">{item.title}</h4>
                    <p className="text-xs font-medium text-gray-500 mt-1">Match • {item.date}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "ai highlights" && (
              <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}}>
                <AIHighlightInterface />
              </motion.div>
            )}

            {activeTab === "player analysis" && (
              <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50">
                <Search className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-bold text-gray-900">Player Analysis Module</h3>
                <p className="text-sm font-medium text-gray-500 mt-1">Select AI Highlights to see the interactive component.</p>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 shadow-sm">
              <h3 className="font-bold text-sm mb-5 text-gray-900">Recent Uploads</h3>
              <div className="space-y-4">
                {videos.slice(0,4).map((item, i) => (
                  <div key={item.id} className="flex gap-4 group cursor-pointer items-center">
                    <div className="h-14 w-20 shrink-0 bg-gray-200 rounded-xl relative overflow-hidden flex items-center justify-center shadow-sm">
                       <img src={`https://images.unsplash.com/photo-1574629810360-7efbb4bcdb6f?q=80&w=200&auto=format&fit=crop&sig=${item.thumbnailSeed}`} alt="thumb" className="w-full h-full object-cover" />
                       <div className="absolute inset-0 bg-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <Play className="w-5 h-5 text-white" />
                       </div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-sm font-bold group-hover:text-purple-600 text-gray-900 transition-colors line-clamp-1">{item.title}</span>
                      <span className="text-xs font-medium text-gray-500 mt-0.5">{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm">
                View All
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Upload Modal */}
      <UploadVideoModal 
        isOpen={isUploadOpen} 
        onClose={() => setIsUploadOpen(false)}
        onUpload={(newVideo) => setVideos([newVideo, ...videos])}
      />
      
      {/* Connect Veo Modal */}
      <ConnectVeoModal
        isOpen={isVeoOpen}
        onClose={() => setIsVeoOpen(false)}
        onConnect={() => setVeoConnected(true)}
        isConnected={veoConnected}
      />
    </>
  )
}

// --------------------------- MODALS ---------------------------

function UploadVideoModal({ isOpen, onClose, onUpload }: { isOpen: boolean, onClose: () => void, onUpload: (video: VideoItem) => void }) {
  const [title, setTitle] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = () => {
    if (!title) return;
    setIsUploading(true);
    
    // Simulate upload
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onUpload({
              id: Math.random().toString(),
              title: title,
              date: "Just now",
              duration: "90:00",
              thumbnailSeed: Math.floor(Math.random() * 100)
            });
            setIsUploading(false);
            setProgress(0);
            setTitle('');
            onClose();
          }, 500);
          return 100;
        }
        return p + 10;
      });
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-gray-900">Upload Video</h2>
          <button onClick={onClose} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 text-gray-500"><X className="w-5 h-5" /></button>
        </div>
        
        {isUploading ? (
          <div className="py-12 flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
            <h3 className="font-bold text-gray-900 text-lg mb-2">Uploading "{title}"</h3>
            <div className="w-full bg-gray-100 h-2 rounded-full mt-4 max-w-xs overflow-hidden">
              <fmotion.div className="bg-purple-600 h-full" initial={{width:0}} animate={{width:`${progress}%`}} />
            </div>
            <p className="mt-2 text-sm font-bold text-purple-600">{progress}%</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-purple-200 bg-purple-50 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-purple-100 transition-colors">
              <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                <Upload className="w-6 h-6 text-purple-600" />
              </div>
              <p className="font-bold text-purple-900">Click or drag video to upload</p>
              <p className="text-sm font-medium text-purple-600/70 mt-1">MP4, MOV up to 4GB</p>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Video Title</label>
              <input 
                type="text" 
                placeholder="e.g. U15 Match vs City"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
              />
            </div>
            
            <button 
              onClick={handleUpload}
              disabled={!title}
              className="w-full bg-purple-600 text-white font-bold py-3 rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              Start Upload
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function ConnectVeoModal({ isOpen, onClose, onConnect, isConnected }: { isOpen: boolean, onClose: () => void, onConnect: () => void, isConnected: boolean }) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      onConnect();
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-gray-900">Connect Veo</h2>
          <button onClick={onClose} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 text-gray-500"><X className="w-5 h-5" /></button>
        </div>
        
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="flex gap-4 items-center">
            <div className="w-16 h-16 bg-gray-900 text-white font-black text-2xl flex items-center justify-center rounded-2xl shadow-md">Veo</div>
            <LinkIcon className="w-6 h-6 text-gray-300" />
            <div className="w-16 h-16 bg-purple-600 text-white flex items-center justify-center rounded-2xl shadow-md"><Video className="w-8 h-8" /></div>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Auto-Sync Matches</h3>
            <p className="text-sm text-gray-500 font-medium mt-1">Connect your Veo club account to automatically pull in match recordings and AI highlights.</p>
          </div>
          
          <div className="w-full">
            <label className="block text-sm font-bold text-gray-700 mb-2 text-left">Veo API Key</label>
            <input type="password" placeholder="v2_xxxxxxxxxxxxx" className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400" />
          </div>

          <button 
            onClick={handleConnect}
            disabled={isConnecting || isConnected}
            className={`w-full font-bold py-3 rounded-xl transition-all flex justify-center items-center gap-2 ${isConnected ? 'bg-green-100 text-green-700' : 'bg-gray-900 text-white hover:bg-black'}`}
          >
            {isConnecting ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
            {isConnected ? 'Connected!' : isConnecting ? 'Authenticating...' : 'Connect Account'}
          </button>
        </div>
      </div>
    </div>
  )
}
