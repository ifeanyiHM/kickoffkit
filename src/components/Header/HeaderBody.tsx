import mobImgHeader from "../../assets/Hero-Image.svg";
import deskImgHeader from "../../assets/Hero-Image-dsk.svg";
import { useContext } from "react";
import { ProductContext } from "../../App";

// interface HeaderBodyProps {
//   desktopView: boolean;
//   scrollToProductPage: () => void;
// }

function HeaderBody() {
  const { desktopView, scrollToProductPage } = useContext(ProductContext);
  return (
    <div className="header-body">
      <img
        src={desktopView ? deskImgHeader : mobImgHeader}
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
