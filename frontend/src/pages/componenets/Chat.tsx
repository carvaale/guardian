import React, { useRef, useState, useEffect } from "react";
import "tailwind-scrollbar";
import img from "../../assets/default-pfp.png";

const Chat = () => {
  interface Conversation {
    role: string;
    content: string;
  }

  // States
  const [value, setValue] = useState<string>("");
  const [conversation, setConversation] = useState<Conversation[]>([
    { role: "user", content: "Hello" },
    { role: "bot", content: "Hi there! How can I assist you today?" },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  const handleInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [],
  );

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const botMessage = { role: "bot", content: getBotResponse(value) };
      const chatHistory = [...conversation, { role: "user", content: value }];
      // try{
      //     const response = await axios.post('API_URL', {
      //         messages:chatHistory
      //     },{
      //         headers:{
      //             "Content-Type":"application/json",
      //         },
      //     });
      //     const data = await response.data
      setValue("");
      setConversation([
        ...chatHistory,
        botMessage,
        // {role: 'bot', content: data.result.choices[0].message.content}
        //the data.result.choices blah blah
        //need to know how your endpoint is sending the response and in which format.
      ]);

      //}
      // catch(error){
      //     console.error(error)
      //}
    }
  };

  const getBotResponse = (userInput: string): string => {
    const lowerCaseInput = userInput.toLowerCase();
    if (lowerCaseInput.includes("hello") || lowerCaseInput.includes("hi")) {
      return "Hi there! How can I assist you today?";
    } else if (lowerCaseInput.includes("how are you")) {
      return "I am just a bot, but thanks for asking!";
    } else {
      return "I am not sure how to respond to that.";
    }
  };

  const handleRefreshChat = () => {
    inputRef.current?.focus();
    setValue("");
    setConversation([
      { role: "user", content: "Hello" },
      { role: "bot", content: "Hi there! How can I assist you today?" },
    ]);
  };

  return (
    <div
      id="topo"
      className="flex flex-row justify-center items-center gap-x-8 w-full h-screen"
    >
      <div className="mt-20 w-1/5 h-3/4 flex flex-col rounded-3xl bg-neutral-800 p-4">
        <h1 className="text-xl font-bold text-white pl-4">Chat Log</h1>
        <div id="bar" className="w-full bg-neutral-50 mt-4" />

        <div className="flex flex-col gap-y-2 mt-4">
          <span className="chat-log">Sample Chat 1</span>
          <span className="chat-log">Sample Chat 2</span>
          <span className="chat-log">Sample Chat 3</span>
        </div>

        <div id="bar" className="w-full bg-neutral-50 mt-auto mb-2" />
        <div className="flex flex-row items-center">
          <img
            src={img}
            alt="Profile Picture"
            className="h-10 w-10 rounded-full"
          />
          <span className="text-white font-bold ml-2">Username</span>
        </div>
      </div>
      <div className="mt-20 w-1/2 h-3/4 flex flex-col items-center rounded-3xl bg-neutral-800 p-4">
        <div className="w-full flex flex-row items-center justify-between mb-4 px-4">
          <h1 className="text-xl font-bold text-white">Meta Llama2 7B</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-3xl text-xs"
            onClick={handleRefreshChat}
          >
            Refresh Chat
          </button>
        </div>
        <div id="bar" className="w-full bg-neutral-50" />
        <div
          ref={chatContainerRef}
          className="w-full max-w-2xl h-96 p-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-300 scrollbar-track-transparent"
        >
          {conversation.map((item, index) => (
            <div
              key={index}
              className={`flex ${item.role === "bot" ? "justify-start" : "justify-end"} my-1`}
            >
              <div
                className={`max-w-72 min-w-48 p-3 ${item.role === "bot" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"} rounded-lg shadow`}
              >
                <strong>{item.role === "bot" ? "Guardian" : "User"}</strong>
                <br />
                {item.content}
              </div>
            </div>
          ))}
        </div>
        <div id="bar" className="w-full bg-neutral-50 mb-2" />
        <div className="w-full flex flex-row items-center gap-x-2 px-20">
          <input
            placeholder="Enter Prompt"
            className="w-full pl-2 py-2 border border-gray-300 shadow-sm rounded-md"
            value={value}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            ref={inputRef}
          />
          <button className="w-1/4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:bg-blue-700 transition duration-500 rounded-md text-white">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
