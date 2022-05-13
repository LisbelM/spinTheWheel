import { collection, addDoc, getDocs } from 'firebase/firestore';
import firebase from "../firebase/clientApp";
import "firebase/compat/firestore";

import styles from "../styles/submissionList.module.css"
import { useContext, createRef } from "react"
import { submissionListContext } from "./adminArea"

function SubmissionList() {

    let selfSubmissionText = createRef();

    const db = firebase.firestore();
    const addSubmission = async (submission) => {
        db.collection('wheelSubmissions').add({
            /*replace below for mock user values when connection to mainframe*/
            /*usrId: user.id,
            usrName: user.name,*/
            usrId: 1,
            usrName: 'A big fan',
            submission: submission,
            odds: 1, /*default*/
            selectedBool: false, /*default*/
        });
    }

    /*const delSubmission = async (submission) => {
        db.collection
    }*/

    const { subs, subsLoading, subsError } = useContext(submissionListContext)

    return (
        <div className={styles.submissionList}>

            <span> Wheel Items ({})</span>

            <div className={styles.usrSelfSubDiv}>
                <div className={styles.submission}>
                    <input className={styles.subOdds} placeholder="1"></input>
                    <input ref={selfSubmissionText} className={styles.submissionInfoInput} placeholder="Enter an item"></input>
                    <button onClick={() => addSubmission(selfSubmissionText.current.value )} className={styles.usrSelfSubAdd}>Add</button>
                </div>
            </div>

            <hr></hr>

            {subsError && <strong>Error: {JSON.stringify(subsError)}</strong>}
            {subsLoading && <span>Submissions: Loading...</span>}
            {subs && subs.docs.map((doc) => (
                <div className={styles.submissionContainer}>
                    <div className={styles.submission}>
                        <input className={styles.subOdds} placeholder="1"></input>
                        <div className={styles.submissionInfo}>
                            <span className={styles.submissionDesc}>{JSON.stringify(doc.data().submission)}</span>
                            <span className={styles.submissionUsr}>{JSON.stringify(doc.data().usrName)}</span>
                        </div>
                        <div className={styles.subChecked}></div>
                    </div>
                    <button className={styles.clearSubX}>X</button>
                </div>
            ))}

        </div>
    )

}

export { SubmissionList }
