import styled from "styled-components";
import StoreKeywordSearch from "../Component/StoreListComp/StoreKeywordSearch";
import StoreKeywordResult from "../Component/StoreListComp/StoreKeywordResult";
import StoreMap from "../Component/StoreListComp/StoreMap";
import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  searchResultsState,
  searchKeywordState,
} from "../state/atoms/SearchStateAtom";
import { keywordsAtom } from "../state/atoms/keywordsAtom";
import memberState from "../state/atoms/SignAtom";
import { api } from "../Util/api";

const StoreListWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  width: 1200px;
  margin: auto;
`;
const StoreMainWrap = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 40px;
`;
export const Title = styled.h2`
  font-size: var(--x-large-font);
  font-weight: 800;
  margin-bottom: 16px;
  flex-basis: 100%;
`;
const StoreList = () => {
  const searchKeyword = useRecoilValue(searchKeywordState);
  const [result, setSearchResultsState] = useRecoilState(searchResultsState);
  const [userDataFavor, setUserDataFavor] = useState([]);
  const [member] = useRecoilState(memberState);
  const [, setKeywords] = useRecoilState(keywordsAtom);

  const tagKeywordArr = () => {
    let arr = [];
    result.map((item) => {
      return item.tagRestaurants.map((i) => {
        return !arr.includes(i.tag.name) ? arr.push(i.tag.name) : null;
      });
    });
    setKeywords(arr);
  };

  useEffect(() => {
    const encodedCategoryName = encodeURIComponent(searchKeyword);
    const fetchData = async () => {
      try {
        const refreshPageData = await api.get(
          `/restaurants/search?keyword=${encodedCategoryName}`,
        );
        setSearchResultsState(refreshPageData.data);
        tagKeywordArr();
        setUserDataFavor(member.favorites);
      } catch (error) {
        console.error("에러", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <StoreListWrap>
        <StoreKeywordSearch />
        <StoreMainWrap>
          <StoreKeywordResult
            userDataFavor={userDataFavor}
            setUserDataFavor={setUserDataFavor}
          />
          <StoreMap />
        </StoreMainWrap>
      </StoreListWrap>
    </>
  );
};

export default StoreList;
