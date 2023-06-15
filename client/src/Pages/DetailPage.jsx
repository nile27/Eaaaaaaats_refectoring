import StoreIntro from "../Component/DetailPage/StoreIntro";
import StoreInfo from "../Component/DetailPage/StoreInfo";
import StoreHead from "../Component/DetailPage/StoreHead";
import ReviewContainer from "../Component/DetailPage/ReviewContainer";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../Util/api";
import { useSetRecoilState } from "recoil";
import { reviewDataAtom } from "../state/atoms/reviewDataAtom";
import { reviewHeader } from "../state/atoms/ReviewHeader";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DetailPage = () => {
  const { res_id } = useParams();
  const setReviewData = useSetRecoilState(reviewDataAtom);
  const setReviewHeader = useSetRecoilState(reviewHeader);
  const [data, setData] = useState({
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
  });

  useEffect(() => {
    api
      .get(`/restaurants/${res_id}/detail`)
      .then((res) => {
        setData(res.data);
        setReviewData(res.data.reviews);
        setReviewHeader(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Container>
        <StoreHead data={data} setData={setData} />
        <StoreIntro data={data} setData={setData} />
        <StoreInfo data={data} setData={setData} />
        <ReviewContainer data={data} setData={setData} />
      </Container>
    </>
  );
};

export default DetailPage;
