import { Info } from 'lucide-react'
import React from 'react'

const SystemComponent = ({ text }: {text: string}) => {
  return (
    <div className="border-l-4 border-green-500 pl-4 py-1">
      <div className="flex items-center text-green-400 text-sm mb-1">
        <Info className="h-4 w-4 mr-2" />
        <span className="font-medium">System</span>
      </div>
      <p className="text-white">{text}</p>
    </div>
  )
}

export default SystemComponent