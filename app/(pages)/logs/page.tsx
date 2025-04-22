'use client'
import { useEffect, useState } from 'react';
import { getSocket } from '@/config/socket';
// import axios from 'axios';

export default function LogsPage() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const socket = getSocket();
    socket.connect();

    socket.on('log', (data) => {
      console.log(`Socket message page: ${data}`);
      setLogs((prevLogs) => [...prevLogs, data]);
    });
    
    // axios.get('/api/run').catch((err) => {
    //   console.error("Error triggering automation:", err);
    // });

    return () => {
      socket.off('log'); // Optional cleanup
      socket.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Logs</h1>
      <div className="bg-gray-900 p-4 rounded-lg space-y-2 max-h-[80vh] overflow-y-auto">
        {logs.map((log, idx) => (
          <div key={idx} className="text-sm text-green-400">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}
