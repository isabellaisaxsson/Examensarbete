"use client"

import { useEffect, useState } from "react"
import { supabase } from "../superbaseClient"
import ProductCard from "./productCards"

const ProductsList = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
  if (!products || products.length === 0) {
    return (
      <div className="no-products">
        <p>Inga produkter hittades i databasen</p>
        <p className="debug-info">Kontrollera att:</p>
        <ul className="debug-list">
          <li>Tabellen "produkter" finns i din Supabase databas</li>
          <li>Det finns data i tabellen</li>
          <li>Du har rätt behörigheter (policies) inställda</li>
        </ul>
      </div>
    )
  }

  // Use the ProductCard component to render the products
  return <ProductCard products={products} />
}

export default ProductsList

