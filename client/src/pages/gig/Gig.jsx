import React from 'react'
import './Gig.scss'
import { Slider } from 'infinite-react-carousel/lib'
import {  useParams } from 'react-router-dom'
import {  useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Reviews from '../../components/reviews/Reviews'

const Gig = () => {

  const {id} = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ['single_gig'],
    queryFn:async () => await axios.get(`/api/gigs/single/${id}`).then((res)=>{return res.data})
      
  })

  const userId = data?.userId;
  
  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,

  } = useQuery({
    queryKey: ["single_user"],
    queryFn: () =>
      axios.get(`/api/user/single/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });

console.log(isLoading,error,data);

  return (
    <div className="gig">
      <div className="container">
        <div className="left">
          <span className="breadcrumbs">Liverr &gt; Graphics & Design &gt;</span>
          {isLoadingUser || isLoading ? "Loading..." : errorUser || error ? "Something went wrong! Try again later" : <>
          <h1>{data?.title}</h1>
          <div className="user">
            <img
              className="pp"
              src={dataUser.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
              alt=""
              />
            <span>{dataUser?.username}</span>
            <div className="stars">
              {Array(Math.round(data?.totalStars / data?.starNumber)).fill().map((item,i)=>{
                return <img src="/img/star.png" alt="" key={i} />
              })}
              <span>{Math.round(data?.totalStars / data?.starNumber)}</span>
            </div>
          </div>
          <Slider slidesToShow={1} arrowsScroll={1} className="slider">
          {data?.images.map((img,i)=>
             (<img
              src={img}
              alt=""
              key={i}
            />)
            )}
        </Slider>
          </>}
        {isLoadingUser || isLoading ? "Loading..." : errorUser || error ? "Something went wrong! Try again later" : <>
        <h2>About This Gig</h2>
          <p>
            {data?.desc}
          </p>
          <div className="seller">
            <h2>About The Seller</h2>
            <div className="user">
              <img
                src={dataUser?.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                alt=""
              />
              <div className="info">
                <span>{dataUser?.username}</span>
                <div className="stars">
                {Array(Math.round(data?.totalStars / data?.starNumber)).fill().map((item,i)=>{
                return <img src="/img/star.png" alt="" key={i} />
              })}
                  <span>{Math.round(data?.totalStars / data?.starNumber)}</span>
                </div>
                <button>Contact Me</button>
              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">{dataUser?.country}</span>
                </div>
                <div className="item">
                  <span className="title">Member since</span>
                  <span className="desc">{dataUser?.createdAt.split('T')[0]}</span>
                </div>
                <div className="item">
                  <span className="title">Avg. response time</span>
                  <span className="desc">4 hours</span>
                </div>
                <div className="item">
                  <span className="title">Last delivery</span>
                  <span className="desc">1 day</span>
                </div>
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr />
              <p>
               {dataUser?.desc}
              </p>
            </div>
          </div>
        </>
        }
          <Reviews gigId={id}/>
        </div>
        <div className="right">
          <div className="price">
            <h3>1 AI generated image</h3>
            <h2>$ 59.99</h2>
          </div>
          <p>
            I will create a unique high quality AI generated image based on a
            description that you give me
          </p>
          <div className="details">
            <div className="item">
              <img src="/img/clock.png" alt="" />
              <span>2 Days Delivery</span>
            </div>
            <div className="item">
              <img src="/img/recycle.png" alt="" />
              <span>3 Revisions</span>
            </div>
          </div>
          <div className="features">
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Prompt writing</span>
            </div>
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Artwork delivery</span>
            </div>
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Image upscaling</span>
            </div>
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Additional design</span>
            </div>
          </div>
          <button>Continue</button>
        </div>
      </div>
    </div>
  )
}

export default Gig