import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import isLoginState from "../state/atoms/IsLoginAtom";
import memberState from "../state/atoms/SignAtom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import Button from "../Component/style/StyleButton";
import Input from "../Component/style/StyleInput";
import Logo from "../Component/style/img/Eaaaaaaats.svg";
import { api } from "../Util/api";
const Main = styled.main`
  margin: 20px 0;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Img = styled.img`
  width: 150px;
  height: 35px;
  margin: 30px 0px;
`;
const Container = styled.div`
  width: 350px;
  height: auto;
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 30px;
`;

const Textdiv = styled.div`
  width: 100%;
  min-height: 90px;
  height: auto;
  margin-bottom: 5px;
`;

const LocationWrap = styled.div`
  width: 100%;
  display: flex;
  height: 35px;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const LocationBtn = styled.button`
  width: 60px;
  height: 30px;
  border-radius: 20px;
  margin-left: 10px;
  font-size: 14px;
  border: 1px solid var(--black-200);
  color: var(--black-200);
  background: var(--white);

  &: hover {
    background: var(--eatsgreen);
    color: var(--white);
  }
`;

const P = styled.div`
  font-size: var(--large-font);
  font-weight: 600;
  margin-bottom: 10px;
`;

const Ceodiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 10px;
`;

const Ceospan = styled.span`
  color: var(--black-500);
  font-size: 14px;
`;

const Errdiv = styled.div`
  width: 100%;
  padding: 7px 6px;
`;
const Errspan = styled.div`
  color: var(--red-500);
  font-size: 14px;
`;
const TextArea = styled.textarea`
  width: 293px;
  min-height: 41px;
  height: auto;
  font-size: var(--medium-font);
  border: 1px solid var(--black-200);
  border-radius: 10px;
  padding: 5px 10px;
  white-space: pre-line;
  overflow: hidden;
  resize: none;
  &:active,
  &:focus {
    outline: none;
  }
`;
const { kakao } = window;

function OauthSign() {
  const navi = useNavigate();
  const [member, setMember] = useState({
    streetAddress: "",
    detailAddress: "",
    latitude: "",
    longitude: "",
    businessAccount: false,
  });
  const [, setMemberData] = useRecoilState(memberState);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);

  const [Check, setCheck] = useState({
    // 회원가입 양식 확인
    streetAddress: true,
    detailAddress: true,
  });

  const errMsg = ["* 지역을 선택해주세요.", "* 상세 지역을 입력해주세요."];

  const onSearchAddr = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setMember({
          ...member,
          streetAddress: data.roadAddress,
        });
      },
    }).open();
  };

  const checkingFunc = () => {
    if (!member.streetAddress) {
      setCheck({
        ...Check,
        streetAddress: false,

        detailAddress: true,
      });
      return;
    }
    if (!member.detailAddress) {
      setCheck({
        ...Check,
        streetAddress: true,
        detailAddress: false,
      });
      return;
    }

    return api
      .patch(`/members`, {
        streetAddress: member.streetAddress + " " + member.detailAddress,
        latitude: member.latitude,
        longitude: member.longitude,
        businessAccount: member.businessAccount,
      })
      .then((res) => {
        setIsLogin(!isLogin);
        setMemberData({
          ...member,
          memberId: res.data.memberId,
          email: res.data.email,
          streetAddress: res.data.address.streetAddress,
          businessAccount: res.data.businessAccount,
          nickName: res.data.nickName,
          latitude: res.data.address.latitude,
          longitude: res.data.address.longitude,
          favorites: res.data.favorites,
        });
        navi("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js?";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(
      member.streetAddress || "제주특별자치도 제주시 첨단로 242",
      function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          setMember({
            ...member,
            latitude: result[0].y,
            longitude: result[0].x,
          });
        }
      },
    );
  }, [member.streetAddress]);

  return (
    <>
      <Main>
        <Container>
          <Img src={Logo} alt="" />
          <Textdiv>
            <LocationWrap>
              <P>주소</P>
              <LocationBtn btnstyle="SBtn" onClick={onSearchAddr}>
                검색
              </LocationBtn>
            </LocationWrap>

            <TextArea
              type="text"
              inputType="default"
              value={member.streetAddress || ""}
              readOnly="readOnly"
            />
            {!Check.streetAddress ? (
              <Errdiv>
                <Errspan>{errMsg[0]}</Errspan>
              </Errdiv>
            ) : null}
          </Textdiv>

          <Textdiv>
            <P>상세주소</P>
            <Input
              type="text"
              inputType="default"
              placeholder="상세 주소"
              onChange={(e) =>
                setMember({ ...member, detailAddress: e.target.value })
              }
            />
            {!Check.detailAddress ? (
              <Errdiv>
                <Errspan>{errMsg[1]}</Errspan>
              </Errdiv>
            ) : null}
          </Textdiv>

          <Textdiv>
            <P>사장님 계정</P>
            <Ceodiv>
              <Ceospan>사업자 계정 등록</Ceospan>
              <Input
                type="checkbox"
                inputType="default"
                placeholder="email"
                width="15px"
                height="15px"
                onChange={(e) =>
                  setMember({ ...member, businessAccount: e.target.checked })
                }
              />
            </Ceodiv>
          </Textdiv>

          <Button btnstyle="Btn" width="280px" onClick={checkingFunc}>
            회원가입
          </Button>
        </Container>
      </Main>
    </>
  );
}

export default OauthSign;
