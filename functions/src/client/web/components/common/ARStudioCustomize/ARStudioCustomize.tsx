import React from 'react'

import SolidButton from '../buttons/SolidButton'
import Input from '../inputs/Input'
import ImageInput from '../inputs/ImageInput'

import styles from './ARStudioCustomize.module.css'
import ColorPicker from '../inputs/ColorPicker'
import Toggle from '../inputs/Toggle'

interface IProps {
    actionBUttonTextColor : string,
    setActionBUttonTextColor : (actionBUttonTextColor : string) => void,
    actionButtonColor : string,
    setActionButtonColor : (actionButtonColor :string) => void,
    actionButtonLink : string ,
    setActionButtonLink : (actionButtonLink : string) => void,
    actionInfoBackgroundColor : string ,
    setActionInfoBackgroundColor : (value : string) => void ,
    actionButtonText : string,
    setActionButtonText : (actionButtonText  : string) => void,
    hasBackground : boolean ,
    setHasBackground : (value : boolean) => void,
    postBackgroundImageBase64 : string ,
    setPostBackgroundImageBase64 : (src : string) => void,
    hasShadow : boolean ,
    setHasShadow : (value : boolean) => void,
    autoPlay : boolean,
    setAutoPlay : (value : boolean) => void,
    onFinish : () => void,
    onBack : () => void,
    error : {[key : string] : string},
    buttonText : string ,
    backButtonText : string,
    hasCallToAction : boolean,
    setHasCallToAction : (value : boolean) => void,
    actionButtonInfoText : string,
    setActionButtonInfoText : (value : string) => void
}

const ARStudioPostDetail = (props : IProps) => {
    const { error, actionButtonInfoText, setActionButtonInfoText, hasCallToAction, setHasCallToAction, autoPlay, hasShadow, setAutoPlay, setHasShadow, hasBackground, setHasBackground, buttonText, actionInfoBackgroundColor, setActionInfoBackgroundColor, backButtonText, onFinish , postBackgroundImageBase64, setPostBackgroundImageBase64, actionBUttonTextColor ,actionButtonColor, actionButtonLink, actionButtonText, onBack, setActionBUttonTextColor, setActionButtonColor, setActionButtonLink, setActionButtonText  } = props

    return (
        <div className={styles.root}>
            <div className={styles.inputWrapper}>
                <Toggle active={hasCallToAction} setActive={setHasCallToAction} text='Set Call To Action' />
                {hasCallToAction?
                <>
                    <Input error={error.actionButtonLink} maxInputLength={500} required text="Action button link"  type="text" value={actionButtonLink} onChange={setActionButtonLink} />
                    <Input error={error.actionButtonInfoText} maxInputLength={100} required text="Action button info text"  type="text" value={actionButtonInfoText} onChange={setActionButtonInfoText} />
                    <br></br>
                    <div style={{width:'100%',display:'flex',flexDirection:'row'}}>
                        <Input error={error.actionButtonText} maxInputLength={13} required text="Action button Text"  type="text" value={actionButtonText} onChange={setActionButtonText} />
                        &nbsp;&nbsp;
                        <ColorPicker color={actionBUttonTextColor} setColor={setActionBUttonTextColor} text='Text Color' />
                    </div>
                    <br></br>

                    <ColorPicker color={actionButtonColor} setColor={setActionButtonColor} text='Action Button Color' />
                    <br></br>
                    <ColorPicker color={actionInfoBackgroundColor} setColor={setActionInfoBackgroundColor} text='Info Area Backgroun Color' />
                    <br></br>

                    <Toggle  active={hasShadow} setActive={setHasShadow} text="Shadow" />
                    <Toggle  active={autoPlay} setActive={setAutoPlay} text="Autoplay" />
                    <br></br>
                </>:null}                
                <div className={styles.contentImageContainer}>
                    <div className={styles.imageInputContainer}>
                        <ImageInput error={error.postBackgroundImageBase64} toggle={hasBackground} setToggle={setHasBackground} setImageSrc={setPostBackgroundImageBase64}  imageSrc={postBackgroundImageBase64} text='Skybox*' extensions={['hdr','jpeg','jpg']}/>
                    </div>
                </div>
            </div>
            <div style={{display:'flex' , width:'40vw', flexDirection : 'row' , justifyContent : 'space-between'}}>
                <div className={styles.buttonWrapper}>
                    <SolidButton onClick={onBack} ><h3>{backButtonText}</h3></SolidButton>
                </div>
                <div className={styles.buttonWrapper}>
                    <SolidButton onClick={onFinish} ><h3>{buttonText}</h3></SolidButton>
                </div>
            </div>
        </div>)
}

export default ARStudioPostDetail