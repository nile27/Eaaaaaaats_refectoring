import styled from "styled-components";
import Heart from "../style/img/redheart.svg";
import Check from "../style/img/check.svg";
import XBtn from "../style/img/x.svg";
import { useState } from "react";
import { api } from "../../Util/api";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";
import memberState from "../../state/atoms/SignAtom";
const Container = styled.div`
  border-bottom: 1px solid var(--black-350);
  width: 480px;
  display: flex;
  margin-left: 57px;
  flex-direction: column;
`;

const StoreName = styled.div`
  font-size: var(--large-font);
  margin-top: 30px;
  margin-bottom: 10px;
  color: black;
`;

const Content = styled.div`
  display: flex;
  align-items: flex-end;

  > .area {
    width: 600px;
    margin-right: 100px;
    font-size: var(--medium-font);
  }
  > .BtnDiv .menu {
    font-size: var(--medium-font);
  }
  > .BtnDiv .Btn {
    background: white;
  }
  > .BtnDiv {
    width: 80%;
    font-size: var(--medium-font);
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

const BtnDiv = styled.div`
  display: flex;
  width: 60px;
  background: white;
`;

const BookmarkItem = ({
  setData,
  data,
  setSlice,
  idx,
  setCount,
  count,
  memberdata,
}) => {
  const [del, setDel] = useState(false);
  const [member, setMember] = useRecoilState(memberState);
  const deleteFunc = (key) => {
    return api
      .delete(`/favorites/${key}`)
      .then(() => {
        setData({
          ...memberdata,
          favorites: [
            ...memberdata.favorites.slice(0, idx + count),
            ...memberdata.favorites.slice(
              idx + 1 + count,
              memberdata.favorites.length,
            ),
          ],
        });
        setMember({
          ...member,
          favorites: [
            ...member.favorites.slice(0, idx + count),
            ...member.favorites.slice(idx + 1 + count, member.favorites.length),
          ],
        });
        setSlice([...data.slice(0, idx), ...data.slice(idx + 1)]);
        setCount(0);
      })

      .catch((err) => console.error(err));
  };

  return (
    <Container>
      {!del ? (
        <>
          <Link to={`/detail/${data.restaurantId}`}>
            <StoreName>{data[idx].restaurantName}</StoreName>
          </Link>
          <Content>
            <div className="area">{data[idx].streetAddress}</div>
            <div className="BtnDiv">
              <div className="menu">{data[idx].category}</div>
              <button className="Btn" onClick={() => setDel(!del)}>
                <img src={Heart} alt="" />
              </button>
            </div>
          </Content>
        </>
      ) : (
        <>
          <Link to={`/detail/${data.restaurantId}`}>
            <StoreName>{data[idx].restaurantName}</StoreName>
          </Link>
          <Content>
            <div className="area">{data[idx].streetAddress}</div>
            <div className="BtnDiv">
              <div className="menu">{data[idx].category}</div>
              <BtnDiv className="BtnDiv">
                <button
                  className="Btn"
                  onClick={() => deleteFunc(data[idx].favoriteId)}
                >
                  <img src={Check} alt="" />
                </button>
                <button className="Btn" onClick={() => setDel(!del)}>
                  <img src={XBtn} alt="" />
                </button>
              </BtnDiv>
            </div>
          </Content>
        </>
      )}
    </Container>
  );
};

export default BookmarkItem;
