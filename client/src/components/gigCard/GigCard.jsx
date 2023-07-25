import React, { useEffect, useState } from 'react'
import './GigCard.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const GigCard = ({item}) => {
  
  const { isLoading, error, data } = useQuery({
    queryKey: ['gig'],
    queryFn:async () => await axios.get(`/api/user/single/${item.userId}`).then((res)=>{return res.data})
      
  })
  return (
    <Link to={`/gig/${item._id}`} className='link' >
    <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">
          {isLoading ? "Loading..." : error ? "Something went wrong! Try again later" : (<div className="user">
            <img src={data.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="" />
            <span>{data.username}</span>
          </div>)
          }
          <p>{item.desc}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>{Math.round(item.totalStars / item.starNumber)}</span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>
              $ {item.price}
              <sup>99</sup>
            </h2>
          </div>
        </div>
    </div>
    </Link>
  )
}

export default GigCard