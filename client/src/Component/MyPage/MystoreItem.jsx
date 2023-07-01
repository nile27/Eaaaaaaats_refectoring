import styled from "styled-components";
import { api } from "../../Util/api";
import XBtn from "../style/img/x.svg";
import { Link } from "react-router-dom";
const Container = styled.div`
  border-bottom: 1px solid var(--black-350);

  width: 480px;
  display: flex;
  margin-left: 57px;
  flex-direction: column;
`;
const StoreName = styled.div`
  display: flex;
  color: black;
  justify-content: space-between;
  font-size: var(--large-font);
  margin-top: 30px;
  margin-bottom: 10px;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 33px;
  color: black;

  > .title {
    font-size: var(--medium-font);
  }
  > .streetAddress {
    font-size: var(--medium-font);
  }
`;

const XContainer = styled.div`
  width: 30px;
  min-height: 33px;
  position: relative;
  right: 23px;
  padding-top: 20px;
  > .Btn {
    background: none;
  }
`;
const Condiv = styled.div`
  width: 100%;
  display: flex;
  background: white;
`;

const MystoreItem = ({
  setData,
  setSlice,
  memberdata,
  data,
  count,
  idx,
  setCount,
}) => {
  const deleteFunc = (key) => {
    if (window.confirm(`${data[idx].restaurantName}가게를 삭제하시겠습니까?`)) {
      return api
        .delete(`/restaurants/${key}`)
        .then(() => {
          setData({
            ...memberdata,
            restaurants: [
              ...memberdata.restaurants.slice(0, idx + count),
              ...memberdata.restaurants.slice(
                idx + 1 + count,
                memberdata.restaurants.length,
              ),
            ],
          });
          setSlice([...data.slice(0, idx), ...data.slice(idx + 1)]);
          setCount(0);
        })
        .catch((err) => console.log("삭제", err));
    }
  };

  return (
    <Condiv>
      <Link to={`/detail/${data.restaurantId}`}>
        <Container>
          <StoreName>{data[idx].restaurantName}</StoreName>
          <Content>
            <div className="title">{data[idx].category}</div>
            <div className="streetAddress">{data[idx].streetAddress}</div>
          </Content>
        </Container>
      </Link>
      <XContainer>
        <button
          className="Btn"
          onClick={() => deleteFunc(data[idx].restaurantId)}
        >
          <img src={XBtn} alt=""></img>
        </button>
      </XContainer>
    </Condiv>
  );
};

export default MystoreItem;
