import {
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonPage,
    IonText,
    IonFooter
} from "@ionic/react";
import { Howl } from "howler";
import { play } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { currentUser, onAuthStateChanged, User } from "../../business/user";
import {
    getSong,
    NoteTime,
    addSongsListener,
    SongData
} from "../../business/song";
import { Util } from "../../business/util";
import { Topbar } from "../components/topbar";
import "./play_songs.css";

/* Play the current logged in user's song. In the future a user will be able to record and save and
   play more than one song. If user is not logged in, this is not called. NoteTime is the format in
   which the parts of a song are stored (start time and note) */
const playSong = async (song: NoteTime[]) => {
    try {
        let start = song[0].time;
        for (let i = 0; i < song.length; ++i) {
            const noteTime = song[i];
            const wait = noteTime.time - start;
            /* to wait using setTimeout in an async function: */
            /* https://codingwithspike.wordpress.com/2018/03/10/making-settimeout-an-async-await-function/ */
            await new Promise(resolve => {
                setTimeout(resolve, wait);
            });
            new Howl({
                src: [Util.notes[noteTime.note].soundLocation]
            }).play();
            start = noteTime.time;
        }
    } catch (err) {
        console.error(err);
    }
};

/* The 'Play songs' page */
const PlaySongs: React.FC = () => {
    const [user, setUser] = useState(currentUser) as [User | null, any];
    const [song, setSong] = useState(null) as [SongData | null, any];

    const checkForUserAndSong = () => {
        /* set user to the current logged in user */
        if (user !== currentUser) {
            setUser(currentUser);
        }
        /* if there is no logged in user, then there is no saved song */
        if (user != null) {
            getSong() /* returns songData */
                .then(currentSong => {
                    /* Set song to currentSong if they aren't already the same. */
                    /* Without this convoluted if check, was sometimes getting problems with infinite loop of calling. */
                    if (
                        currentSong !==
                            song /* This on its own is not sufficient to check if they are the same */ &&
                        (song == null ||
                            currentSong == null ||
                            currentSong.song[0].time !==
                                song.song[0]
                                    .time) /* every song has unique start time */
                    ) {
                        setSong(currentSong);
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        }
    };

    const content = () => {
        /* If user is not logged in, display message for user not logged in */
        if (user == null) {
            return (
                <IonText>
                    <p>
                        To play songs, please <Link to="/login">log in</Link>.
                    </p>
                </IonText>
            );
        } else {
            /* If user is logged in but has no songs saved in the database, display message
               for user with no song saved */
            if (song == null) {
                return (
                    <IonText color="dark">
                        <p>
                            You have no saved song. To play songs, first go to{" "}
                            <Link to="/make_music">Make music</Link> to record
                            and save songs.
                        </p>
                    </IonText>
                );
            } else {
                /* If user is logged in and has a song saved in the database, display the song title and let them click on it to play it. */
                /* In future this will be a list of the user's saved songs as they will be able to save more than one song */
                return (
                    <IonItem
                        onClick={() => {
                            playSong(song.song);
                        }}
                    >
                        <IonIcon className="playIcon" icon={play} />
                        <IonLabel>{song.title}</IonLabel>
                    </IonItem>
                );
            }
        }
    };

    const footer = () => {
        /* If user is not logged in, or user is logged in but has no songs saved in the database: no footer */
        if (user == null || song == null) {
            return;
        } else {
            /* If user is logged in and has a song saved in the database, display footer with instructions about how to play song */
            return (
                <p id="footer">
                    Tap your song to hear it played.
                    <br />
                    To record and save a new song, go to{" "}
                    <Link to="/make_music">Make music</Link>.
                </p>
            );
        }
    };

    /* useEffect is called after every render: when the component is first mounted and when it is updated */
    /* https://reactjs.org/docs/hooks-effect.html */
    /* https://www.digitalocean.com/community/tutorials/five-ways-to-convert-react-class-components-to-functional-components-with-react-hooks */
    useEffect(checkForUserAndSong);

    /* also update page content if user changes, to get the new user's song (or lack of song) */
    onAuthStateChanged(checkForUserAndSong);

    /* also update page content if songs database changes, so the song we display is the *latest* saved song */
    addSongsListener(checkForUserAndSong);

    return (
        <IonPage>
            <IonHeader>
                <Topbar title="Play song" />
            </IonHeader>
            <IonContent className="ion-padding">{content()}</IonContent>
            <IonFooter>{footer()}</IonFooter>
        </IonPage>
    );
};

export default PlaySongs;
