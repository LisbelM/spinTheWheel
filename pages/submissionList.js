import { collection, addDoc, getDocs, doc, deleteDoc, update} from 'firebase/firestore';
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
            /*replace below for real admin user values when connection to mainframe*/
            /*usrId: user.id,
            usrName: user.name,*/
            usrId: 1,
            usrName: 'A big fan',
            submission: submission,
            odds: 1, /*default*/
            selectedBool: true, /*default*/
        });
    }

    const delSubmission = async (docID) => {
        await deleteDoc(doc(db, "wheelSubmissions", docID.replaceAll('"', '')));
    }

    const updateSubmissionOdds = async (docID, odds) => {
        const updates = {};
        updates[`/wheelSubmissions/${docID}/odds`] = odds;
        return update(ref(db), updates);
    }

    const selectSubmissionForWheel = async(docID, oldSelectedBool) => {
        let newSelectedBool = oldSelectedBool === 'false' ? true : false;
        db.collection("wheelSubmissions").doc(docID.replaceAll('"', '')).update({
            selectedBool: newSelectedBool
        })
    }

    const { subs, subsLoading, subsError } = useContext(submissionListContext)

    return (
        <div className={styles.submissionList}>

            <span> Wheel Items ({})</span>

            <div className={styles.usrSelfSubDiv}>
                <div className={styles.submission}>
                    <input className={styles.subOdds} placeholder="1"></input>
                    <input ref={selfSubmissionText} className={styles.submissionInfoInput} placeholder="Enter an item"></input>
                    <button onClick={() => addSubmission(selfSubmissionText.current.value)} className={styles.usrSelfSubAdd}>Add</button>
                </div>
            </div>

            <hr></hr>

            {subsError && <strong>Error: {JSON.stringify(subsError)}</strong>}
            {subsLoading && <span>Submissions: Loading...</span>}
            {subs && subs.docs.map((doc) => (

                <div className={styles.submissionContainer}>
                    <div className={styles.submission}>
                        <input onKeyUp={(event) => updateSubmissionOdds(event)} className={styles.subOdds} placeholder="1"></input>
                        <div className={styles.submissionInfo}>
                            <span className={styles.submissionDesc}>{JSON.stringify(doc.data().submission).replaceAll('"', '')}</span>
                            <span className={styles.submissionUsr}>{JSON.stringify(doc.data().usrName).replaceAll('"', '')}</span>
                        </div>
                        <div onClick={() => selectSubmissionForWheel(JSON.stringify(doc.id), JSON.stringify(doc.data().selectedBool))} className={styles.subChecked}></div>
                    </div>
{/*                    <button onClick={() => delSubmission(JSON.stringify(doc.id))} className={styles.clearSubX}>X</button>
*/}                </div>

            ))}

        </div>
    )

}

export { SubmissionList }
