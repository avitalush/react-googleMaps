import { useNavigate } from 'react-router-dom'

export default function Products() {
    const product = [{id:12,name:"Pen"},{id:23,name:"Pencil"},{id:34,name:"Eraser"},{id:45,name:"Ruler"}]
    // const product = [10, 20, 30, 40, 50]
    const navigate = useNavigate()

    function handleClick(id) {
        navigate(`/product/${id}`)
    }

    return <div>
        {product.map((pro, index) => <button key={index} onClick={() => handleClick(pro.id)}>{pro.name}</button>)}
    </ div>

}