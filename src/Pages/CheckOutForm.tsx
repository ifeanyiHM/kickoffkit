import { FormEvent, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useProduct from "../Context/useProduct";

import { FaAngleDown } from "react-icons/fa6";
import mastercard from "../assets/Mastercard.svg";

interface CheckOutFormProps {
  children: ReactNode;
}

function CheckOutForm({ children }: CheckOutFormProps) {
  const [deliveryOptions, setDeliveryOptions] = useState<string>("delivery");
  const [paymentOptions, setPaymentOptions] = useState<string>("card");
  const [notValid, setNotValid] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");
  const [cardNo, setCardNo] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");

  const { totalItemsInCart, setIsPaymentMade } = useProduct();
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !cardName ||
      !cardNo ||
      !expiryDate ||
      !cvv
    ) {
      setNotValid(true);
      return;
    }

    setIsPaymentMade(true);
  }

  //return homepage after submission
  useEffect(
    function () {
      if (totalItemsInCart < 1) {
        navigate(-1);
      }
    },
    [totalItemsInCart, navigate]
  );

  return (
    <div className="check-out-form">
      <div className="container">
        <form action="" onSubmit={handleSubmit}>
          <div className="delivery">
            <div className="header">
              <h1>Delivery Options</h1>
              <div className="btn">
                <button
                  type="button"
                  className={deliveryOptions === "delivery" ? "active" : ""}
                  onClick={() => setDeliveryOptions("delivery")}
                >
                  Delivery
                </button>
                <button
                  type="button"
                  className={deliveryOptions === "pickup" ? "active" : ""}
                  onClick={() => setDeliveryOptions("pickup")}
                >
                  Pickup
                </button>
              </div>
            </div>
            <div className="form">
              <div className="details lab">
                <div>
                  <label htmlFor="">First Name*</label>
                  <input
                    type="text"
                    className={notValid && !firstName ? "validation-input" : ""}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name*"
                  />
                  <p
                    className="validation-msg"
                    style={{
                      visibility: notValid && !firstName ? "visible" : "hidden",
                    }}
                  >
                    Please enter your first name
                  </p>
                </div>
                <div>
                  <label htmlFor="">Last Name*</label>
                  <input
                    type="text"
                    className={notValid && !lastName ? "validation-input" : ""}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name*"
                  />
                  <p
                    className="validation-msg"
                    style={{
                      visibility: notValid && !lastName ? "visible" : "hidden",
                    }}
                  >
                    Please enter your last name
                  </p>
                </div>
              </div>
              <div className="details">
                <div>
                  <label htmlFor="">Email Address*</label>
                  <input
                    type="text"
                    className={notValid && !email ? "validation-input" : ""}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address*"
                  />
                  <p
                    className="validation-msg"
                    style={{
                      visibility: notValid && !email ? "visible" : "hidden",
                    }}
                  >
                    Please enter your email
                  </p>
                </div>
                <div>
                  <label htmlFor="">Phone number*</label>
                  <input
                    type="text"
                    className={notValid && !phone ? "validation-input" : ""}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="NG +234"
                  />
                  <p
                    className="validation-msg"
                    style={{
                      visibility: notValid && !phone ? "visible" : "hidden",
                    }}
                  >
                    Please enter your phone number
                  </p>
                </div>
              </div>
              <div>
                <label htmlFor="">Address Line1*</label>
                <input type="text" placeholder="Address Line1*" />
                <p className="validation-msg">Please enter your address</p>
              </div>
              <div>
                <label htmlFor="">Address Line2</label>
                <input type="text" placeholder="Address Line2" />
                <p className="validation-msg">Please enter your address</p>
              </div>
              <div className="details">
                <div className="inp">
                  <label htmlFor="">CountryRegion*</label>
                  <input type="text" placeholder="CountryRegion*" />
                  <p className="validation-msg">Please enter your region</p>
                  <FaAngleDown className="icon" />
                </div>
                <div className="inp">
                  <label htmlFor="">State*</label>
                  <input type="text" placeholder="State*" />
                  <p className="validation-msg">Please enter your state</p>
                  <FaAngleDown className="icon" />
                </div>
              </div>
              <div className="details">
                <div>
                  <label htmlFor="">Postal Code*</label>
                  <input type="text" placeholder="Postal Code**" />
                  <p className="validation-msg">
                    Please enter your postal code
                  </p>
                </div>
                <div>
                  <label htmlFor="">City*</label>
                  <input type="text" placeholder="City*" />
                  <p className="validation-msg">Please enter your city</p>
                </div>
              </div>
            </div>
          </div>
          <div className="payment">
            <div className="header">
              <h1>Payment Option</h1>
              <div className="btn">
                <button
                  type="button"
                  className={paymentOptions === "card" ? "active" : ""}
                  onClick={() => setPaymentOptions("card")}
                >
                  Card
                </button>
                <button
                  type="button"
                  className={paymentOptions === "bankTransfer" ? "active" : ""}
                  onClick={() => setPaymentOptions("bankTransfer")}
                >
                  Transfer
                </button>
              </div>
            </div>
            <div className="form">
              <div className="details lab">
                <div>
                  <label htmlFor="">Name on Card*</label>
                  <input
                    type="text"
                    className={notValid && !cardName ? "validation-input" : ""}
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Name on Card*"
                  />
                  <p
                    className="validation-msg"
                    style={{
                      visibility: notValid && !cardName ? "visible" : "hidden",
                    }}
                  >
                    Add the name on your card
                  </p>
                </div>
                <div className="inp inpp">
                  <label htmlFor="">Card Number*</label>
                  <input
                    type="text"
                    className={notValid && !cardNo ? "validation-input" : ""}
                    value={cardNo}
                    onChange={(e) => setCardNo(e.target.value)}
                    placeholder="1234 1234 1234 1234"
                  />
                  <p
                    className="validation-msg"
                    style={{
                      visibility: notValid && !cardNo ? "visible" : "hidden",
                    }}
                  >
                    Add your card number
                  </p>
                  <img src={mastercard} alt="mastercard" />
                </div>
              </div>
              <div className="det">
                <div>
                  <label htmlFor="">Expiry Date*</label>
                  <input
                    type="text"
                    className={
                      notValid && !expiryDate ? "validation-input" : ""
                    }
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="00/00"
                  />
                  <p
                    className="validation-msg"
                    style={{
                      visibility:
                        notValid && !expiryDate ? "visible" : "hidden",
                    }}
                  >
                    Include expiry date
                  </p>
                </div>
                <div>
                  <label htmlFor="">CVV*</label>
                  <input
                    type="text"
                    className={notValid && !cvv ? "validation-input" : ""}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="000*"
                  />
                  <p
                    className="validation-msg"
                    style={{
                      visibility: notValid && !cvv ? "visible" : "hidden",
                    }}
                  >
                    Add your cvv
                  </p>
                </div>
              </div>
              <button type="submit">Make payment</button>
            </div>
          </div>
        </form>
      </div>

      {children}
    </div>
  );
}

export default CheckOutForm;
