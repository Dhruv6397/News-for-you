import './News.css';
import NewsCard from './NewsCard';
import LoadingBar from '.././assets/LoadingBar.gif';
import { useEffect,useState } from 'react';
import './Navbar.css'
import Search from '.././assets/Search.png';
import Logo from '.././assets/logo.png';


function News() {
    const pageSize =9;
    const [data,setData] = useState();
    const [page,setPage] = useState(1);
    const [search,searchSet] = useState("");
    const [condition,setCondition] = useState(true)
    const [totalPage,setTotalPage] = useState(1);
    const [toggle,toggleSet] = useState(true);
    useEffect(()=>{
        if(page>1){
          setCondition(false)
        }
        if(page===1){
          setCondition(true)
        }
        fetchData()
    },[page])
    const previous=()=>{
      if(page>1){
        setPage(page-1)
      }
    }
    const next=()=>{
      if(page<totalPage){
        setPage(page+1)
      }
    }
    const handleChange=(i)=>{
      setPage(i)
    }
    const btns=()=>{
      let pages=[];
      for(let i=1;i<totalPage;i++){
        if(i===11){
          break;
        }
        pages.push(
        <button className="page-nums-btn"onClick={()=>handleChange(i)}>{i}</button>);
      }
      return pages;
    }
    const fetchData = async()=>{
        let raw = await fetch(`https://newsapi.org/v2/top-headlines?q=${search}&country=us&page=${page}&pagesize=${pageSize}&apiKey=c489b610bb4d45d7bbc1a147200cfee9`)
        let parsedData = await raw.json()
        setData(parsedData)
        setTotalPage(Math.ceil(parsedData.totalResults/pageSize))
    }
    const showSearchBar=()=>{
      toggle?toggleSet(false):toggleSet(true)
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        fetchData();
    }
  return (
    <>
      {(data)?(< div className='home-container'>
        <div className='nav-container'>
      <>
      <nav className='navbar-container'>
        <div className='logo-div'>
            <img src={Logo} onClick={()=>{fetchData()}}alt='logop'/>
        </div>
        <ul className='list-container'>
            <li>SPORTS</li>
            <li>ENTERTAINMENT</li>
            <li>POLITICS</li>
            <li>BUSINESS</li>
            <li>EDUCATION</li>
            <li>TECHNOLOGY</li>
            <li>SCIENCE</li>
            <li>TRAVEL</li>
        </ul>
        <div className='search-icon'>
            <img onClick={showSearchBar} src={Search} alt="search icon" />
        </div>
        <div className='search-box-container' style={{display:toggle?"none":"block"}}>
          <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Search your query..' value={search} onChange={(e)=>searchSet(e.target.value)}/>
          </form>
        </div>
      </nav>
      
      </>

        </div>
        <div className='card-container'>
          {data.articles.map((item,index)=>(
            <NewsCard key={index} title={item.title} urlToImage={item.urlToImage} description={item.description} url = {item.url}/>
          ))}
        </div>
        <div className='pagination-container'>
          <button onClick={previous} disabled={condition} className='main-btn btn-prev'>Prev</button>
          {btns()}
          <button  onClick={next} className='main-btn btn-next'>Next</button>
        </div>
      </div>
      ):(<div className='loading-bar'>
          <img src={LoadingBar} alt='loadingbar'/>
        </div>)}
    </>
  );
}

export default News;
