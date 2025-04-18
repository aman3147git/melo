import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector(store => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  const isSender = message?.senderId === authUser?._id;

  const formattedTime = new Date(message?.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      ref={scroll}
      className={`flex items-end mb-4 ${isSender ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex items-end gap-2 ${isSender ? 'flex-row-reverse' : 'flex-row'}`}>
        
        <img
          src={isSender ? authUser?.profilePhoto : selectedUser?.profilePhoto}
          alt="avatar"
          className="w-9 h-9 rounded-full object-cover"
        />

        
        <div
          className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
            isSender
              ? 'bg-blue-600 text-white rounded-br-none'
              : 'bg-gray-200 text-black rounded-bl-none'
          }`}
        >
          <p>{message?.message}</p>
          <div className="flex justify-between items-center mt-1 text-[10px] opacity-70">
            <span>{formattedTime}</span>
            {isSender && (
              <span className="ml-2 text-xs">
                {message.isSeen ? '✔✔' : '✔'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
