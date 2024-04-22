'use client'

import React from "react"

import Header from "./Header"
import Meme from "./Meme"

import styles from './Page.module.css'

export default function App() {
    return (
        <div className={styles.memeGenerator}>
            <Header />
            <Meme />
        </div>
    )
}