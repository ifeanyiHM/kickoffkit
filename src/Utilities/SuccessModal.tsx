import { LiaCheckCircle } from "react-icons/lia";

function SuccessModal() {
  return (
    <div className="success">
      <LiaCheckCircle className="icon" />
      <span>Successfully Added to Cart</span>
    </div>
  );
}

export default SuccessModal;
