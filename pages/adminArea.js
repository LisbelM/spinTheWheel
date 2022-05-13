import styles from "../styles/adminArea.module.css"
import popupStyles from "../styles/popup.module.css"

import { SubmissionList } from "./submissionList"
import WheelComponent from "./wheelComponent";
import { createContext, useState } from "react"

import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore'
import firebase from "../firebase/clientApp";
import "firebase/compat/firestore";

import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

import Modal from 'react-modal';
Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,0.2)'; /*overlay*/
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'var(--navyBlue)',
        width: '25%',
        border: 'none'
    },
};

export const submissionListContext = createContext({ subs: [], subsLoading: [], subsError: [] });
export const winnerContext = createContext();


export default function App() {

    const db = firebase.firestore();

/*    const getSpinHistory = async () => {
        db.collection('wheelSubmissions'),
        {}
    }*/

    const [popUpValues, setWinner] = useState({
        popupBool: false,
        winnerSubmission: '',
        winnerUsrName: '',
    })

    const [subs, subsLoading, subsError] = useCollection(
        db.collection("wheelSubmissions"),
        {}
    );

    function closeModal() {
        setWinner({ ...popUpValues, popupBool: false });
    }

    return (
        <submissionListContext.Provider value={{ subs, subsLoading, subsError }}>
        <winnerContext.Provider value={{ popUpValues, setWinner }}>
                <div className={styles.adminArea}>
                <WheelComponent />
                <SubmissionList />

                <div className={styles.adminBtnsContainer}>
                    <button className={styles.spinHistBtn}>Spin History</button>
                    <button className={styles.endWheelBtn}>End Wheel</button>
                 </div>

                <Modal
                    isOpen={popUpValues.popupBool}
                    style={customStyles}
                >
                    <h2 className={popupStyles.popupTitle}>{popUpValues.winnerSubmission}</h2>
                    <span className={popupStyles.subTitle}>{popUpValues.winnerUsrName}</span>
                    <button className={popupStyles.doneBtn} onClick={closeModal}>Done</button>
                    <button className={popupStyles.hideChoiceBtn} onClick={closeModal}>Hide Choice</button>
                </Modal>

            </div>
        </winnerContext.Provider>
        </submissionListContext.Provider>
    );
}
