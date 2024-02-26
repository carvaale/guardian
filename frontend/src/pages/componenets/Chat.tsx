import * as React from 'react';
import '../../index.css';
console.clear();
//Added package npm install --save-dev tailwind-scrollbar
const messages = [
    {
        author: 'loading',
        body: '...',
        timeout: 0
    },
    {
        author: 'bot',
        body: 'Hello there!,',  
        timeout: 800
    },
    {
        author: 'bot',
        body: 'I am a simple chat bot, here to help you with any questions you may have',
        timeout: 1500
    }


];

const responses = [
    'This bot silly',
    'No really, its a gimic, quickly made in my Codepen',
    [
        'Ok here is a joke...',
        'When Alexander Graham Bell invented the telephone he had three missed calls from Chuck Norris'
    ],
    [
        'Want another? Ok last one...',
        'Chuck Norris can win a game of Connect 4 with 3 moves'
    ],
    'I\'m out, good bye.',
    [
        'Joe Momma',
    ],
    ['Hello'],
    ['How'],
    ['you'],
    ['why'],
    ['are'],
    ['you'],
    ['so'],
    ['silly'],
    ['?'],
];


const Message = (props : any) => {
    const { author, body } = props.data;

    let finalBody;

    if (Array.isArray(body)) {
        finalBody = body.map((item, index) => {
            return <a href={item.url} 
            className="inline-block bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 border border-blue-700 rounded cursor-pointer transition ease-in-out duration-300"
             key={index}>{item.text}</a>;
        });
    }
    else {
        finalBody = <div className={`inline-block px-4 py-2 rounded-lg shadow ${author === 'human' ? 'bg-gray-500 text-white rounded-br-none' : 'bg-green-500 text-black rounded-tl-none'} max-w-3/4`}>{body}</div>;
    }

    return (
        <li className={`mb-4 ${author === 'human' ? 'text-right' : 'text-left'}`}>
            {finalBody}
        </li>
    );
};


 export class Chat extends React.Component <{}, { messages: any, responses: any}>{
    constructor(props : any) {
        super(props);

        this.state = {
            messages: [],
            responses: 0
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.demo = this.demo.bind(this);
        this.mockReply = this.mockReply.bind(this);
    }

    componentDidMount() {
        this.demo();
    }

    demo() {

        this.setState({
            messages: [],
            responses: 0
        });

        messages.map((item, index) => {
            setTimeout(() => this.addMessage(item), item.timeout);
        });
        
        // window.addEventListener('keydown', (e) => {
        //     // if d for demo
        //     if (e.keyCode == "68") {
        //         this.demo();
        //     }
        // });
        
        setTimeout(() => {
            this.setState({
                messages: this.state.messages.slice(1, this.state.messages.length)
            });
        }, 700);

    }

    addMessage(item : any) {
        this.setState({
            messages: [...this.state.messages, item]
        });

        setTimeout(() => {
            const items = document.querySelectorAll('li');
            const lastItem = items[items.length - 1];
            const chatList = document.querySelector('.c-chat__list');
            if (chatList) {
                chatList.scrollTop = lastItem.offsetTop + parseInt(lastItem.style.height);
            }
        }, 100);
    }

    handleSubmit(e : any) {
        e.preventDefault();
        
        this.addMessage({
            author: 'human',
            body: e.target.querySelector('input').value
        });

        this.mockReply();

        e.target.reset();

    }

    mockReply() {
        let response : string | any;

        if (this.state.responses == 0) {
            response = responses[this.state.responses];
        }
        else {
            if(responses[this.state.responses]) response = responses[this.state.responses];
        }

        if(response){
            this.setState({
                responses: this.state.responses + 1
            });

            if(Array.isArray(response)){
                response.map((item, index) => {
                    setTimeout(() => this.addMessage({ author: 'bot', body: item }), 600 + (500 * index));
                });
            }
            else {
                setTimeout(() => this.addMessage({ author: 'bot', body: response }), 600);
            }
        }
    }

    render() {
        
        let cssClass = ['c-chat'];

        if(this.state.messages.length > 4){
            cssClass.push('c-chat--ready');
        }

        if(this.state.messages.length == 5){
            document.querySelector('input')?.focus();
        }

        return (
            
            <div className=" flex flex-col min-h-screen  bg-[#222] h-screen">
                <div className="flex-1 overflow-y-auto w-1/2 p-4 mx-auto px-4 py-2">
                    <ul className="list-none p-0 m-0 h-5/6
                    scrollbar-thumb-rounded scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 overflow-y-scroll pr-10">
                        {this.state.messages.map((message : any, index : any) => (
                            <Message key=   {index} data={message} />
                        ))}
                    </ul>
                </div>
                    <div className=' mx-auto  w-1/2'>
                    <form className=" w-1/2 bottom-10 left-100 bg-[#333] fixed border rounded-3xl flex justify-between " onSubmit={this.handleSubmit}>
                        <input type="text" name="input" className=" w-full p-4 font-mono text-[#fff] bg-transparent focus:outline-none" placeholder="Type your message here..." autoComplete="off" required />
                    </form>
                    </div>
                
            </div>
            
        );
    }
}

export default Chat;