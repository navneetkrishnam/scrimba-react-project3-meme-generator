'use client'

import React from 'react'
import axios from 'axios'
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import download from 'downloadjs';

import styles from './Meme.module.css'

export default function Meme() {

    const [memeData, setMemeData] = React.useState({
        topText: '',
        bottomText: '',
        memeImageUrl: 'http://i.imgflip.com/1bij.jpg'
    })

    const [cachedMemes, setCachedMemes] = React.useState([])

    function handleChange(event) {
        event.preventDefault()
        const { name, value } = event.target;
        setMemeData(prevMemeData => ({
            ...prevMemeData,
            [name]: [value]
        }))
    }

    React.useEffect(() => {
        async function getMemes() {
            const response = await axios({
                method: 'GET',
                baseURL: 'https://api.imgflip.com',
                url: '/get_memes'
            })
            setCachedMemes(response.data)
        }

        getMemes()
    }, [])

    function handeClick(event) {
        event.preventDefault()
        const memeImage = cachedMemes.data.memes[Math.floor(Math.random() * cachedMemes.data.memes.length)].url
        setMemeData(prevMemeData => ({
            ...prevMemeData,
            memeImageUrl: memeImage
        }))
    }

    function handleDownload() {
        htmlToImage.toJpeg(document.getElementById('memeImageSection'))
            .then(function (dataUrl) {
                download(dataUrl, 'my-image.jpg');
            });
    }

    return (
        <div className={styles.mainContainer}>
            <form className={styles.inputSection}>
                <div className={styles.inputDiv}>
                    <input
                        className={styles.inputField}
                        type='text'
                        name='topText'
                        placeholder='Top Text'
                        onChange={handleChange}
                        value={memeData.topText}
                    />
                    <input
                        className={styles.inputField}
                        type='text'
                        name='bottomText'
                        placeholder='Bottom Text'
                        onChange={handleChange}
                        value={memeData.bottomText}
                    />
                </div>
                <button
                    className={styles.inputField}
                    id={styles.getMemeImageButton}
                    onClick={handeClick}
                >Get a new meme image 🖼</button>
                <div id='memeImageSection' className={styles.memeImageSection}>
                    <img src={memeData.memeImageUrl} />
                    <p className={styles.memeText} id={styles.topText}>{memeData.topText}</p>
                    <p className={styles.memeText} id={styles.bottomText}>{memeData.bottomText}</p>
                </div>
            </form>
            <button id={styles.downloadButtom} onClick={handleDownload}>🔽 Download Image</button>
        </div>
    )
}