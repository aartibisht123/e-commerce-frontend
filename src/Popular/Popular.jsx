import { useEffect, useState } from 'react'
import './Popular.css'
import Item from '../Item/Item'

const Popular = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('https://e-commerce-backend-1-ix83.onrender.com/popularinwomen')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <div className="popular">
      <div className="popular-item">
        {products.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  )
}

export default Popular
