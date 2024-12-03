import classNames from "classnames";
import { useEffect, useState } from "react";
import styles from "./VideoPlayer.module.css";

export default function VideoPlayer() {
  const [scripts, setScripts] = useState("");

  useEffect(() => {
    const dataUrl = window.location.href;
    fetch(
      "//js.espanplay.site/get_player?w=610&h=370&type=widget&kp_id=&players=videocdn,hdvb,bazon,alloha,ustore,kodik&r_id=videoplayers&vni=VIDEOCDN&vti=&vdi=&hni=HDVB&hti=&hdi=&bni=BAZON&bti=&bdi=&alni=ALLOHATV&alti=&aldi=&usni=USTOREBZ&usti=&usdi=&koni=KODIK&koti=&kodi=&ru=" +
        dataUrl
    )
      .then((response) => response.text())
      .then((data) => {
        const match = data.match(/<iframe.*\/iframe>/gm);
        if (match && match[1]) {
          setScripts(match[1]);
        } else {
          console.error("Iframe не найден");
        }
      })
      .catch((error) => console.error("Ошибка при загрузке:", error));
  }, []);

  return (
    <div
      className={classNames("uitools", styles.video)}
      id="videoplayers"
      dangerouslySetInnerHTML={{ __html: scripts }}
    ></div>
  );
}
