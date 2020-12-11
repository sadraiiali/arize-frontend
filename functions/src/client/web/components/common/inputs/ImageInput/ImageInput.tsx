import React , { useState } from 'react'
import { ImagePicker } from 'react-file-picker'

const mimeTypes =  require('mimetypes')

import CropperModal from '../../CropperModal'

import ImageUploadLogo from '../../../../../assets/icons/image upload.svg'

import styles from './ImageInput.module.css'
import { Switch } from '@material-ui/core'



interface IProps {
    text : string,
    extensions? : string[],
    imageSrc : string,
    setImageSrc : (image : string) => void,
    toggle? : boolean,
    setToggle? : (value : boolean) => void
}

const ImageInput = (props : IProps) => {
    const { toggle, setToggle, text, extensions, imageSrc, setImageSrc } = props

    const [ modalOpen , setModalOpen ] = useState(false)

    const onImageChange = (base64Image : string) => {
        let mimeType = base64Image.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)![1]
        const extension = mimeTypes.detectExtension(mimeType)
        if(extensions) {
            const result = extensions.findIndex((item) => item===extension)
            if(result !== -1) {
                setImageSrc(base64Image)
                setModalOpen(true)
            } else {
                setImageSrc('')
                setModalOpen(false)
            }
        } else {
            setImageSrc(base64Image)
            setModalOpen(true)
        }
    } 

    return <div className={styles.root}>
            <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <p>{text}</p>
                {toggle !== undefined?<Switch
                    checked={toggle}
                    // @ts-ignore
                    onChange={(event) => setToggle(event.target.checked)}
                    color="primary"
                    name="checkedB"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />:null}
            </div>
            {/* @ts-ignore */}
            {toggle === undefined || toggle ?
                <>
                {imageSrc === '' && typeof window !== "undefined" ? 
                <div className={styles.imagePickerButton}>
                    {extensions?<ImagePicker
                        extensions={extensions}
                        dims={{width : '100%' , height : '100%'}}
                        onChange={onImageChange}
                        onError={(errMsg : any) => {console.log(errMsg)}}
                    >
                        <div onClick={() => setModalOpen(true)}  style={{display:'flex',justifyContent:'center',alignItems:'center'}}>

                            <ImageUploadLogo />
                        </div>
                    </ImagePicker>:<ImagePicker
                        dims={{width : '100%' , height : '100%'}}
                        onChange={onImageChange}
                        onError={(errMsg : any) => {console.log(errMsg)}}
                    >
                        <div onClick={() => setModalOpen(true)}  style={{display:'flex',justifyContent:'center',alignItems:'center'}}>

                            <ImageUploadLogo />
                        </div>
                    </ImagePicker>} 
                </div> :
                <div className={styles.imagePickerButton}>
                    <img onClick={() => setModalOpen(true)} src={imageSrc} className={styles.image}>

                    </img>
                </div>}
                <CropperModal onCroppingFinished={(newImage : string) => setImageSrc(newImage)} imageSrc={imageSrc} onImageChange={setImageSrc} modalOpen={modalOpen} onRequestClose={() => setModalOpen(false)} />
                </>
            :null}
        </div>
}

export default ImageInput