import React from "react";
import Loadable from 'react-loadable';
import "../styles/home.scss";

function LoadingComponent(props) {
  return <div/>
}

const HomeLazy = Loadable({
  loader: () => import("../containers/Home"),
  loading: LoadingComponent,
});

const Index = () => {
  return (
    <>
      <HomeLazy />
    </>
  );
};
export default Index;
