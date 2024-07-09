import { ReactNode, useState } from "react";

import { FaAngleDown } from "react-icons/fa6";
import mastercard from "../assets/Mastercard.svg";

interface CheckOutFormProps {
  children: ReactNode;
}

function CheckOutForm({ children }: CheckOutFormProps) {
  const [deliveryOptions, setDeliveryOptions] = useState<string>("delivery");
  const [paymentOptions, setPaymentOptions] = useState<string>("card");

  return (
    <div className="check-out-form">
      <div className="container">
        <div className="delivery">
          <div className="header">
            <h1>Delivery Options</h1>
            <div className="btn">
              <button
                className={deliveryOptions === "delivery" ? "active" : ""}
                onClick={() => setDeliveryOptions("delivery")}
              >
                Delivery
              </button>
              <button
                className={deliveryOptions === "pickup" ? "active" : ""}
                onClick={() => setDeliveryOptions("pickup")}
              >
                Pickup
              </button>
            </div>
          </div>
          <form action="">
            <div className="details">
              <div>
                <label htmlFor="">First Name*</label>
                <input type="text" placeholder="First Name*" />
              </div>
              <div>
                <label htmlFor="">Last Name*</label>
                <input type="text" placeholder="Last Name*" />
              </div>
            </div>
            <div className="details">
              <div>
                <label htmlFor="">Email Address*</label>
                <input type="text" placeholder="Email Address*" />
              </div>
              <div>
                <label htmlFor="">Phone number*</label>
                <input type="text" placeholder="NG +234" />
              </div>
            </div>
            <div>
              <label htmlFor="">Address Line1*</label>
              <input type="text" placeholder="Address Line1*" />
            </div>
            <div>
              <label htmlFor="">Address Line2</label>
              <input type="text" placeholder="Address Line2" />
            </div>
            <div className="details">
              <div className="inp">
                <label htmlFor="">CountryRegion*</label>
                <input type="text" placeholder="CountryRegion*" />
                <FaAngleDown className="icon" />
              </div>
              <div className="inp">
                <label htmlFor="">State*</label>
                <input type="text" placeholder="State*" />
                <FaAngleDown className="icon" />
              </div>
            </div>
            <div className="details">
              <div>
                <label htmlFor="">Postal Code*</label>
                <input type="text" placeholder="Postal Code**" />
              </div>
              <div>
                <label htmlFor="">City*</label>
                <input type="text" placeholder="City*" />
              </div>
            </div>
          </form>
        </div>
        <div className="payment">
          <div className="header">
            <h1>Payment Option</h1>
            <div className="btn">
              <button
                className={paymentOptions === "card" ? "active" : ""}
                onClick={() => setPaymentOptions("card")}
              >
                Card
              </button>
              <button
                className={paymentOptions === "bankTransfer" ? "active" : ""}
                onClick={() => setPaymentOptions("bankTransfer")}
              >
                Transfer
              </button>
            </div>
          </div>
          <form action="">
            <div className="details">
              <div>
                <label htmlFor="">Name on Card*</label>
                <input type="text" placeholder="Name on Card*" />
              </div>
              <div className="inp inpp">
                <label htmlFor="">Card Number*</label>
                <input type="text" placeholder="1234 1234 1234 1234" />
                <img src={mastercard} alt="mastercard" />
              </div>
            </div>
            <div className="det">
              <div>
                <label htmlFor="">Expiry Date*</label>
                <input type="text" placeholder="00/00" />
              </div>
              <div>
                <label htmlFor="">CVV*</label>
                <input type="text" placeholder="000*" />
              </div>
            </div>
            <button>Make payment</button>
          </form>
        </div>
      </div>
      {children}
    </div>
  );
}

export default CheckOutForm;
