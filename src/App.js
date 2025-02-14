import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products,setProducts] = useState([])
  const [page,setPage] = useState(1)
  const [totalPages,setTotalPages] = useState(0);
  const fetchProducts = async()=>{
    const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${page*10 - 10}`)
    const data = await res.json()
    console.log("🚀 ~ fetchProducts ~ data:", data)
    if(data && data?.products){
      setProducts(data.products)
      setTotalPages(Math.ceil(data.total/10));
    }
  }
  const prevPage = () =>{
    setPage(page - 1)
  }
  const nextPage = () =>{
    setPage(page + 1)
  }
  useEffect(()=>{
    fetchProducts()
  },[page])
  return (
    <div className='container'>
      {products.length > 0 && <div className='products'>
        {products.map((prod)=>{
          return (<span className='products__single' key={prod.id}>
            <img src={prod.thumbnail} alt={prod.title}/>
            <span>{prod.title}</span>
          </span>)
        })}
        </div>}
        {products.length >0 && <div className='pagination'>
          {(page !== 1 && page > 1) && <span className='navigate' onClick={()=>{prevPage()}}>◀</span>}
          {[...Array(totalPages)].map((_,i)=>{
            return(<span onClick={()=>{setPage(i+1)}} className={`pages ${i+1 === page ? 'currentPage' : ''}`} key={i}>{i+1}</span>)
          })}
          {(page !== totalPages) && <span  className='navigate' onClick={()=>{nextPage()}} >▶</span>}
           </div>}
    </div>
  );
}

export default App;
