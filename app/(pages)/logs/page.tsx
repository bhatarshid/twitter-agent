'use client'
import { useEffect, useState } from 'react';
import { getSocket } from '@/config/socket';
import SystemComponent from '@/components/logs/SystemComponent';
import TweetComponent from '@/components/logs/TweetComponent';
import { Clock, Heart, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ReplyComponent from '@/components/logs/ReplyComponent';
// import axios from 'axios';

export default function LogsPage() {
  interface Log {
    type: string;
    text?: string;
    number?: number;
    completed?: boolean;
    skip?: boolean;
  }

  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const socket = getSocket();
    socket.connect();

    socket.on('log', (data) => {
      console.log(`Socket message page: ${data}`);
      setLogs((prevLogs) => [...prevLogs, data]);
    });

    return () => {
      socket.off('log'); // Optional cleanup
      socket.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-2xl font-bold mb-1">Activity Logs</h1>
      <p className="text-lg text-gray-500">Monitoring automated Twitter interactions in real-time</p>
      <div className="bg-[#1a1d26] border border-b-[#353951] p-4 rounded-md min-h-[80vh] space-y-4">
        {logs.length === 0 && (
          <p className="text-gray-600 text-xl text-center">No logs available</p>
        )}
        {logs.map((log, idx) => (
          <div key={idx} className="">
            {log.type === 'tweet' && (
              <div className="border-l-4 border-purple-500 pl-4 space-y-2">
                <TweetComponent
                  tweetNumber={log?.number}
                  tweetText={log?.text || ''}
                />
                {logs[idx + 1]?.type === 'like' && (
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge
                      variant="outline"
                      className="bg-pink-900/30 text-pink-400 border-pink-800"
                    >
                      <Heart className="h-3 w-3 mr-1" /> Liked
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-900/30 text-green-400 border-green-800"
                    >
                      <MessageSquare className="h-3 w-3 mr-1" /> AI Reply Generated
                    </Badge>
                  </div>
                )}
                {logs[idx + 2]?.type === 'reply' && logs[idx+2]?.skip === false && (
                  <ReplyComponent text={logs[idx + 2]?.text || ''} skip={false} />
                )}
                {logs[idx + 2]?.type === 'reply' && logs[idx+2]?.skip === true && (
                  <ReplyComponent text={logs[idx + 2]?.text || ''} skip={true} />
                )}
                {logs[idx + 3]?.type === 'wait' && (
                  <div className="mt-2 text-xs text-gray-500 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {logs[idx + 3]?.text || 'Waiting...'}
                  </div>
                )}
              </div>
            )}
            {log.type === 'system' && <SystemComponent text={log?.text || ''} />}
          </div>
        ))}
      </div>
    </div>
  );
}
