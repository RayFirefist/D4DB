// pages/404.js

import consts from '../consts.json';
import ImageLoader from "../components/common/image"

const charas = [11, 12, 13, 14, 21, 22, 23, 24, 31, 32, 33, 34, 41, 42, 43, 44, 51, 52, 53, 54, 61, 62, 63, 64]

export default function Custom404() {
  return <div>
    <h1>404 - Page Not Found</h1>
    <ImageLoader
      style={{ height: "100%", maxHeight: "200px" }}
      src={consts.cdn + "ondemand/sd_card_chara/sd_card_chara_040{0}0001_02.png".format(
        charas[Math.floor(Math.random() * charas.length
        )])} />
  </div>
}