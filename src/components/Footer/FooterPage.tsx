import { CiMail } from "react-icons/ci";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaSnapchat } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TiSocialFacebookCircular } from "react-icons/ti";
import { PiTelegramLogoBold } from "react-icons/pi";
import logo from "../../assets/Kickoff-Logo.svg";

function FooterPage() {
  return (
    <footer>
      <div className="container">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="footer-list">
          <div className="item">
            <span>At a glance</span>
            <span>New Arrivals</span>
            <span>Top sellers</span>
            <span>All products</span>
          </div>
          <div className="item">
            <span>Support</span>
            <span>FAQs</span>
            <span>Privacy Policy</span>
            <span>Payment</span>
            <span>Contact Us</span>
          </div>
          <div className="item">
            <span>Shop Info</span>
            <span>Blog</span>
            <span>Career</span>
            <span>News</span>
            <span>Promotions</span>
            <span>Affiliates</span>
          </div>
        </div>
        <div className="sign-up">
          <h2>Sign up for your Kickoff Kits</h2>
          <div className="input">
            <CiMail className="icon" />
            <input type="text" placeholder="Enter email address" />
            <FaArrowRightLong className="icon2" />
          </div>
          <h2 className="follow">Follow Us</h2>
          <div className="socials">
            <FaSnapchat className="icon" />
            <FaInstagram className="icon" />
            <FaXTwitter className="icon" />
            <TiSocialFacebookCircular className="icon" />
            <PiTelegramLogoBold className="icon" />
          </div>
        </div>
      </div>
      <div className="copyright">
        <span>©2024 Kickoff Kits. All rights reserved</span>
        <span>Privacy Policy</span>
        <span>Terms of Use</span>
        <span>Supply Chain</span>
        <span>Site Map</span>
        <span>Cookie Policy & Management</span>
      </div>
    </footer>
  );
}

export default FooterPage;
