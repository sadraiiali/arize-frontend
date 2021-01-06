import React , { useEffect, useState } from 'react'
import Head from 'next/head'

import ARizeLog from '../../../assets/icons/logo black new.svg'

import ModelViewer from '../../components/pages/ModelViewer'
import { getPost, view3DPost } from '../../API'
import { getDirectURL } from '../../config/firebase'
import UniqueDeviceIdDetector, { UDIDContext } from '../../components/common/UniqueDeviceIdDetector'

const arstudio = ({ post } : { post:any}) => {
    
    const [ glbURL, setGLBUrl] = useState('')
    const [ usdzURL, setUSDZUrl ] = useState('')
    const [ backGroundImage, setBackgrounImage ] = useState('')
    const [ poster, setPoster ] = useState('')
    const [ viewAdded, setViewAdded ] = useState(false)

    useEffect(() => {
        getDirectURL(post.glbFileURL).then((url) => setGLBUrl(url)).catch(() => '' )
        getDirectURL(post.usdzFileURL).then((url) => setUSDZUrl(url)).catch(() => '' )
        getDirectURL(post.imageURL).then((url) => setPoster(url)).catch(() => '' )
        if(post.backGroundImage) getDirectURL(post.backGroundImage).then((url) => setBackgrounImage(url)).catch(() => '' )
    },[])
    
    return (
        <UniqueDeviceIdDetector>
            <Head>
                <link rel="shortcut icon" href="/images/favicon.png" />
                <title>Model Viewer</title>
                <script type="module" src="https://unpkg.com/@google/model-viewer@1.1.0/dist/model-viewer.js"></script>
                <script noModule src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js"></script>
            </Head>
            <div style={{height:'10vh',width:'100vw',display:'flex',flexDirection:'row',alignItems:'center',paddingLeft:'50px'}}>
                <ARizeLog />
            </div>
            <div style={{width:'100vw',height:'90vh'}}>
                <UDIDContext.Consumer >
                    {value => {
                        const addView = async () => {
                            if(value.UDIDCTX && post.id) {
                                if(!viewAdded) {
                                    // @ts-ignore
                                    await view3DPost(value.UDIDCTX,value.location, post.id)
                                    setViewAdded(true)
                                }
                            }
                        }

                        addView()

                        return <ModelViewer
                            showQR={true}
                            showShare={true}
                            actionButtonInfoText={post.actionButtonInfoText}
                            id={post.id}
                            usdzURL={usdzURL} 
                            glbURL={glbURL} 
                            poster={poster}
                            autoPlay={post.autoPlay}
                            background={backGroundImage} 
                            actionButtonText={post.actionButtonText}
                            actionButtonInfoTextColor={post.actionButtonInfoTextColor}
                            actionButtonInfoBackgroundColor={post.actionInfoBackgroundColor}
                            actionButtonLink={post.actionButtonLink}
                            actionButtonColor={post.actionButtonColor}
                            actionButtonTextColor={post.actionBUttonTextColor}
                        />

                    }}
                </UDIDContext.Consumer>
            </div>
        </UniqueDeviceIdDetector>
)
}


export async function  getServerSideProps (context : any) {
    const id = context.params.pid

    const result = await getPost(id , false)

    return {
      props: { post : result.data.data.data  },
    }
}

export default arstudio