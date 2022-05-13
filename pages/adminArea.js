import styles from "../styles/adminArea.module.css"
import { SubmissionList } from "./submissionList"
import WheelComponent from "./wheelComponent";
import { createContext } from "react"

import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore'
import firebase from "../firebase/clientApp";
import "firebase/compat/firestore";

export const submissionListContext = createContext({ subs : [] , subsLoading : [], subsError : []});

export default function App() {

    const db = firebase.firestore();

/*    const getSpinHistory = async () => {
        db.collection('wheelSubmissions'),
        {}
    }*/

    const [subs, subsLoading, subsError] = useCollection(
        db.collection("wheelSubmissions"),
        {}
    );

    return (
        <submissionListContext.Provider value={{ subs, subsLoading, subsError }}>
            <div className={styles.adminArea}>
                <WheelComponent />
                <SubmissionList />

                <div className={styles.adminBtnsContainer}>
                    <button className={styles.spinHistBtn}>Spin History</button>
                    <button className={styles.endWheelBtn}>End Wheel</button>
                </div>
            </div>
        </submissionListContext.Provider>
    );
}
