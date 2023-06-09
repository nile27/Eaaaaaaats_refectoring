import { atom } from "recoil";

export let RestaurantState = atom({
  key: "RestaurantState",
  default: [
    {
      restaurantName: "test 상호명",
      content: "2test 소개글",
      tel: "1234-1234",
      open_time: "12:34~56:78",
      streetAddress: "test 도로명주소",
      detailAddress: "test 상세주소",
      latitude: 12.3123123,
      longitude: 12.1231321,
      photoUrl: "amazon.S3.url",
      category: "test 한식",
      menu: [
        { name: "test 떡볶이", price: 10000 },
        { name: "test 쌀떡", price: 12000 },
      ],
      tag: [{ name: "test 세로수길" }, { name: "test 매운맛" }],
    },
    {
      restaurantName: "콜드스퀘어",
      category: "한식",
      streetAddress: "서울시 강남구 어디 어디 312",
      open_time: "10:00~22:00",
      tel: "1234-1234",
      lat: 37.62197524055062,
      lng: 127.16017523675508,
    },
    {
      restaurantName: "하남돼지집",
      category: "중식",
      streetAddress: "서울시 강북구 어디 어디 312",
      open_time: "10:00~22:00",
      tel: "1234-1234",
      lat: 37.620842424005616,
      lng: 127.1583774403176,
    },
    {
      restaurantName: "수유리우동",
      category: "양식",
      streetAddress: "서울시 강서구 어디 어디 312",
      open_time: "10:00~22:00",
      tel: "1234-1234",
      lat: 37.624915253753194,
      lng: 127.15122688059974,
    },
    {
      restaurantName: "맛닭꼬",
      category: "일식",
      streetAddress: "서울시 강동구 어디 어디 312",
      open_time: "10:00~22:00",
      tel: "1234-1234",
      lat: 37.62456273069659,
      lng: 127.15211256646381,
    },
  ],
});
