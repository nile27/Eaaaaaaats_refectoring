import Main from "../Pages/Main";
import Review from "../Pages/Review";
import StoreList from "../Pages/StoreList";
import AddStore from "../Pages/AddStore";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import DetailPage from "../Pages/DetailPage";
import MyPage from "../Pages/MyPage";
import EditStore from "../Pages/EditStore";
import EditReview from "../Pages/EditReview";
import Oauth from "../Pages/Oauth";
import Oauthsignin from "../Pages/OauthSignin";

const RouteList = [
  {
    path: "/review/restaurants/:res_id",
    element: <Review />,
  },
  {
    path: "/review/edit/:res_id/:review_id",
    element: <EditReview />,
  },
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/itemlist",
    element: <StoreList />,
  },
  {
    path: "/addstore",
    element: <AddStore />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/detail/:res_id",
    element: <DetailPage />,
  },
  {
    path: "/mypage",
    element: <MyPage />,
  },
  {
    path: "/editstore/:id",
    element: <EditStore />,
  },
  {
    path: "/oauth2",
    element: <Oauth />,
  },
  {
    path: "/oauth/signgin",
    element: <Oauthsignin />,
  },
];

export default RouteList;
