import MyInfo from "../Component/MyPage/MyInfo";
import MyReviewContainer from "../Component/MyPage/MyReviewContainer";
import BookmarkContainer from "../Component/MyPage/BookmarkContainer";
import memberState from "../state/atoms/SignAtom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
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
  const [resdata, setResData] = useState({
    businessAccount: true,
    email: "",
    location: "",
    favorites: [],
    memberId: 0,
    nickName: "",
    restaurants: null || [],
    reviews: [],
  });
  const [member, setMember] = useRecoilState(memberState);

  useEffect(() => {
    api
      .get("members/mypage")
      .then((res) => {
        setResData({
          ...resdata,
          businessAccount: res.data.businessAccount,
          email: res.data.email,
          location: res.data.address.streetAddress,
          favorites: res.data.favorites,
          memberId: res.data.memberId,
          nickName: res.data.nickName,
          restaurants: res.data.restaurants,
          reviews: res.data.reviews,
          image: res.data.image,
        });
        setMember({
          ...member,
          memberId: res.data.memberId,
          email: res.data.email,
          streetAddress: res.data.address.streetAddress,
          businessAccount: res.data.businessAccount,
          nickName: res.data.nickName,
          latitude: res.data.address.latitude,
          longitude: res.data.address.longitude,
          favorites: res.data.favorites,
        });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container>
      <MyInfo userData={resdata} setUserData={setResData} />
      <RowBox>
        <MyReviewContainer data={resdata} setData={setResData} />
        <BookmarkContainer data={resdata} setData={setResData} />
      </RowBox>
    </Container>
  );
};

export default MyPage;
