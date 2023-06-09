'use client';

import { AiOutlineSearch, AiFillCloseCircle } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import searchStore from '@/app/store/searchStore';
import { observer } from 'mobx-react';

import styles from './Search.module.scss';
import tabStore from '@/app/store/tabStore';

const Search: React.FC = observer(() => {

 const router = useRouter()

 const [search, setSearch] = useState("")

 const storeSearch = searchStore.search

 const handleOnSubmit = (e: any) => {
  e.preventDefault();
  searchStore.setSearch(search)
  router.push('search')
  tabStore.setTab('All')
 }

 const goToHome = () => {
  router.push('/')
  searchStore.setSearch('')
  setSearch('')
  tabStore.setTab('Posts')
 }

 return (
  <div className={styles.inputContainer}>
   <form onSubmit={handleOnSubmit}>
    <input
     placeholder='Search'
     onChange={(e) => setSearch(e.target.value)}
     value={search}
    />
   </form>

   {storeSearch.length > 1 ? (
    <AiFillCloseCircle color='lightgray' size={20} onClick={goToHome} />
   ) : (
    <AiOutlineSearch color='lightgray' size={20} onClick={handleOnSubmit} />
   )}

  </div>

 );
})

export default Search;