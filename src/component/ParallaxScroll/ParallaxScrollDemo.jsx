import img1 from "../../assets/img/Parallax/Img1.jpg";
import img2 from "../../assets/img/Parallax/Img2.jpg";
import img3 from "../../assets/img/Parallax/Img3.jpg";
import img4 from "../../assets/img/Parallax/Img4.jpg";
import img5 from "../../assets/img/Parallax/Img5.jpg";
import img6 from "../../assets/img/Parallax/Img6.jpg";
import img7 from "../../assets/img/Parallax/Img7.jpg";
import img8 from "../../assets/img/Parallax/Img8.jpg";
import img9 from "../../assets/img/Parallax/Img9.jpg";
import img10 from "../../assets/img/Parallax/Img10.jpg";
import img11 from "../../assets/img/Parallax/Img11.jpg";
import img12 from "../../assets/img/Parallax/Img12.jpg";
import img13 from "../../assets/img/Parallax/Img13.jpg";
import img14 from "../../assets/img/Parallax/Img14.jpg";
import img15 from "../../assets/img/Parallax/Img15.jpg";
import img16 from "../../assets/img/Parallax/Img16.jpg";
import img17 from "../../assets/img/Parallax/Img17.jpg";
import img18 from "../../assets/img/Parallax/Img18.jpg";
import img19 from "../../assets/img/Parallax/Img19.jpg";
import img20 from "../../assets/img/Parallax/Img20.jpg";
import img21 from "../../assets/img/Parallax/Img21.jpg";



import { ParallaxScroll } from "./ParallaxScroll";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19 , img20, img21];

export function ParallaxScrollDemo() {
    return <ParallaxScroll images={images} />;
}
