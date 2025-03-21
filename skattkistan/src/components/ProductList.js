"use client"

import { useEffect, useState } from "react"
import { supabase } from "../superbaseClient"
import ProductCard from "./productCards"
import ProductModal from "./ProductModal"

const ProductsList = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)

        const { data, error } = await supabase.from("produkter").select("*")

        if (error) {
          console.error("Error fetching products:", error)
          setError(`Kunde inte hämta produkter: ${error.message}`)
        } else {
          if (data && data.length > 0) {
            console.log("Found products:", data.length)
            setProducts(data)
          } else {
            console.log("No products found in database")
          }
        }
      } catch (err) {
        console.error("Unexpected error:", err)
        setError("Ett oväntat fel inträffade")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])


  if (loading) return <div className="loading">Laddar produkter...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} onClick={() => setSelectedProduct(product)} />
        ))}
      </div>


      {/* Visa modalen om en produkt är vald */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  )
}

export default ProductsList

