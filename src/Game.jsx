import React, { useState } from 'react'
import './Game.scss'
import { Link } from 'react-router-dom'

const Game = () => {
    const [open, setOpen] = useState(false)
    const currentUser = {
        id: 1,
        username: "Rahil Shah",
        isSeller: true
    }
    return (
        <div className="game">
            <div className="nav-container">
                <div className="logo">
                    <Link to={"/"} className='link' >
                        <span className="text">fiverr</span>
                    </Link>
                    <span className="dot">.</span>
                </div>
                <div className="links">
                    <span>Fiverr Business</span>
                    <span>Explore</span>
                    <span>English</span>
                    <span>Sign In</span>
                    {!currentUser?.isSeller && <span>Become a Seller</span>}
                    {!currentUser && <button>Join</button>}
                    {currentUser && (
                        <div className="user" onClick={() => setOpen(!open)} >
                            <img src="https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
                            <span>{currentUser?.username}</span>
                            {open && <div className="options"  >
                                {currentUser?.isSeller && (
                                    <>
                                        <Link className='link' to={"/mygigs"}>Gigs</Link >
                                        <Link className='link' to={"/add"} >Add New Gig</Link >
                                    </>
                                )}
                                <Link className='link' to={"/orders"} >Orders</Link >
                                <Link className='link' to={"/messages"} >Messages</Link >
                                <Link className='link' to={"/"} >Logout</Link>
                            </div>}
                        </div>
                    )}
                </div>
            </div>
            <div className="featured-container">
                <div className="text-container">
                    <h1>
                        Find the perfect <span>freelance</span> services for your business
                    </h1>
                    <div className="search">
                        <div className="searchInput">
                            <img src="./img/search.png" alt="" />
                            <input type="text" placeholder='Try "building mobil app"' />
                        </div>
                        <button>Search</button>
                    </div>
                    <div className="popular">
                        <span>Popular:</span>
                        <button>Web Design</button>
                        <button>WordPress</button>
                        <button>Logo Design</button>
                        <button>AI Services</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Game