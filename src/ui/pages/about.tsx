import React from "react";
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonText
} from "@ionic/react";
import "./about.css";

const about: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>About</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">About</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonText color="secondary">
                    <p>
                        This Montessori Bells app is developed by{" "}
                        <a href="https://www.linkedin.com/in/lisia-grocott-7996491a0/">
                            Lisia Grocott
                        </a>{" "}
                        and based on activities devised by Maria Montessori.
                        Although an app is no replacement for the tactile and
                        kinaesthetic experience of working with real bells where
                        they are available, the bells are one of the most
                        expensive pieces of equipment in the Montessori
                        curriculum and as such are out of reach of many
                        Montessori homeschool families and educators. This app
                        is intended to bring the Montessori bells activities to
                        children who would not otherwise be able to experience
                        them.
                    </p>
                    <p>
                        For information on how to present this app's activities
                        to children, see a Montessori manual (often called an
                        album) on the Sensorial activities:
                    </p>
                    <ul>
                        <li>
                            <a href="http://www.infomontessori.com/sensorial/auditory-sense-bells.htm">
                                Montessori Primary Guide
                            </a>
                        </li>
                        <li>
                            <a href="https://www.montessorialbum.com/montessori/index.php/Bells">
                                Montessori Album
                            </a>
                        </li>
                    </ul>
                    <p>
                        Or see Maria Montessori's book,{" "}
                        <em>The Discovery of the Child</em>.
                    </p>
                    <p>
                        For information on Montessori education, a great place
                        to start, and a short read, is{" "}
                        <a href="http://www.gutenberg.org/ebooks/29635">
                            <em>Montessori's Own Handbook</em>
                        </a>{" "}
                        available for free on Project Gutenberg.
                    </p>
                </IonText>
            </IonContent>
        </IonPage>
    );
};

export default about;
