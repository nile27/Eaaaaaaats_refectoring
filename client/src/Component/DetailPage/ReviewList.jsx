import ReviewItem from "./ReviewItem";
import Button from "../style/StyleButton";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { reviewDataAtom } from "../../state/atoms/reviewDataAtom";
import { api } from "../../Util/api";

const ReviewListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReviewList = ({ data }) => {
  const [displayData, setDisplayData] = useState(data);
  const [, setReviewData] = useRecoilState(reviewDataAtom);
  const [allReviews, setAllReviews] = useState(false);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    setDisplayData(data);
  }, [data]);

  useEffect(() => {
    if (allReviews || displayData.length <= 5) {
      setShowButton(false);
    } else {
      setShowButton(true);
    }
  }, [allReviews, displayData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/restaurants/1`); //${restaurant-id}
        setReviewData(response.data.reviews);
        console.log(response.data.reviews);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // const showReview = allReviews
  //   ? displayData
  //   : displayData
  //   ? displayData.slice(0, 5)
  //   : [];
  const showReview = allReviews ? displayData : displayData.slice(0, 5);

  const handleMoreReviews = () => {
    setAllReviews(true);
  };
  const handleDelete = (reviewData) => {
    const deleteData = displayData.filter(
      (item) => item.reviewId !== reviewData.reviewId,
    );
    setReviewData(deleteData);
  };
  return (
    <ReviewListContainer>
      {showReview.map((data) => (
        <ReviewItem key={data.reviewId} data={data} onDelete={handleDelete} />
      ))}
      {showButton && (
        <Button btnstyle="Btn" onClick={handleMoreReviews}>
          리뷰 더 불러오기
        </Button>
      )}
    </ReviewListContainer>
  );
};

export default ReviewList;