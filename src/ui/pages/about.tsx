import React from "react";
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonText
} from "@ionic/react";
import { Topbar } from "../components/topbar";
import "./about.css";

const about: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <Topbar title="About" />
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
                        they are available, the real bells are one of the most
                        expensive pieces of equipment in the Montessori
                        curriculum and as such are out of reach of many
                        Montessori homeschool families and educators. This app
                        is intended to bring the Montessori bells activities to
                        children who would not otherwise be able to experience
                        them.
                    </p>
                    <p>
                        This app is intended for children age three years and
                        up, under adult supervision.
                    </p>
                    <p>
                        We recommend the adult explore the activities before
                        presenting them to the child. They are designed to be
                        presented to the child in the same way as the real
                        Montessori bells and other Montessori sensorial
                        activities. Usually, the adult and child will be seated
                        comfortably at a low table, the adult sitting on the
                        child's right if the adult is right-handed. The adult
                        will say something like "Today, I'm going to show you
                        the <em>matching bells</em> activity. It's my turn first
                        and then you can have a turn." The adult will then
                        slowly demonstrate the activity, mostly without saying
                        anything, but possibly pausing at some point to say,
                        "I'm listening to hear which blue bell is the same as
                        the green bell. Then the adult invites the child to have
                        a turn.
                    </p>
                    <p>
                        If the child doesn't match the bells correctly, the
                        adult does not usually correct the child but instead
                        demonstrates the activity again, either immediately or
                        on a later occasion, perhaps emphasising the aspect the
                        child misunderstood. In a Montessori environment, this
                        app's <em>Show answers</em> feature would not be used.
                        For more information on how to present Montessori bells
                        activities to children, see a Montessori manual (often
                        called an album) on the Sensorial activities, such as:
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
                        For general information on Montessori education, a great
                        place to start (and a short read) is{" "}
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
