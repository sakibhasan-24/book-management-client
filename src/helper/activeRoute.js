import { useLocation } from "react-router-dom";

export default function activeRoute() {
  const location = useLocation();
  const activeRouter = (route) => {
    console.log(location.pathname);
    // console.log(route);
    if (route === location.pathname) {
      return true;
    }
    return false;
  };
  return activeRouter;
}
