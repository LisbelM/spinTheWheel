import styles from "../styles/submissonList.module.css"

import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore'
import firebase from "../firebase/clientApp";
import "firebase/compat/firestore";
const db = firebase.firestore();

const submissionList = () => {

    const [subs, subsLoading, subsError] = useCollection(

        db.collection("wheelSubmissions"),
        {}

    );

    <div clasName={ styles.submissionList }>

        {subsLoading && <span>Submissions: Loading...</span>}
        {subs && subs.docs.map((doc) => (
            <div>
                <div className={styles.subOdds}></div>
                    {JSON.stringify(doc.data())},{' '}
                <div className={styles.subChecked}></div>
                <span className={styles.clearSubX}>X</span>
            </div>
        ))}


    </div>

}

export default submissionList
