import React, { useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { getProducts } from "./states/features/products/actions"
function App (){
const products = useSelector(state => state.products)
const dispatch = useDispatch()
console.log(products)

useEffect(()=>{
dispatch(getProducts())
},[dispatch])
return (
<div>App </div>
)
}
export default App