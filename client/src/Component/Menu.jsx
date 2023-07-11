import Line from "../Component/style/img/Line 2.png";
import styled from "styled-components";
const Cdiv = styled.ul`
  width: 100%;
  min-width: 300px;
  min-height: 150px;
  height: auto;
  padding: 10px;
  white-space: no-wrap;
  flex-direction: column;
`;

const Li = styled.ol`
  width: auto;
  height: 10px;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const El = styled.div`
  width: auto;
  min-width: 140px;
  text-align: left;
  margin-top: 20px;
  padding: 10px;
  font-size: var(--medium-font);
`;

const Won = styled.div`
  width: auto;
  text-align: left;
  margin-top: 20px;
  padding: 10px;
  font-size: var(--medium-font);
`;
const Center = styled.img`
  width: 100%;
  max-width: 250px;
  height: 3px;
  margin-top: 20px;
`;

export default function List({ menu, i }) {
  let Slice = menu.slice(i, i + 10);
  return (
    <Cdiv>
      {Slice.map((item) => {
        return (
          <Li key={item.menuId}>
            <El>{item.name}</El> <Center src={Line} />
            <Won>{item.price}원</Won>
          </Li>
        );
      })}
    </Cdiv>
  );
}
