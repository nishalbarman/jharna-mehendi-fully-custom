import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const SERVER_URL = `${process.env.EXPO_PUBLIC_API_URL}/`;

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL,
    prepareHeaders: (headers, { getState }) => {
      headers.set(
        "Authorization",
        `Bearer ${(getState() as any).auth.jwtToken}`
      );
      headers.set(
        "producttype",
        `${(getState() as any).product_store.productType}`
      );
      return headers;
    },
  }),
  tagTypes: ["Wishlist"],
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => ({
        url: `wishlist`,
        method: "GET",
      }),
      transformResponse: (response) => (response as any).data,
      // transformErrorResponse: (response) => response.message,
      providesTags: ["Wishlist"],
    }),

    addWishlist: builder.mutation({
      query: ({ id }) => ({
        url: `wishlist`,
        method: "POST",
        body: { productId: id },
      }),
      invalidatesTags: ["Wishlist"],
      // transformErrorResponse: (response) => response.message,
    }),

    deleteWishlist: builder.mutation({
      query: ({ _id }) => ({
        url: `wishlist/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
      // transformErrorResponse: (response) => response.message,
    }),

    updateWishlist: builder.mutation({
      query: ({ id, item }) => ({
        url: `wishlist/${id}`,
        method: "PATCH",
        body: item,
      }),
      invalidatesTags: ["Wishlist"],
      // transformErrorResponse: (response) => response.message,
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddWishlistMutation,
  useUpdateWishlistMutation,
  useDeleteWishlistMutation,
} = wishlistApi;
