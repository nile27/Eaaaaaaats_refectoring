import styled from "styled-components";

import GlobalStyles from "../Globalstyle";
import X from "../Component/style/img/x.svg";
import List from "./Menu";

const Container = styled.div`
  width: auto;
  min-width: 600px;
  height: auto;
  z-index: 99;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fefefe;
  border-radius: 10px;
  border: 1px solid var(--black-100);
  padding: 10px 24px;
`;

const ModalContainer = styled.button`
  width: auto;
  height: 200%;
  z-index: 90;

  position: absolute;
  transform: translate(-50%, -50%);
  background-color: transparent;
`;

const XBtn = styled.button`
  width: 30px;
  height: 30px;
  background-color: transparent;
  background-image: url(${X});
  background-size: cover;
`;
const Hdiv = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: right;
  margin-bottom: 15px;
`;
const Containerdiv = styled.div`
  width: auto;
  min-width: 600px;
  height: auto;
  padding: 10px;
  display: flex;
`;

export default function Modal({ menu, showModal }) {
  const leng = Array.from({ length: Math.ceil(menu.length / 10) }, (v, i) => i);

  return (
    <>
      <GlobalStyles posi="fixed" />
      <ModalContainer onClick={showModal} />
      <Container>
        <Hdiv>
          <XBtn onClick={showModal}></XBtn>
        </Hdiv>
        <Containerdiv>
          {leng.map((item, idx) => {
            return <List menu={menu} i={item * 10} key={idx} />;
          })}
        </Containerdiv>
      </Container>
    </>
  );
}
