import MyInfo from "../Component/MyPage/MyInfo";
import MyReviewContainer from "../Component/MyPage/MyReviewContainer";
import styled from "styled-components";
import BookmarkContainer from "../Component/MyPage/BookmarkContainer";
import { api } from "../Util/api";
import { useState, useEffect } from "react";
const RowBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyPage = () => {
  const [resdata, setResData] = useState({ favorites: [] });
  useEffect(() => {
    api
      .get("members/mypage")
      .then((res) => {
        console.log("res", res.data.favorites);
        setResData({ ...resdata, favorites: res.data.favorites });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      {console.log("data", resdata)}
      <MyInfo data={resdata} setData={setResData} />
      <RowBox>
        <MyReviewContainer data={resdata} setData={setResData} />
        <BookmarkContainer data={resdata} setData={setResData} />
      </RowBox>
    </Container>
  );
};

export default MyPage;
