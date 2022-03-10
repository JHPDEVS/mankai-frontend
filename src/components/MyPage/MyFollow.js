import { Button } from '@mui/material';
import * as React from 'react';
import { BiPaperPlane } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
export default function FollowList() {

  return (
    <div className='snap-y'>

      <div >
        {followData.map((item)=>(
          <div className='border border-gray-300 rounded py-2 px-4 my-3'>
            <img className="rounded-full border border-gray-100 w-12 h-12 inline-block" src={`${item.img}?w=248&fit=crop&auto=format`} alt="user image" />
            <Button href="/youProfile">{item.name}</Button>
            <span className='text-gray-500'> {item.sogae}</span>
            <BsThreeDots className='float-right my-4 mx-4'/>
            <BiPaperPlane className='float-right my-4'/>
          </div>
        ))}
            
      </div>

    </div>
  );
}


const followData = [
    {
      id:1,
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      name: '이현호',
      sogae: '나는 돼지다'
    },
    {
        id:2,
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        name: '박주형',
        sogae: '나는 히틀러다'
      },
      {
        id:3,
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        name: '장성규',
        sogae: '나는 착하다'
      },
      {
        id:4,
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        name: '서재열',
        sogae: '나는 신중하다'
      },
      {
        id:5,
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        name: '최지성',
        sogae: '나는 운동한다'
      },
]