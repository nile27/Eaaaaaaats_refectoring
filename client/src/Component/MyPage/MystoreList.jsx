import { useState, useEffect } from "react";
import MystoreItem from "./MystoreItem";
import styled from "styled-components";

const Nonediv = styled.div`
  width: 100%;
  text-align: center;
  font-size: var(--large-font);
  padding-top: 50px;
`;

const Pagediv = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PrevBtn = styled.button`
  border: none;
  background: none;
  margin: 20px 10px;
  font-size: 15px;
`;

const BookmarkList = ({ data, setData }) => {
  const [slice, setSlice] = useState([]);
  let [count, setCount] = useState(0);

  const Pagenation = (count) => {
    setCount(count);
    setSlice(data.restaurants.slice(count, count + 6));
  };

  useEffect(() => {
    setSlice(data.restaurants.slice(0, 6));
  }, [data]);

  return (
    <>
      <div>
        {data ? (
          slice.map((item, idx) => (
            <MystoreItem
              key={item.restaurantId}
              idx={idx}
              memberdata={data}
              data={slice}
              count={count}
              setSlice={setSlice}
              setCount={setCount}
              setData={setData}
            />
          ))
        ) : (
          <Nonediv>등록된 가게가 없습니다.</Nonediv>
        )}
      </div>
      <Pagediv>
        {count > 0 ? (
          <PrevBtn onClick={() => Pagenation((count -= 6))}>이전</PrevBtn>
        ) : null}
        {count + 6 < data.restaurants.length ? (
          <PrevBtn onClick={() => Pagenation((count += 6))}>다음</PrevBtn>
        ) : null}
      </Pagediv>
    </>
  );
};

export default BookmarkList;
