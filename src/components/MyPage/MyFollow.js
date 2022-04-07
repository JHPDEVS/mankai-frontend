import { Button } from '@mui/material';
import * as React from 'react';
import { BiPaperPlane } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
export default function FollowList() {

  return (
    <div className='snap-y'>

<div class="min-h-screen grid place-items-center bg-indigo-400">
    <div class="bg-indigo-100 h-80 w-64 rounded-md">
      <div class="flex justify-center items-center leading-none">
        <img
          src="https://images.unsplash.com/photo-1585554414787-09b821c321c0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="pic"
          class="h-40 w-56 rounded-md shadow-2xl mt-6 transform -translate-y-10 hover:-translate-y-4 transition duration-700"
        />
      </div>
      <div class="p-3">
        <p class="block mb-1">Modelling</p>
        <p class="text-xs tracking-tighter text-gray-600">
          When it is your time, it’s your time. There is no point in worrying
          about what you can’t control.
        </p>
      </div>
      <div class="flex justify-between items-center p-2">
        <div class="flex">
          <i class="test1">favorite_border</i>
          <span class="text-sm ml-1">100</span>
          <i class="test2">message</i>
          <span class="text-sm ml-1">60</span>
        </div>
      </div>
    </div>
  </div>

    </div>
  );
}


