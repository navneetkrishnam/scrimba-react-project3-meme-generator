import styles from './Header.module.css'
import Image from 'next/image'

import logo from '../public/troll-face.png'

export default function Header() {
    return (
        <div className={styles.headerSection}>
            <Image id={styles.logo} src={logo} alt='Logo'/>
            <h2 id={styles.headingText}>Meme Generator</h2>
            <p id={styles.subHeadingText}>Developer - MNK</p>
        </div>
    )
}