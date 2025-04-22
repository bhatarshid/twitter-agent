import React from 'react'
import { FaTwitter } from 'react-icons/fa';

const TweetComponent = ({ tweetNumber, tweetText}: {tweetNumber: number | undefined; tweetText: string}) => {
  return (
    <div className=''>
      <div className="flex items-center text-purple-400 text-sm mb-1">
        <FaTwitter className="h-4 w-4 mr-2" />
        <span className="font-medium">Tweet {tweetNumber}</span>
      </div>
      <div className="bg-[#252836] rounded-lg p-3 mb-2">
        <p className="text-white">{tweetText}</p>
      </div>
    </div>
  )
}

export default TweetComponent