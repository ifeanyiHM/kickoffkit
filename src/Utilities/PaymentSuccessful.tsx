import { useNavigate } from "react-router-dom";
import paymentsuccess from "../assets/payment-succes.svg";
import useProduct from "../Context/useProduct";

function PaymentSuccessful() {
  const { isPaymentMade, setIsPaymentMade, clearAllItems } = useProduct();
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");

    setIsPaymentMade(false);
    clearAllItems();
  }
  if (isPaymentMade)
    return (
      <div className="payment-success">
        <div className="card">
          <img src={paymentsuccess} alt="payment successful" />
          <h2>Payment Successful</h2>
          <p>
            Your order is being processed and you will receive a mail with
            details.
          </p>
          <button onClick={handleClick}>Done</button>
        </div>
      </div>
    );
}

export default PaymentSuccessful;
