import React, { useEffect, useState } from 'react'
import Navbar from '../../common/Navbar'
import {useRouter}  from 'next/router'

import SupportBanner from '../../../../assets/banners/Active Support.svg'
import TelegramIcon from '../../../../assets/icons/contact icons/Telegram.svg'
import EmailIcon from '../../../../assets/icons/contact icons/email.svg'
import CallIcon from '../../../../assets/icons/contact icons/Call.svg'
import ChatIcon from '../../../../assets/icons/contact icons/Chat.svg'
import FAQsIcon from '../../../../assets/icons/contact icons/FAQs.svg'
import FeatureRequestIcon from '../../../../assets/icons/contact icons/Feature.svg'

import styles from './Support.module.css'
import firebase from 'firebase'
import { getUser } from '../../../API/user'

const Support = () => {

    const router  = useRouter()
    const [ imageSrc, setImageSrc ] = useState('')
    const [ accountType, setAccountType ] = useState('')

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async function(user) {
            try {
                if(user) {
                    const user = await getUser(false, null)
                    if(user && user.data.data){
                        const userData = user.data.data
                        if(userData.profilePicURL) {
                            firebase.storage().ref(userData.profilePicURL).getDownloadURL().then((url : any) => {
                                setImageSrc(url)
                            })
                        }
                        setAccountType(userData.accountType)
                    }
                }
            } catch (error) {

            }
        })
    })

    return (
        <div className={styles.root}>
            <Navbar imageSrc={imageSrc} />
            <div className={styles.bodyContainer}>
                    <div className={`${styles.column} ${styles.section}`}>
                       <h2>Need Support?</h2>
                       <br></br>
                       <p>We are here to help you further!<br></br>Please choose one of the support methods below:</p>
                       <br></br>
                       <br></br>
                        <div className={`${styles.row} ${styles.formContainer}`}>
                            <div className={`${styles.column} ${styles.supportItem}`}>
                                <FAQsIcon />
                                <p className={styles.supportItemText}>FAQs</p>
                            </div>
                            <div className={`${styles.column} ${styles.supportItem}`}>
                                <EmailIcon />
                                <p className={styles.supportItemText}>Email</p>
                            </div>
                            <div className={`${styles.column} ${styles.supportItem}`}>
                                <FeatureRequestIcon />
                                <p className={styles.supportItemText}>Request Feature</p>
                            </div>
                        </div>
                        {accountType && accountType!=='FREE'?
                        <div className={`${styles.row} ${styles.formContainer}`}>
                            <div className={`${styles.column} ${styles.supportItem}`}>
                                <CallIcon />
                                <p className={styles.supportItemText}>Call</p>
                            </div>
                            <div className={`${styles.column} ${styles.supportItem}`}>
                                <ChatIcon />
                                <p className={styles.supportItemText}>Chat</p>
                            </div>
                            <div className={`${styles.column} ${styles.supportItem}`}>
                                <TelegramIcon />
                                <p className={styles.supportItemText}>Telegram</p>
                            </div>
                        </div>:null}
                    </div>

                <div className={styles.banner}>
                    <SupportBanner />
                </div>
            </div>
        </div>
    )
}

export default Support