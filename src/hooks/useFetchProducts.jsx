import { useEffect, useState } from "react"
import api from "../../services/api"

const useFetchProducts = (url) => {

   const [products,setProducts] = useState([])
   const [isLoading,setIsLoading] = useState(true)
   const [isError,setIsError] = useState(null)

   useEffect(()=>{
      const getData = async()=>{
         try {
            const response = await api.get(url)
            setProducts(response.data)
         } catch (error) {
            setIsError(error.message)
         } finally{
            setIsLoading(false)
         }
      }
      getData()
   },[url])
   
  return {products,isLoading,isError}
}

export default useFetchProducts
