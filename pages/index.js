import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import React from "react";
import Link from "@material-ui/core/Link";

export default function Home() {
    return (
        <div className={styles.landingPageDiv}>
            <Link href="./wheelSubForm">
                <button className={styles.usrSubmitBtn}>User Submit Form</button>
            </Link>
            <Link href="./adminArea">
                <button className={styles.adminPageBtn}>Admin Page</button>
            </Link>
      </div>
  )
}
