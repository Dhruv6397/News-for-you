import './News.css';
import Navbar from './Navbar';
import NewsCard from './NewsCard';
import { useEffect,useState } from 'react';


function News() {
    const [data,setData] = useState()
    useEffect(()=>{
        fetchData()
    },[])
    const fetchData = async()=>{
        let raw = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=c489b610bb4d45d7bbc1a147200cfee9')
        let parsedData = await raw.json()
        setData(parsedData)
        console.log(parsedData.articles)
    }
  return (
    <>
      {(data)?(< div className='home-container'>
        <div className='nav-container'>
          <Navbar/>
        </div>
        <div className='card-container'>
          {data.articles.map((item,index)=>(
            <NewsCard key={index} title={item.title} urlToImage={item.urlToImage} description={item.description} url = {item.url}/>
          ))}
        </div>
        <div className='pagination-container'>
          <button className='btn-prev'>Prev</button>
          <button className='btn-next'>Next</button>
        </div>
      </div>
      ):("data not found")}
    </>
  );
}

export default News;
