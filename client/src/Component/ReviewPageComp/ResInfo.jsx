import styled from "styled-components";

import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { reviewHeader } from "../../state/atoms/ReviewHeader";

const RestaurantContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid var(--black-200);
  .res-info {
    margin-bottom: 10px;
    .res-title {
      margin-bottom: 10px;
      font-size: var(--xx-large-font);
      font-weight: 600;
    }
    .tag-ul {
      display: flex;
      flex-wrap: wrap;
      li {
        list-style: none;
        margin: 4px 8px 0px 0px;
        span {
          font-size: var(--large-font);
          color: var(--black-600);
        }
      }
    }
  }
  .res-sosial {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: -30px;
    .imgBtn {
      display: flex;
      span {
        margin: -4px 15px 0px 5px;
        font-size: var(--x-large-font);
      }
    }
  }
`;

const ResInfo = () => {
  const resInfo = useRecoilValue(reviewHeader);

  return (
    <RestaurantContainer className="restaurant-Container">
      <div className="res-info">
        <span className="res-title">{resInfo.restaurantName}</span>
        <ul className="tag-ul">
          {resInfo.tagRestaurants?.map((taginfo) => (
            <li key={taginfo.tag.tagId}>
              <span>#{taginfo.tag.name}</span>
              <Link to={`/itemlist/search?=${taginfo.tag.name}`}></Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="res-sosial"></div>
    </RestaurantContainer>
  );
};

export default ResInfo;
