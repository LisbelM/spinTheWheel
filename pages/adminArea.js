import { createContext } from "react"

import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore'
import firebase from "../firebase/clientApp";
import "firebase/compat/firestore";

import styles from "../styles/adminArea.module.css"
import { SubmissionList } from "./submissionList"
import { WheelCanvas } from "./wheelComponent"

export const submissionListContext = createContext();

const adminArea = () => {

    const db = firebase.firestore();
    const [subs, subsLoading, subsError] = useCollection(
        db.collection("wheelSubmissions"),
        {}
    );

    return (
        <submissionListContext.Provider value={{ subs, subsLoading, subsError }}>
            <div className={styles.adminArea}>
                <WheelCanvas />
                <SubmissionList />

                {/*       <button>Spin History</button>
                <button>End Wheel</button>*/}
            </div>
        </submissionListContext.Provider>
    )

}

export default adminArea