import { atom } from "recoil";

export const reviewHeader = atom({
  key: "reviewHeader",
  default: {
    restaurantId: "",
    restaurantName: "",
    content: "",
    tel: "",
    open_time: "",
    image: "",
    createdAt: "",
    modifiedAt: "",
    total_views: 0,
    total_reviews: 0,
    totalFavorite: 0,
    menu: [],
    reviews: [],
    tagRestaurants: [],
    favorites: [],
    category: "",
    streetAddress: "",
    detailAddress: "",
    latitude: 0,
    longitude: 0,
    member: {},
  },
});
