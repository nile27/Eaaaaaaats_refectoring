import styled from "styled-components";
import { useRecoilState } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Component/style/StyleButton";
import ResInfo from "../Component/ReviewPageComp/ResInfo";
import ReviewInfo from "../Component/ReviewPageComp/ReviewInfo";
import { ReviewState } from "../state/atoms/ReviewAtom";
import { api } from "../Util/api";

const BasicContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 90px 0px;
`;
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  align-items: center;
  Button {
    margin: 0px 0px 0px 10px;
  }
`;

const Review = () => {
  const navi = useNavigate();
  const [ReviewData, setReviewData] = useRecoilState(ReviewState);
  const { res_id } = useParams();

  // 리뷰 남기기 버튼
  const handleSubmit = async () => {
    await api
      .post(`/reviews/restaurants/${res_id}`, ReviewData)
      .then(() => {
        console.log("잘보냄");
        alert("리뷰를 등록하였습니다.");
        setReviewData({});
        navi(-1);
      })
      .catch((err) => {
        alert("리뷰 등록에 실패하였습니다.");
        console.log(err);
        console.log(ReviewData, "리뷰 페이지");
      });
  };
  // 취소 버튼
  const handleCancel = () => {
    navi(-1);
  };
  return (
    <BasicContainer className="Basic-Container">
      <ResInfo />
      <ReviewInfo />
      <ButtonContainer className="Button-Container">
        <Button btnstyle="Btn" onClick={handleSubmit}>
          리뷰 남기기
        </Button>
        <Button btnstyle="Btn" onClick={handleCancel}>
          취 소
        </Button>
      </ButtonContainer>
    </BasicContainer>
  );
};

export default Review;