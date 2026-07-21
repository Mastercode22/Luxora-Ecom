import { useCart } from "../../context/CartContext";
import ProductCard from "../../components/home/ProductCard";
import { FiShoppingCart, FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
export default function Cart() {
  
const {
    items: cartItems,
    count,
    removeItem,
    updateQty
  } = useCart();
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif italic text-3xl text-ink">My Cart</h1>
          <p className="text-ink/60 mt-1">Review Your Ite</p>
        </div>
        <div className="text-primary font-medium bg-primary/10 px-4 py-2 rounded-xl">
          {count}"Items"</div>
      </div>

      {cartItems.length > 0 ? <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => <div key={item.id} className="flex gap-4 p-4 bg-surface/50 backdrop-blur-md border border-line/60 rounded-3xl items-center relative">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-secondary/30 rounded-2xl overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-lg font-bold text-ink">{item.name}</h3>
                  <p className="text-ink/50 text-sm mt-1">{item.category}</p>
                  
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-3 bg-secondary/30 border border-line/50 rounded-xl px-2 py-1">
                      <button onClick={() => updateQty(item.id, item.quantity - 1)} className="p-1 hover:bg-secondary rounded-lg text-ink/70 hover:text-ink transition-colors">
                        <FiMinus size={14} />
                      </button>
                      <span className="font-bold text-ink text-sm w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, item.quantity + 1)} className="p-1 hover:bg-secondary rounded-lg text-ink/70 hover:text-ink transition-colors">
                        <FiPlus size={14} />
                      </button>
                    </div>
                    <span className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>

                <button onClick={() => removeItem(item.id)} className="absolute top-4 right-4 p-2 text-red-400 hover:bg-red-400/10 rounded-xl transition-colors" aria-label="Remove item">
                  <FiTrash2 size={18} />
                </button>
              </div>)}
          </div>
          
          <div className="lg:col-span-1 h-fit bg-surface/50 backdrop-blur-md border border-line/60 rounded-3xl p-6">
            <h2 className="text-xl font-serif italic text-ink mb-6">Order Summary</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-ink/70">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-ink/70">
                <span>Shipping</span>
                <span>Calculated At C</span>
              </div>
              <div className="flex justify-between text-ink/70">
                <span>Taxes</span>
                <span>Calculated At C</span>
              </div>
              <div className="pt-4 border-t border-line/60 flex justify-between text-ink font-bold text-lg mt-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Link to="/checkout" className="block w-full py-4 mt-8 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl text-center shadow-[0_4px_20px_-4px_rgba(233,30,99,0.3)] transition-all">Proceed To Chec</Link>
          </div>
        </div> : <div className="bg-surface/50 backdrop-blur-md border border-line/60 rounded-3xl p-12 text-center">
          <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4 text-ink/30">
            <FiShoppingCart size={32} />
          </div>
          <h3 className="text-xl text-ink font-serif italic mb-2">Your Cart Is Em</h3>
          <p className="text-ink/50 max-w-md mx-auto mb-6">Looks Like You</p>
          <Link to="/shop" className="inline-block px-8 py-3 bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-xl transition-colors">Continue Shoppi</Link>
        </div>}
    </div>;
}