import React from 'react'
import './CatCard.scss'
import { Link } from 'react-router-dom'

const CatCard = ({item}) => {
  return (
    <Link to={'/gigs?cat=dancing'}>
   <div className="catCard">
    <img src={item.img} alt="Image"/>
    <span className="desc">{item.desc}</span>
    <span className="title">{item.title}</span>
   </div>
    </Link>
  )
}

export default CatCard