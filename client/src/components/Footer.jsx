import { Facebook, Instagram, Twitter } from "@mui/icons-material"

const Footer = () => {
  return (
    <div className="p-4 bg-slate-100 w-full  text-[18px] gap-10 grid grid-cols-3">
      <div className="text-left">
        <p className="font-bold text-[25px] text-center">Affordable Thrift Store<br /></p>
        <p className="font-bold text-justify"><br />"At Affordable Thrift Store, you can buy staple to trending clothes at reasonable prices, which have been put up for reuse. Similarly, you can also send us your unused wearable items and make a little cash on the side."</p>
      </div>
      <div className="text-center">
        <p className="font-bold text-[25px] text-center">Contact details:<br />
          <br /></p>
        <p className="font-bold tracking-widest text-center">-affordablethriftstore@gmail.com<br />
        </p>
        <p className="font-bold tracking-widest text-center">-Maitighar, Kathmandu</p>
        <p className="font-bold tracking-widest text-center">01-4232383 || 9803287617</p>
      </div>
      <div className="text-right">
        <p className="font-bold text-[25px] text-center">Follow us on: <br />
          <br /></p>
        <p className="font-bold tracking-widest text-center"> <Instagram /> @affordablethriftstorenepal
        </p>
        <p className="font-bold tracking-widest text-center">
          <Facebook />Affordable Thrift Store Nepal
        </p>
        <p className="font-bold tracking-widest text-center"> <Twitter /> @affordablethriftstorenepal
        </p>
      </div>
    </div>
  )
}

export default Footer
