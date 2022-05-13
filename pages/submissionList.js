import styles from "../styles/submissionList.module.css"

import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore'
import firebase from "../firebase/clientApp";
import "firebase/compat/firestore";


const submissionList = () => {
    const db = firebase.firestore();
    const [subs, subsLoading, subsError] = useCollection(
        db.collection("wheelSubmissions"),
        {}
    );

    console.log(subs)

    return (
        <div className={styles.submissionList}>

            <span>Wheel Items ()</span>

            <div className={styles}>
                <div className={styles.submission}>
                    <input className={styles.subOdds} placeholder="1"></input>
                    <input className={styles.submissionInfoInput} placeholder="Enter an item"></input>
                </div>
            </div>

            <hr></hr>

            {subsError && <strong>Error: {JSON.stringify(subsError)}</strong>}
            {subsLoading && <span>Submissions: Loading...</span>}
            {subs && subs.docs.map((doc) => (
                <div>
                    <div className={styles.submission}>
                        <input className={styles.subOdds} placeholder="1"></input>
                        <div className={styles.submissionInfo}>
                            <span className={styles.submissionDesc}>{JSON.stringify(doc.data().submission)}</span>
                            <span className={styles.submissionUsr}>{JSON.stringify(doc.data().usrName)}</span>
                        </div>
                        <div className={styles.subChecked}></div>
                    </div>
                    <span className={styles.clearSubX}>X</span>
                </div>
            ))}

        </div>
    )

}

export default submissionList
