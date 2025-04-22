import { BotIcon } from 'lucide-react'
import React from 'react'

const ReplyComponent = ({ text }: {text: string}) => {
  return (
    <div className="bg-[#1f2937] rounded-lg p-3 border-l-2 border-green-500">
      <div className="flex items-center mb-1">
        <BotIcon className="h-3 w-3 mr-1 text-green-400" />
        <span className="text-xs text-green-400">AI-generated reply:</span>
      </div>
      <p className="text-sm text-gray-200">
        {text}
      </p>
    </div>
  )
}

export default ReplyComponent