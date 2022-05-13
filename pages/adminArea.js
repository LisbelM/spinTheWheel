import styles from "../styles/adminArea.module.css"

import { SubmissionList } from "./submissionList"
import { WheelCanvas } from "./wheelComponent"

const adminArea = () => (

    <div className={styles.adminArea}>

        <WheelCanvas />
        <SubmissionList />

 {/*       <button>Spin History</button>
        <button>End Wheel</button>*/}
    </div>
        
)

export default adminArea