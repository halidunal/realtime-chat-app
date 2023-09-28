import React from 'react'

function Room({username, room, setUsername, setRoom, setInChat, socket}) {

	const join = () => {
		socket.emit("room", room)
		setInChat(true);
	}
	return (
		<div className='flex items-center justify-center h-full'>
			<div className='w-1/3 h-[300px] bg-blue-600 flex flex-col space-y-4 p-3 rounded-xl'>
				<h1 className='font-bold text-2xl my-4 text-center'>SOCKET.IO</h1>
				<input value={username} onChange={e => setUsername(e.target.value)} className='h-12 rounded-xl p-3 outline-none' placeholder='Username'/>
				<input value={room} onChange={e => setRoom(e.target.value)} className='h-12 rounded-xl p-3 outline-none' placeholder='Room ID'/>
				<div onClick={join} className='bg-green-600 font-bold h-12 pt-2 text-xl text-center rounded-xl cursor-pointer hover:text-white tracking-wider'>JOIN TO CHAT</div>
			</div>
		</div>
	)
}

export default Room
