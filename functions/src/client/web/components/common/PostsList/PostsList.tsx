import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Input from '../inputs/Input'
import SearchIcon from '../../../../assets/icons/search-input.svg'
import SolidButton from '../buttons/SolidButton'

import EmptyStateIcon from '../../../../assets/banners/Empty state.svg'
import EmptySearchIcon from '../../../../assets/banners/File searching.svg'

import styles from './PostsList.module.css'
import PostCard from '../PostCard'

interface IProps {
    searchText : string,
    setSearchText : (txt : string) => void,
    list : IPost[]
}

interface IPost { status: string,arViews : [] , tdViews : [] , shares : [] ,imageURL : string, id : string, title : string }

const SearchBar = ({ text, setText } : { text : string, setText : (text : string) => void }) => {
    return (
        <div style={{width:'100%',position:'sticky',top:'0px'}}>
            <Input required={false} type='text' LeftIcon={SearchIcon} onChange={setText} value={text} />
        </div>
    )
}

const PostsRow = (props : {list : IPost[], chunk : number} ) => {

    const itemWidth = (3 / props.list.length) * 30
    const containerWidth = (props.list.length / props.chunk) * 100

    return (
        <div style={{marginBottom:'10px',width:`${containerWidth}%`,display:'flex',flexDirection:'row-reverse',alignItems:'center',justifyContent:'flex-start'}}>
            {props.list.map((item, index) => 
                <div key={item.id} style={{width:`${itemWidth}%`,margin:'auto'}}>
                    <PostCard {...item} />
                </div>
            )}
        </div>
    )
}

const PostsColumn = (props : {list:IPost[],windowWidth:number}) => {
    const renderRows = () => {
        const { windowWidth } = props
        
        let results : any[] = []

        let i = 0
        let chunk = 3;
        if(!windowWidth || windowWidth === 0) {
            return results
        } else {
            if(windowWidth < 1200) {
                chunk = 2
            }
            if( windowWidth < 800) {
                chunk = 1
            }
            for (i=props.list.length; i>0; i-=chunk) {
                results.push(<PostsRow  list={props.list.slice(Math.max(i-chunk,0),i)} chunk={chunk}/>)
            }
        }

        return results
    }
    return (
        <div style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start'}}>
            {renderRows()}
        </div>
    )
}

const Posts = (props : {list:IPost[], windowWidth : number}) => {
    return (
        <PostsColumn windowWidth={props.windowWidth} list={props.list} />
    )
}

const EmptyList = () => {
    const router = useRouter()

    return(
        <div className={styles.column}>
            <EmptyStateIcon />
            <br></br>
            <h4>You have not posted any ar content yet :(</h4>
            <br></br>
            <div style={{width:'140px',marginBottom:'100px'}}>
                <SolidButton onClick={() => router.push('/arstudio')}  ><h3>Get Started</h3></SolidButton>
            </div>
        </div>
    )
}

const NoSearchResultList = () => {
    return(
        <div className={styles.column}>
            <h2>No Results :(</h2>
            <br></br>
            <p>Check your spelling or search something else!</p>
            <br></br>
            <EmptySearchIcon />
        </div>
    )
}

const PostsList = (props : IProps) => {
    const { searchText, setSearchText, list } = props
    const [ windowWidth, setWindowWidth ] = useState(0)

    const updateWindowWidth = () => setWindowWidth(window.innerWidth)

    useEffect(() => {

        if(typeof window !== 'undefined') {
            setWindowWidth(window.innerWidth)
            window.addEventListener('resize' , updateWindowWidth)
        }

        return () => {
            if(typeof window !== 'undefined') {
                window.removeEventListener('resize', updateWindowWidth)
            }
        }
    }, [])

    const filteredList = list.filter((item) => item.title.indexOf(searchText) !== -1)

    return (
        <div className={styles.root}>
            {
                list.length === 0 ? 
                <EmptyList />:
                filteredList.length === 0 ?
                <NoSearchResultList />:
                <Posts windowWidth={windowWidth} list={filteredList} />
            }
            <br></br>
            <SearchBar text={searchText} setText={setSearchText}  />
        </div>
    )
}

export default PostsList