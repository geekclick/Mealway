import footerImg from "@/assets/footer/footerImg.png";
import logo from "@/assets/logo.png";
import { BsFacebook, BsInstagram, BsTwitterX } from "react-icons/bs";

function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center">
      <div>
        <img src={footerImg} alt="" className="h-full w-full" />
      </div>
      <div className="lg:flex lg:justify-evenly lg:p-20 items-center relative -top-28 lg:-top-48 lg:h-[400px] bg-footerBg bg-cover bg-center rounded-xl text-white w-11/12 h-full pb-10">
        <div className="flex lg:flex-col justify-around text-2xl items-center">
          <img src={logo} alt="" className="w-[150px]" />
          <div className="flex space-x-4">
            <BsInstagram />
            <BsFacebook />
            <BsTwitterX />
          </div>
        </div>
        <div className="flex gap-4 lg:space-x-10 text-sm lg:text-base justify-evenly items-center flex-wrap">
          <ul>
            <li>Company</li>
            <li>About</li>
            <li>Team</li>
          </ul>
          <ul>
            <li>Contact us</li>
            <li>Help & Support</li>
            <li>Partner with us</li>
          </ul>
          <ul>
            <li>Legal</li>
            <li>Terms & Conditions</li>
            <li>Cookie Policy</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
