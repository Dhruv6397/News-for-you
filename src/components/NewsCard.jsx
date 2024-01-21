import React from 'react'
import Img from '.././assets/DemoImage.png';
import './NewsCard.css'
export default function NewsCard({title,urlToImage,description,url}) {
  return (
    <>
      <div className="main-container">
        <div className="title">
            <h2>{title?title.slice(0,70):"Title not found"}</h2>
        </div>
        <div className="img">
            <img src={urlToImage?urlToImage:Img} alt="card"  />
        </div>
        <div className="description">
          <p>{description?description:"Description not found"}</p>
        </div>
        <div className="btn">
            <a href={url} className='button'>Read more</a>
        </div>
      </div>
    </>
  )
}
