"use client"

import { useState, useEffect } from "react"
import { Trash2, Heart } from "lucide-react"
import "./style/varukorg.css"
import { getCartItems, removeFromCart, addToWishlist } from "../components/varukorgFunction"
import { Link } from "react-router-dom"

const Varukorg = () => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCart = async () => {
      const items = await getCartItems()
      setCartItems(items)
      setLoading(false)
    }

    fetchCart()
  }, [])

  const handleRemove = async (id) => {
    const success = await removeFromCart(id)
    if (success) {
      setCartItems(cartItems.filter((item) => item.id !== id))
    }
  }

  const moveToWishlist = async (id) => {
    console.log(`Moved item ${id} to wishlist`);
  
    const success = await addToWishlist(id);
    if (success) {
      const removeSuccess = await removeFromCart(id);
      if (removeSuccess) {
        setCartItems(cartItems.filter((item) => item.id !== id));
      }
    }
  }

  const calculateTotal = () => cartItems.reduce((total, item) => total + item.produkter.pris, 0)
  const calculateShipping = () => (52)

  if (loading) {
    return <div className="loading-container">Laddar varukorg...</div>
  }

  return (
    <div className="varukorg-container">
      <div className="varukorg-header">
        <h1>Varukorg</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Din varukorg är tom</p>
          <button className="continue-shopping-btn">Fortsätt handla</button>
        </div>
      ) : (
        <div className="varukorg-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={item.produkter.bild_url || "/placeholder.svg"} alt={item.produkter.namn} />
              </div>
              <div className="item-details">
                <h3>{item.produkter.namn}</h3>
                <p className="item-price">{item.produkter.pris} kr</p>
                <div className="item-meta">
                  <p>Storlek: {item.produkter.storlek}</p>
                  <p>Kategori: {item.produkter.typ_av_klader}</p>
                </div>
                <div className="item-actions">
                  <button
                    className="wishlist-btn"
                    onClick={() => moveToWishlist(item.id)}
                    aria-label="Lägg till i önskelistan"
                  >
                    <Heart size={16} />
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(item.id)}
                    aria-label="Ta bort från varukorgen"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
            ))}
          </div>

          <div className="order-summary">
            <h2>Sammanfattning</h2>

            <div className="summary-row">
              <span>Beställningsvärde</span>
              <span>{calculateTotal()} kr</span>
            </div>

            <div className="summary-row">
              <span>Leveransavgift</span>
              <span>{calculateShipping()} kr</span>
            </div>

            {calculateShipping() === 0 && (
              <div className="free-shipping-notice">
                <p>Fri frakt på din beställning!</p>
              </div>
            )}

            <div className="summary-row total">
              <span>SUMMA</span>
              <span>{calculateTotal() + calculateShipping()} kr</span>
            </div>

            <Link to="/kassa">
              <button className="checkout-btn">FORTSÄTT TILL KASSAN</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Varukorg

