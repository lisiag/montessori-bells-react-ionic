import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import "./bell_match_3.css";
import ReactHowler from "react-howler";

export class Bell_match_3 extends React.Component {
  render() {
    return (
      <ReactHowler
        src="http://goldfirestudios.com/proj/howlerjs/sound.ogg"
        playing={true}
      />
    );
  }
}
