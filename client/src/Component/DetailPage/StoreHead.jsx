import styled from "styled-components";
import ImgBtn from "../style/ImgBtn";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import memberState from "../../state/atoms/SignAtom";
import { api } from "../../Util/api";

const Container = styled.div`
  margin: 70px 0 0 auto;
  width: 1200px;
`;

const StoreName = styled.div`
  font-size: var(--xx-large-font);
`;

const StoreInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Tags = styled.div`
  font-size: var(--x-large-font);
  color: var(--black-350);
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;
const TagItem = styled(Tags)`
  margin-right: 10px;
`;

const SubInfo = styled.div`
  & > * {
    margin-right: 20px;
    /* "& > *" 는 SubInfo 컴포넌트의 모든 자식 요소를 선택하는 선택자 */
  }
  > span {
    font-size: var(--x-large-font);
    color: var(--black-200);
  }
`;

const StoreHead = ({ data, setData }) => {
  const navigate = useNavigate();
  const [member, setMember] = useRecoilState(memberState);

  const [heartIcon, setHeartIcon] = useState(false);
  const [shareIcon, setShareIcon] = useState(false);

  useEffect(() => {
    if (!heartFunc(data.favorites)) {
      setHeartIcon(!heartIcon);
    }
  }, []);

  const heartFunc = (b) => {
    const filterArr = b.filter((item) => {
      return item.memberId === member.memberId ? item : null;
    });

    return filterArr.length === 0;
  };

  const deleteFunc = (a) => {
    const filterArr = a.filter((item) => {
      return item.memberId === member.memberId ? item : null;
    });

    return filterArr[0].favoriteId;
  };

  const handleHeartIcon = async () => {
    try {
      if (!member.memberId) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }
      if (!heartIcon) {
        await api.post(`/favorites/restaurant/${data.restaurantId}`);
        const response = await api.get(
          `/restaurants/${data.restaurantId}/detail`,
        );
        const res = await api.get(`members/mypage`);
        setData({
          ...data,
          totalFavorite: data.totalFavorite + 1,
          favorites: response.data.favorites,
        });
        setMember({ ...member, favorites: res.data.favorites });
      } else {
        const endpoint = deleteFunc(data.favorites);
        await api.delete(`/favorites/${endpoint}`);
        const res = await api.get(`members/mypage`);
        const response = await api.get(
          `/restaurants/${data.restaurantId}/detail`,
        );
        setData({
          ...data,
          totalFavorite: data.totalFavorite - 1,
          favorites: response.data.favorites,
        });
        setMember({ ...member, favorites: res.data.favorites });
      }
      setHeartIcon(!heartIcon);
    } catch (error) {
      console.error("즐겨찾기에러:", error);
    }
  };

  const handleShareIcon = async () => {
    setShareIcon(!shareIcon);
    const link = window.location.href;

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(link);
        alert("링크가 복사되었습니다.");
      } else {
        alert("이 브라우저에서는 링크 복사를 지원하지 않습니다.");
      }
    } catch (error) {
      alert("링크 복사에 실패했습니다.");
      console.error("링크 복사 오류:", error);
    }
  };

  return (
    <div>
      <Container>
        <StoreName>{data.restaurantName}</StoreName>
        <StoreInfo>
          <Tags>
            {data.tagRestaurants &&
              data.tagRestaurants.map((tag) => (
                <TagItem key={tag.tag.tagId}>{`#${tag.tag.name}`}</TagItem>
              ))}
          </Tags>
          <SubInfo>
            <ImgBtn imgstyle={"View"} />
            <span>{data.total_views}</span>
            <ImgBtn
              imgstyle={heartIcon ? "HeartActive" : "Heart"}
              onClick={handleHeartIcon}
            />
            <span>{data.totalFavorite}</span>
            <ImgBtn imgstyle={"Share"} onClick={handleShareIcon} />
          </SubInfo>
        </StoreInfo>
      </Container>
    </div>
  );
};

export default StoreHead;
