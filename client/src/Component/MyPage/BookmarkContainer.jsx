import styled from "styled-components";
import BookmarkList from "./BookmarkList";
import MystoreList from "./MystoreList";

const Container = styled.div`
  width: 594px;
  min-height: 721px;
  height: auto;
  border: none;
  border-radius: 30px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  margin-top: 40px;
  margin-left: 12px;
  overflow: auto;
`;
const Tilte = styled.div`
  font-size: var(--large-font);
  font-weight: bold;
  margin-left: 57px;
  padding-top: 57px;
`;

const BookmarkContainer = ({ data, setData }) => {
  return (
    <Container>
      {data.businessAccount ? (
        <>
          <Tilte>내 가게 목록</Tilte>
          <MystoreList data={data} setData={setData} />
        </>
      ) : (
        <>
          <Tilte>즐겨찾기 목록</Tilte>
          <BookmarkList data={data} setData={setData} />
        </>
      )}
    </Container>
  );
};

export default BookmarkContainer;
