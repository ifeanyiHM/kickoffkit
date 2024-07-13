import useProduct from "../Context/useProduct";
import { FaCheckCircle } from "react-icons/fa";

function ProductModal() {
  const { productDetails, addToCart } = useProduct();

  const {
    unique_id: id,
    name,
    photos,
    // available_quantity: rating,
    current_price: cost,
  } = productDetails;
  const image = photos[0].url;
  const price = cost[0].NGN[0];

  return (
    <div className="product-modal" key={id}>
      <div className="display-image">
        <div className="img-cont">
          <img src={`https://api.timbu.cloud/images/${image}`} alt={name} />
        </div>
        <div className="img-cont">
          <img src={`https://api.timbu.cloud/images/${image}`} alt={name} />
        </div>
        <div className="img-cont">
          <img src={`https://api.timbu.cloud/images/${image}`} alt={name} />
        </div>
        <div className="img-cont">
          <img src={`https://api.timbu.cloud/images/${image}`} alt={name} />
        </div>
      </div>
      <div className="display-product">
        <p className="sport">Sport / Fashion / Men's Wear</p>
        <h3>Men's Jersey</h3>
        <h1>{name}</h1>
        <p className="strong">
          {" "}
          <strong>₦{price.toLocaleString()}</strong> & low cost shipping
        </p>
        <p className="description">
          Experience premium comfort and style with our high-quality sports
          jerseys, perfect for any game, workout, or casual outing. Choose from
          a variety of stylish designs and sizes to find your perfect fit. Enjoy
          breathable fabrics and durable construction at affordable prices.
          Elevate your game and express your passion today!
        </p>
        <div className="add">
          {/* <div>
            {" "}
            <span>-</span>
            <span>1</span>
            <span>+</span>
          </div> */}
          <button onClick={() => addToCart(productDetails, id)}>
            ADD TO CART
          </button>
        </div>
        <p className="express">Categories: Men's Jersey</p>
        <ul>
          <li>
            <FaCheckCircle />
            <span>No-Risk Money Back Guarantee!</span>
          </li>
          <li>
            <FaCheckCircle />
            <span>No Hassle Refunds</span>
          </li>
          <li>
            <FaCheckCircle />
            <span>Secure Payments</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProductModal;
