import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase_url = "https://cydexirgvhfcdabxhuoy.supabase.co";
const supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5ZGV4aXJndmhmY2RhYnhodW95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4OTU5MTksImV4cCI6MjAzNzQ3MTkxOX0.o61wGQ6Fwz6tSelK2-7pkhhfDkJ9MPzC8h7mdKjn_nY";
const supabase = createClient(supabase_url, supabase_key);

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [focusedMessageId, setFocusedMessageId] = useState(null);

  const location = useLocation();
  const messageRefs = useRef({});

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    if (id && messageRefs.current[id]) {
      setFocusedMessageId(parseInt(id));
      messageRefs.current[id].scrollIntoView({ behavior: 'smooth' });
      messageRefs.current[id].focus();
    }
  }, [location, messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      console.log(import.meta.env.VITE_API_URL);
      /*
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/messages`
      );
      const data = await response.json();
      */
      const { data } = await supabase.from("Messages").select();
      setMessages(data);
    };
    fetchMessages();
  }, []);

  const calculateRowSpan = (message) => {
    const baseSpan = message.image ? 11 : 3;
    const messageLength = message.message.length;
    const additionalSpan = Math.ceil(messageLength / 60);

    return baseSpan + additionalSpan;
  };

  return (
    <div
      className="sm:p-4 grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]"
      style={{ gridAutoRows: "30px", gridGap: "0px" }}
    >
      {messages?.length > 0 &&
        messages.map((message) => (
          <div
            key={message.id}
            ref={(el) => (messageRefs.current[message.id] = el)}
            tabIndex={-1}
            className={`bg-yellow-100 text-black rounded-lg shadow-lg m-2 border-[2px] border-yellow-300 ${
              focusedMessageId === message.id ? "ring-8 ring-blue-600 outline-none" : ""
            }`}
            style={{
              gridRowEnd: `span ${calculateRowSpan(message)}`,
            }}
            onBlur={() => setFocusedMessageId(null)} // Remove focus when the element loses focus
          >
            {message.image && (
              <img
                src={`${message.image}`}
                alt="message image"
                className="w-full h-56 object-cover rounded-t-[8px] mb-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/300x200";
                }}
              />
            )}
            <div className="p-4">
              <div className="">
                <p className="">{message.message}</p>
              </div>
              <div className="mt-2 text-right font-semibold">
                <p className="italic ">- {message.name}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MessageList;
