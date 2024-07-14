import useProduct from "../../Context/useProduct";

import mobImgHeader from "../../assets/Hero-Image.svg";
import deskImgHeader from "../../assets/Hero-Image-dsk.svg";

function HeaderBody() {
  const { scrollToProductPage } = useProduct();
  return (
    <div className="header-body">
      <img
        // window.innerWidth < 992
        src={window.innerWidth < 700 ? mobImgHeader : deskImgHeader}
        alt="header image"
      />
      <div className="text">
        <h1>
          2024/2025 <br /> JERSEY ARRIVAL
        </h1>
        <p>
          Your destination for top-quality football jerseys. Designed for
          players and fans alike, our jerseys combine performance, comfort, and
          style. Show your team spirit and elevate your game with Kickoff Kits!
        </p>
        <button onClick={scrollToProductPage}>Shop Now</button>
      </div>
    </div>
  );
}

export default HeaderBody;
