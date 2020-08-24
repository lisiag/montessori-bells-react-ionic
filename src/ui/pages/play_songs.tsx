import {
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonPage,
    IonText
} from "@ionic/react";
import { Howl } from "howler";
import { play } from "ionicons/icons";
import React, { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    currentUser,
    getSong,
    NoteTime,
    onAuthStateChanged,
    onSongsStateChanged
} from "../../business/user";
import { Util } from "../../business/util";
import { Topbar } from "../components/topbar";

let song: NoteTime[];

/* Play the current logged in user's song. In the future a user will be able to record and save and
play more than one song. If user is not logged in, this is not called. */
const playSong = async () => {
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

/* The 'Play songs' page */
const PlaySongs: React.FC = () => {
    const [message, setMessage] = useState() as [ReactElement, any];

    const checkForUserAndSong = () => {
        /* Because this is async, to prevent infinite loop, only continue if message is null */
        if (message != null) return;

        /* If no one is logged in, display message for user not logged in */
        if (currentUser == null) {
            setMessage(
                <IonText>
                    <p>
                        To play songs, please <Link to="/login">log in</Link>.
                    </p>
                </IonText>
            );
        } else {
            getSong() /* returns songData */
                .then(songData => {
                    /* If someone is logged in but has no songs saved in the database, display message
                       for user with no song saved */
                    if (songData == null) {
                        setMessage(
                            <IonText color="dark">
                                <p>
                                    You have no saved song. To play songs, first
                                    go to{" "}
                                    <Link to="/make_music">Make music</Link> to
                                    record and save songs.
                                </p>
                            </IonText>
                        );
                    } else {
                        /* If someone is logged in and has a song saved in the database, display the song title and let them click on it to play it. */
                        /* In future this will be a list of the user's saved songs as they will be able to save more than one song */
                        song = songData.song;
                        setMessage(
                            <IonItem onClick={playSong}>
                                <IonIcon icon={play} />{" "}
                                <IonLabel>{songData.title}</IonLabel>
                            </IonItem>
                        );
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        }
    };

    /* useEffect is called after every render: when the component is first mounted and when it is updated */
    /* https://reactjs.org/docs/hooks-effect.html */
    /* https://www.digitalocean.com/community/tutorials/five-ways-to-convert-react-class-components-to-functional-components-with-react-hooks */
    useEffect(checkForUserAndSong);

    /* also update page content if user changes, to get the new user's song (or lack of song) */
    onAuthStateChanged(checkForUserAndSong);

    /* also update page content if songs database changes, so the song we display is the *latest* saved song */
    onSongsStateChanged(checkForUserAndSong);

    return (
        <IonPage>
            <IonHeader>
                <Topbar title="Play song" />
            </IonHeader>
            <IonContent className="ion-padding">{message}</IonContent>
        </IonPage>
    );
};

export default PlaySongs;
