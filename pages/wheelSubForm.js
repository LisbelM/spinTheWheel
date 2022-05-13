import styles from '../styles/wheelSubForm.module.css'
import firebase from "../firebase/clientApp";
import "firebase/compat/firestore";

import React, { useRef } from "react";

const db = firebase.firestore();

const addWheelSub = async (submission) => {
    await db.collection("wheelSubmissions").doc().set({
        /*mock values used for usr until connected to main app*/
        /*        usrId: usr.id,
                usrName: usr.name,*/
        usrId: '123',
        usrName: 'jack',
        submission: submission,
        odds: 1, /*defualt*/
        selected : false /*default*/
    });
};

const wheelSubForm = () => {

    let submissionText = useRef();

    return (
        <div className={styles.subForm}>

            <span style={{ float: "right" }}>X</span>

            <img src='' />
            <span className={styles.subFormTitle}>Spin the wheel entry</span>
            <span>Submit an entry for the wheel. One entry per show</span>
            
            <div className={ styles.subFormdiv }>
                <label for='subFromText'>Write your entry</label>
                <input ref={submissionText} name='subFormText' type="text"></input>
            </div>

            <div className={styles.subBtnContainer}>
                <button>Close</button>
                <button className={styles.submitButton} type='submit' onClick={() => addWheelSub(submissionText.current.value)}>Submit</button>
            </div>

            <div className={styles.subFormDisclaimer}>Ludwig will accept or reject your entry.</div>

        </div>
     )

}

export default wheelSubForm