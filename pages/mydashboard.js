import React from 'react'
import Image from 'next/image'
import User from '../models/User'
import mongoose from 'mongoose'
var jwt = require('jsonwebtoken');
import { Jwt } from 'jsonwebtoken';

const MyDashBoard = ({user}) => {
  console.log(user.events);
  return (
    <div>
      <div className='flex flex-col items-center space-y-6'>
      <h1 className='text-left font-semibold text-5xl p-2 text-[#28b498]'>Events Registered</h1>
      <div className="relative text-gray-600 focus-within:text-gray-400">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
        </span>
        <input type="search" name="q" className='w-96 pr-3 pl-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-full focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm bg-[#eef6f3]' placeholder="Search..." autoComplete="off" />
      </div>
      <div className='w-fit grid grid-flow-row grid-cols-3 gap-40'>
        {user.events.length!==0 && user.events.map((event,i)=>{return <div key={i} className='grid-item flex flex-col border-2 shadow-lg hover:scale-105 transition-all items-center rounded-3xl w-fit p-6 justify-center'>
          <div>
            <Image src='/image1.jpg' className='object-contain' alt='' width={300} height={300} />
          </div>
          <div>
            <p>Event Name: {event.event_name}</p>
            <p>Start Time: {event.start_time}</p>
            <p>End Time: {event.end_time}</p>
          </div>
        </div>})}
        
      </div>
    </div>
    </div>
  )
}

export default MyDashBoard

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI)
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: context.query.token
    })
  })
  let response = await res.json()
  const user = await User.findOne({email: response.user.email})
  return {
    props: {
      user: JSON.parse(JSON.stringify(user))
    }
  }
}

