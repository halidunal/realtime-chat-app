import React, { useEffect, useState } from 'react'

function Chat({socket, username, room}) {
	const [message,setMessage] = useState("");
	const [messageList, setMessageList] = useState([]);

	useEffect(() => {
		socket.on("messageReturn",(data)=> {
			setMessageList((prev) => [...prev,data])
		})
		console.log(socket)
	},[socket])

	const send = async () => {
		const messageContent = {
			username: username,
			message: message,
			room: room,
			date: new Date().getHours() + ":" + new Date().getMinutes()
		}
		await socket.emit("message", messageContent);
		setMessageList((prev) => [...prev, messageContent])
		setMessage("")
	}

	return (
		<div className='flex items-center justify-center h-full'>
			<div className='w-1/3 h-[500px] bg-blue-300 relative'>
				<div className='w-full h-16 bg-green-600 flex items-center p-3'>
					<div className='w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold'>
						PP
					</div>
				</div>
				<div className='w-full h-[370px] overflow-y-auto pb-2'>
					{
						messageList && messageList.map((msg, key) => (
							<div key={key} className={username === msg.username ? 'flex justify-end' : 'flex justify-start'}>
								<div className={`${username === msg.username ? "bg-green-200 rounded-tr-none" : "bg-white rounded-tl-none"} w-2/3 h-auto text-sm rounded-xl  m-2 p-2`}>
									<div>{msg.message}</div>
									<div className='flex justify-between'>
										<p className='text-xs text-gray-400'>{msg.username}</p>
										<p className='text-xs text-gray-400'>{msg.date}</p>
									</div>
								</div>
							</div>
						))
					}
				</div>
				<div className='absolute bottom-0 left-0 w-full p-4'>
					<input value={message} onKeyDown={e => e.key === "Enter" && send()} onChange={e => setMessage(e.target.value)} className='w-3/4 h-12 border p-3 outline-none rounded-3xl rounded-r-none' placeholder='Your message...'/>
					<button onClick={send} className='w-1/4 bg-green-600 h-12 text-white hover:bg-green-800 font-bold rounded-3xl rounded-l-none'>Send</button>
				</div>
			</div>

		</div>
	)
}

export default Chat
