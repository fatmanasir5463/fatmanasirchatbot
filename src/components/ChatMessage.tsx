import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { motion } from 'motion/react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const isBot = message.sender === 'bot';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex w-full mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`relative group max-w-[80%] sm:max-w-[70%] px-4 py-3 rounded-2xl shadow-sm ${
          isBot
            ? 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
            : 'bg-indigo-600 text-white rounded-tr-none'
        }`}
      >
        <p className="text-sm sm:text-base whitespace-pre-wrap break-words">
          {message.text}
        </p>
        
        <span className={`text-[10px] mt-1 block opacity-50 ${isBot ? 'text-slate-500' : 'text-indigo-100'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>

        {isBot && (
          <button
            onClick={handleCopy}
            className="absolute -right-10 top-2 p-1.5 rounded-lg bg-white border border-slate-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all opacity-0 group-hover:opacity-100 shadow-sm"
            title="Copy message"
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            {copied && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
                Copied!
              </span>
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
};
