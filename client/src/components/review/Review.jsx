import React from 'react'
import './Review.scss'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Review = ({review}) => {
    const {
        isLoading,
        error,
        data
    
      } = useQuery({
        queryKey: ["review_user"],
        queryFn: () =>
          axios.get(`/api/user/single/${review?.userId}`).then((res) => {
            return res.data;
          })
      });
    return (
        <>
            <div className="item">
                {isLoading ? "Loading..." : error ? "Something went wrong! Try again..." :
                <div className="user">
                <img
                    className="pp"
                    src={data?.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                    alt=""
                />
                <div className="info">
                    <span>{data?.username}</span>
                    <div className="country">
                        <span>{data?.country}</span>
                    </div>
                </div>
            </div>

                }
                <div className="stars">
                    {Array(review?.star).fill().map((item,i)=>(
                        <img src="/img/star.png" alt="" key={i} />
                    ))}
                    <span>{review?.star}</span>
                </div>
                <p>
                    {review?.desc}
                </p>
                <div className="helpful">
                    <span>Helpful?</span>
                    <img src="/img/like.png" alt="" />
                    <span>Yes</span>
                    <img src="/img/dislike.png" alt="" />
                    <span>No</span>
                </div>
            </div>
            <hr />
        </>
    )
}

export default Review