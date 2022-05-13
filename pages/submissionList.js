import styles from "../styles/submissionList.module.css"
import { useContext } from "react"

import { submissionListContext } from "./adminArea"

function SubmissionList() {

    const { subs, subsLoading, subsError } = useContext(submissionListContext)

    return (
        <div className={styles.submissionList}>

            <span> Wheel Items ({})</span>

            <div className={styles.usrSelfSubDiv}>
                <div className={styles.submission}>
                    <input className={styles.subOdds} placeholder="1"></input>
                    <input className={styles.submissionInfoInput} placeholder="Enter an item"></input>
                    <button className={styles.usrSelfSubAdd}>Add</button>
                </div>
            </div>

            <hr></hr>

            {subsError && <strong>Error: {JSON.stringify(subsError)}</strong>}
            {subsLoading && <span>Submissions: Loading...</span>}
            {subs && subs.docs.map((doc) => (
                <div style={{ width: '100%', height: '100%'}}>
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

export { SubmissionList }
