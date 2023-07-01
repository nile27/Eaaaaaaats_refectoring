import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../Util/api";
import isLoginState from "../state/atoms/IsLoginAtom";
//import memberState from "../state/atoms/SignAtom";
import { useRecoilState } from "recoil";
export default function Oauth() {
  const navi = useNavigate();

  //  const [member, setMember] = useRecoilState(memberState);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);

  useEffect(() => {
    let code = new URL(window.location.href);
    let access = code.searchParams.get("access_token");
    sessionStorage.setItem("Authorization", "Bearer " + access);

    if (sessionStorage.getItem("Authorization")) {
      api
        .get(`/members/mypage`)
        .then((res) => {
          setIsLogin(!isLogin);
          // setMember({
          //   ...member,
          //   memberId: res.data.memberId,
          //   email: res.data.email,
          //   streetAddress: res.data.address.streetAddress,
          //   businessAccount: res.data.businessAccount,
          //   nickName: res.data.nickName,
          //   latitude: res.data.address.latitude,
          //   longitude: res.data.address.longitude,
          //   favorites: res.data.favorites,
          // });
          console.log(res.data);
          navi("/");
        })

        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return <>asdd</>;
}
