export type Address = {
  [key: string]: any;
  user?: string;
  city: string;
  country: string;
  locality: string;
  postalCode: string;
  prefix: string;
  state: string;
  streetName: string;

  longitude?: number;
  latitude?: number;

  createdAt?: string;
  updatedAt?: string;
};

export type User = {
  email: string;
  mobileNo: string;
  name: string;
  _id: string;
};

export type OrderAddress = {
  physicalAddress: Address;
  location: [number, number];
};

export type Order = {
  address: OrderAddress;
  center: string | null;
  color: string | null;
  createdAt: string;
  orderGroupID: string;
  orderStatus: string;
  orderType: string;
  paymentMode: string;
  paymentStatus: string;
  paymentTxnId: string;
  pickupDate: string | null;
  previewImage: string;
  price: number;
  product: string;
  quantity: number;
  rentPickedUpDate: string | null;
  rentReturnDueDate: string | null;
  shipmentType: string;
  shippingPrice: number;
  rentDays?: number;
  size: string | null;
  title: string;
  trackingLink: string;
  updatedAt: string;
  user: string;
  __v?: number | string | undefined | null;
  _id: string;
};

export type OrderGroup = {
  address: OrderAddress;
  createdAt: string;
  orderGroupID: string;
  orderType: string;
  orders: Order[];
  paymentTransactionId: string;
  totalDocumentCount: number;
  totalPrice: number;
  user: User;
};

export type PaymentSummary = {
  paymentStatus: string;
  shippingPrice: number;
  subTotalPrice: number;
  totalPrice: number;
};

export type Base64StringWithType = {
  base64String: string;
  type: String;
};

export type ProductVariant = {
  product: string;

  previewImage: string | null;
  slideImages: string[] | null;

  size: string;
  color: string;

  availableStocks: number;

  shippingPrice: number;
  rentingPrice: number;
  discountedPrice: number;
  originalPrice: number;

  [key: string]: any;
};

export type Category = {
  _id?: string;
  categoryName: string;
  categoryImageUrl: string | null;
  createdAt?: string;
  updatedAt?: string;
  __v?: number | undefined;
  categoryKey?: string;
};

export type Feature = {
  _id?: string;
  featureName: string;
  featureDescription: string;
  featureImageUrl: string | null;
  createdAt?: string;
  updatedAt?: string;
  __v?: number | undefined;
  featureKey?: string;
};

export type Role = {
  _id?: string;
  roleName: string;
  roleNumber: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number | undefined;
  roleKey?: string;
};

export type Product = {
  previewImage: string | null;
  title: string;
  category: string | Category;
  slideImages: string[] | null;
  description: string;

  stars?: string | number;
  totalFeedbacks?: string | number;

  //   productType: ["rent", "buy", "both"];
  productType?: string;

  shippingPrice: string | number;
  availableStocks: string | number;
  rentingPrice: string | number;
  discountedPrice: string | number;
  originalPrice: string | number;

  isVariantAvailable: boolean;
  productVariant?: ProductVariant[] | { [key: string]: ProductVariant };
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
};

export type Center = {
  name: string;
  email: string;
  password: string;
  mobileNo: string;
  centerName: string;
  prefix?: string;
  streetName: string;
  locality: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  longitude: number | string;
  latitude: number | string;
  addressProofImage:
    | string
    | string[]
    | File[]
    | FileList
    | Base64StringWithType[]
    | null;
  idProofImage:
    | string
    | string[]
    | File[]
    | FileList
    | Base64StringWithType[]
    | null;
  centerImage: string[] | File[] | FileList | Base64StringWithType[] | null;
  address?: Address;
  _id?: string;
};

export interface HeroProduct {
  category: string;
  shortDescription: string;
  imageUrl: string;
  productReference: string; // Reference to a product ID
  [key: string]: any;
}

export interface DynamicPage {
  title: string;
  description: string;
  shortDescription: string;
  avatar: string;
  cover: string;
  slug: string;
  [key: string]: any;
}

export interface Testimonial {
  _id?: string;
  clientName: string;
  clientSpeech: string;
  clientAvatar: string;
  clientChatImage: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface NewArrival {
  _id?: string;
  title: string;
  shortDescription: string;
  imageUrl: string;
  productId: string;
  createdAt?: Date;
  updatedAt?: Date;
  [key: string]: any;
}
