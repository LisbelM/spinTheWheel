import styles from '../styles/wheelSubForm.module.css'

import { useCollection } from "react-firebase-hooks/firestore";

const wheelSubForm = () => (

    <div className={styles.subForm}>

        <span style={{ float: "right" }}>X</span>

        <img src='' />
        <span className={ styles.subFormTitle }>Spin the wheel entry</span>
        <span>Submit an entry for the wheel. One entry per show</span>

        <label for='subFromText'>Write your entry</label>
        <input name='subFormText' type="text"></input>

        <button>Close</button>
        <button className={ styles.submitButton } type='submit' onClick={() => addWheelSub()}>Submit</button>

        <div className={styles.subFormDisclaimer }>Ludwig will accept or reject your entry.</div>

    </div>
    
)

const addWheelSub = async () => {
    await db.collection("wheelSubmissions").doc(user.uid).set({
        vote,
    });
};


export default wheelSubForm