import styled from "styled-components";
import MenuItem from "./MenuItem";
import Button from "./../style/StyleButton";
import Modal from "../Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import memberState from "../../state/atoms/SignAtom";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 370px;
  width: 1200px;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  justify-content: space-between;
`;

const InfoItem = styled.div`
  margin-bottom: 30px;
`;

const MenuList = styled(InfoList)`
  justify-content: space-between;
`;

const InfoName = styled.div`
  font-size: var(--large-font);
  font-weight: bold;
  margin-bottom: 10px;
`;
const InfoContent = styled.div`
  font-size: var(--medium-font);
`;

const MoreMenu = styled.button`
  font-size: var(--large-font);
  background-color: transparent;
`;

const Menudiv = styled.div`
  width: auto;
  min-width: 650px;
`;

const Modify = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  margin-top: 70px;
  position: relative;
  > span {
    font-size: var(--medium-font);
    color: var(--black-350);
  }
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0%;
    width: ${(props) => (props.showButton ? "880px" : "980px")};

    height: 1px;
    background-color: var(--black-200);
    transform: translateY(-50%); /* 수직 가운데 정렬 */
  }
`;

const StoreInfo = ({ data }) => {
  const navigate = useNavigate();
  const onClickModify = () => {
    navigate(`/editstore/${data.restaurantId}`);
  };

  const [modal, setModal] = useState(false);
  const showModal = () => {
    setModal(!modal);
  };
  const member = useRecoilValue(memberState);

  return (
    <>
      <Container>
        <InfoList>
          <InfoItem>
            <InfoName>주소</InfoName>
            <InfoContent>{data.streetAddress}</InfoContent>
          </InfoItem>
          <InfoItem>
            <InfoName>전화번호</InfoName>
            <InfoContent>{data.tel}</InfoContent>
          </InfoItem>
          <InfoItem>
            <InfoName>음식 종류</InfoName>
            <InfoContent>{data.category}</InfoContent>
          </InfoItem>
          <InfoItem>
            <InfoName>영업시간</InfoName>
            <InfoContent>{data.open_time}</InfoContent>
          </InfoItem>
        </InfoList>
        <MenuList>
          <Menudiv>
            <InfoName>메뉴</InfoName>
            <MenuItem menu={data.menu} />
          </Menudiv>
          <div>
            {modal ? <Modal menu={data.menu} showModal={showModal} /> : null}
          </div>
          <MoreMenu onClick={showModal}>메뉴 전체보기</MoreMenu>
        </MenuList>
      </Container>
      <Modify showButton={member.memberId === data.member.memberId}>
        <span>{`최종 업데이트 ${
          data.modifiedAt.slice(0, 10) || data.createdAt.slice(0, 10)
        }`}</span>
        {member.memberId === data.member.memberId ? (
          <Button btnstyle="SBtn2" onClick={onClickModify}>
            수정
          </Button>
        ) : null}
      </Modify>
    </>
  );
};

export default StoreInfo;
