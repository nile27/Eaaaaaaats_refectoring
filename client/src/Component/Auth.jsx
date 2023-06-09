import styled, { css } from "styled-components";
import Google from "./style/img/google.png";
import kakao from "./style/img/kakao.svg";

const STYLE = {
  google: css``,
  kakao: css`
    --img: url(${kakao});
    --color: #fae100;
    --posi: 24% center;
  `,
};

const StyleAuth = styled.button`
  ${(p) => p.Btnstyle}
  width: auto;
  min-width: 350px;
  height: 40px;
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  font-size: var(--medium-font);
  color: black;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  background-image: var(--img, url(${Google}));
  background-repeat: no-repeat;
  background-position: var(--posi, 25% center);
  background-color: var(--color, var(--white));
`;

function Auth({ Btnstyle, children, onClick }) {
  const btnstyle = STYLE[Btnstyle];

  return (
    <StyleAuth Btnstyle={btnstyle} onClick={onClick}>
      {children}
    </StyleAuth>
  );
}

export default Auth;
