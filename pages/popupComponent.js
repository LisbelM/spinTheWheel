import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import styles from "../styles/popup.module.css"

const popup = (props) => (
    <Popup trigger={<button className="button"> Open Modal </button>} modal nested  >
        {close => (
        <div>
            <span className={styles.popupTitle}>{ props.title }</span>
            <span className={styles.subTitle}>{ props.subtitle }</span>

            <button className={styles.firstBtn}>{ props.firstBtn }</button>
            <button className={styles.secoindBtn}>{ props.secondBtn }</button>
        </div>
    )}
    </Popup>
)

export default popup;