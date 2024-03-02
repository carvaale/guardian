import React, { useRef, useState, useEffect } from 'react';
import 'tailwind-scrollbar';

const Chat = () => {
    interface Conversation {
        role: string;
        content: string;
    }

    // States
    const [value, setValue] = useState<string>("");
    const [conversation, setConversation] = useState<Conversation[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, [conversation]);

    const handleInput = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        }, []
    );

    const handleKeyDown = async(e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const botMessage = { role: 'bot', content: getBotResponse(value) };
            const chatHistory= [...conversation,{role: 'user', content: value}]
            // try{
            //     const response = await axios.post('API_URL', {
            //         messages:chatHistory
            //     },{
            //         headers:{
            //             "Content-Type":"application/json",
            //         },
            //     });
            //     const data = await response.data
                setValue("")
                setConversation([
                    ...chatHistory,
                    botMessage
                    // {role: 'bot', content: data.result.choices[0].message.content}
                    //the data.result.choices blah blah
                    //need to know how your endpoint is sending the response and in which format.
                ])

            //}
            // catch(error){
            //     console.error(error)
            //}

        }
    }

    const getBotResponse = (userInput: string): string => {
        const lowerCaseInput = userInput.toLowerCase();
        if (lowerCaseInput.includes('hello') || lowerCaseInput.includes('hi')) {
          return 'Hi there! How can I assist you today?';
        } else if (lowerCaseInput.includes('how are you')) {
          return 'I am just a bot, but thanks for asking!';
        } else {
          return 'I am not sure how to respond to that.';
        }
    };

    const handleRefreshChat = () => {
        inputRef.current?.focus();
        setValue("");
        setConversation([]);
    };

    return (
        <div className='w-full h-full flex flex-col items-center justify-center p-4'>
            <div className="w-full max-w-md flex flex-col items-center mb-4">
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-3xl text-xs'
                    onClick={handleRefreshChat}>Refresh Chat</button>
            </div>
            <div ref={chatContainerRef} className='w-full max-w-2xl h-96 p-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-300 scrollbar-track-transparent'>
                {conversation.map((item, index) => (
                    <div key={index} className={`flex ${item.role === 'bot' ? 'justify-start' : 'justify-end'} my-1`}>
                        <div className={`max-w-72 min-w-48 p-3 ${item.role === 'bot' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'} rounded-lg shadow`}>
                            <strong>{item.role === 'bot' ? 'Guardian' : 'User'}</strong>
                            <br />
                            {item.content}
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full max-w-md flex flex-col items-center mb-4">
                <input
                    placeholder="Type here"
                    className='w-full px-4 py-2 border border-gray-300 shadow-sm rounded-md mb-2'
                    value={value} onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                />
            </div>
        </div>
    );
};

export default Chat;
