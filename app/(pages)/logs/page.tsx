'use client'
import { useEffect, useState } from 'react';
import { getSocket } from '@/config/socket';

export default function LogsPage() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const socket = getSocket();
    socket.connect();

    const handleLog = (message: string) => {
      console.log(message); // Log to console
      setLogs(prev => [...prev, message]);
    };
    socket.emit('test', 'test message')
    socket.on('log', handleLog);

    return () => {
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
