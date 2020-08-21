import {
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonPage
} from "@ionic/react";
import { Howl } from "howler";
import {} from "ionicons/icons";
import React from "react";
import { getSong } from "../../business/user";
import { Util } from "../../business/util";
import { Topbar } from "../components/topbar";

/* Play the current logged in user's song. In the future a user will be able to record and save and
play more than one song. If user is not logged in, there is no song to play. */
const playSong = async () => {
    const songData = await getSong();
    /* If current user has no saved song */
    if (songData == null) return;
    const { song } = songData;
    let start = song[0].time;
    for (let i = 0; i < song.length; ++i) {
        const noteTime = song[i];
        const wait = noteTime.time - start;
        await new Promise(resolve => {
            setTimeout(resolve, wait);
        });
        new Howl({
            src: [Util.notes[noteTime.note].soundLocation]
        }).play();
        start = noteTime.time;
    }
};

const playSongs: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <Topbar title="Play songs" />
            </IonHeader>
            <IonContent className="ion-padding">
                {/* List of songs from firebase db */}
                <IonList>
                    <IonItem routerLink="/login">
                        <IonLabel>Log in to play songs.</IonLabel>
                    </IonItem>
                    <IonItem routerLink="/make_music">
                        <IonLabel>
                            Make music and record it to play songs.
                        </IonLabel>
                    </IonItem>
                    <IonItem onClick={playSong}>
                        <IonLabel>Play song</IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default playSongs;
