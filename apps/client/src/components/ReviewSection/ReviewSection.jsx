"use client";

import React, { useState } from "react";
import ReviewStats from "@/components/ReviewForm/ReviewStats";
import ReviewList from "@/components/ReviewForm/ReviewList";
import ReviewForm from "@/components/ReviewForm/ReviewForm";

import { RiChatQuoteLine, RiStarFill } from "react-icons/ri";

function ReviewSection({ product, cookie }) {
  console.log(product);

  const [reviews, setReviews] = useState([]);
  const [hasPurchased, setHasPurchased] = useState(false); // You'll need to determine this from your API

  const handleReviewSubmit = (newReview) => {
    setReviews([newReview, ...reviews]);
  };

  return (
    <section className="mt-2 container mx-auto">
      {/* Review Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <RiChatQuoteLine className="text-red-500" size={24} />
          Customer Reviews
        </h2>
        <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
          <RiStarFill className="text-yellow-400 mr-1" />

          <span className="font-medium">{product?.stars}</span>
          <span className="text-gray-500 ml-1">
            ({product?.totalFeedbacks} reviews)
          </span>
        </div>
      </div>
      {hasPurchased && (
        <div>
          <ReviewForm
            productId={product._id}
            onReviewSubmit={handleReviewSubmit}
            cookie={cookie}
          />
        </div>
      )}

      <div className="md:col-span-2 mb-10 mt-3">
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
          <ReviewList productId={product._id} cookie={cookie} />
        </div>
      </div>
    </section>
  );
}

export default ReviewSection;
