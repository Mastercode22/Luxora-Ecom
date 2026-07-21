import { useReviews } from "../../context/ReviewContext";
import { FiStar, FiEdit2, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
export default function ReviewsTab() {
    const {
    reviews,
    deleteReview
  } = useReviews();
  return <div className="space-y-8">
      <div>
        <h1 className="font-serif italic text-3xl text-ink">My Reviews</h1>
        <p className="text-ink/60 mt-1">Manage The Revi</p>
      </div>

      {reviews.length > 0 ? <div className="space-y-6">
          {reviews.map((review, idx) => {
        return <motion.div key={review.id} initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: idx * 0.1
        }} className="bg-surface/50 backdrop-blur-md border border-line/60 rounded-3xl p-6 flex flex-col md:flex-row gap-6 relative group">
              {/* Product Image */}
              <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-secondary/50">
                <img src={review.productImage} alt={review.productName} className="w-full h-full object-cover" />
              </div>

              {/* Review Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 className="text-ink font-bold text-lg">{review.productName}</h3>
                    <p className="text-ink/40 text-sm">{review.date}</p>
                  </div>
                  <div className="flex text-primary">
                    {[...Array(5)].map((_, i) => <FiStar key={i} className={i < review.rating ? "fill-current" : "text-ink/20"} size={14} />)}
                  </div>
                </div>
                <p className="text-ink/70 text-sm italic">"{review.comment}"</p>
              </div>

              {/* Actions */}
              <div className="flex md:flex-col gap-3 justify-center md:border-l border-line/30 md:pl-6">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-secondary/50 hover:bg-secondary text-ink rounded-xl text-sm font-medium transition-colors">
                  <FiEdit2 size={14} />Edit</button>
                <button onClick={() => deleteReview(review.id)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-sm font-medium transition-colors">
                  <FiTrash2 size={14} />Delete</button>
              </div>
            </motion.div>;
      })}
        </div> : <div className="bg-surface/50 backdrop-blur-md border border-line/60 rounded-3xl p-12 text-center">
          <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4 text-ink/30">
            <FiStar size={32} />
          </div>
          <h3 className="text-xl text-ink font-serif italic mb-2">No Reviews Yet</h3>
          <p className="text-ink/50 max-w-md mx-auto mb-6">You Havent Rev</p>
          <Link to="/account/orders" className="inline-block px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium transition-colors">Review Past Ord</Link>
        </div>}
    </div>;
}