import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Footer = () => {
  return (
    <div className="z-[100] mt-6 bg-red-500 rounded-t-3xl w-full flex flex-col justify-center items-center py-[10px] md:flex-row md:justify-between   md:px-10 md:py-16">
      <div className="flex flex-col items-center">
        <h1 className="text-white font-Iceland text-2xl font-bold">BARCODE</h1>
        <p className="text-sm text-white">
          &copy; <span>{new Date().getFullYear()}</span> BARCODE. All Rights
          Reserved.
        </p>
      </div>
      <div className="flex text-white gap-5 py-2 text-xl">
        <FontAwesomeIcon icon={faInstagram} />
        <FontAwesomeIcon icon={faWhatsapp} />
      </div>
    </div>
  );
};

export default Footer;
