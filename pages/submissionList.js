import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore'
import firebase from "../firebase/clientApp";
const db = firebase.firestore();

const [subs, subsLoading, subsError] = useCollection(
    db.collection("wheelSubmissions"),
    {}
);


const submissionList = () => (

    <div>

        {subsLoading && <span>Submissions: Loading...</span>}
        {subs && subs.docs.map((doc) => (
            <div>
                {JSON.stringify(doc.data())},{' '}
            </div>
        ))}


    </div>
    
)

export default submissionList
