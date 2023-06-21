'use client';

import { AiOutlineSearch, AiFillCloseCircle } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react';
import searchStore from '@/app/store/searchStore';
import { observer } from 'mobx-react';

import styles from './Search.module.scss';
import tabStore from '@/app/store/tabStore';

const Search: React.FC = observer(() => {

 const router = useRouter()

 const inputRef = useRef<HTMLInputElement>(null);

 const [search, setSearch] = useState("")
 const [dropdown, setDropdown] = useState(false)
 const [recentSearches, setRecentSearches] = useState<string[]>([]);
 const [showQuickActions, setShowQuickActions] = useState(false)


 const storeSearch = searchStore.search

 const handleOnSubmit = (e: any) => {
  e.preventDefault();
  searchStore.setSearch(search)

  const updatedSearches = [search, ...recentSearches];
  setRecentSearches(updatedSearches);

  localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));

  router.push('search')
  tabStore.setTab('All')
 }

 const goToHome = () => {
  router.push('/')
  searchStore.setSearch('')
  setSearch('')
  tabStore.setTab('Posts')
 }

 const handleInputClick = () => {
  setDropdown(true);
 };

 useEffect(() => {
  if (inputRef.current && inputRef.current.value.length > 0) {
   setShowQuickActions(true)
  } else {
   setShowQuickActions(false);
  }
 }, [search]);

 useEffect(() => {
  const storedSearches = localStorage.getItem('recentSearches');
  if (storedSearches) {
   setRecentSearches(JSON.parse(storedSearches));
  }
 }, []);

 const handleRecentClick = (search: string) => {
  searchStore.setSearch(search)

  router.push('search')
  tabStore.setTab('All')
 }

 const removeSearchResult = (result: string) => {
  const updatedSearches = recentSearches.filter(search => search !== result);

  setRecentSearches(updatedSearches);
  localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
 }

 const handlePostSearchClick = (search: string) => {
  searchStore.setSearch(search)

  router.push('search')
  tabStore.setTab('Posts')
 }


 const handleProfileSearchClick = (search: string) => {
  searchStore.setSearch(search)

  router.push('search')
  tabStore.setTab('Profiles')
 }





 return (
  <div className={styles.inputContainer}>
   <form onSubmit={handleOnSubmit}>
    <input
     placeholder='Search'
     onChange={(e) => setSearch(e.target.value)}
     value={search}
     ref={inputRef}
     onClick={handleInputClick}
    />
    {dropdown && (
     <>
      <div className={styles.overlay} onClick={() => setDropdown(false)}>
      </div>

      <div className={styles.dropdown}>
       {!showQuickActions && (
        <>
         <strong>Recent Searches</strong>
         {recentSearches.length < 1 ? (
          <span>No recent searches</span>
         ) : (
          recentSearches.map((search, i) => (
           <div key={i} className={styles.recentSearch}>
            <AiFillCloseCircle
             onClick={() => removeSearchResult(search)}
             className={styles.closeIcon}
            />
            <span onClick={() => handleRecentClick(search)}>{search}</span>
           </div>
          ))
         )}
        </>
       )}

       {showQuickActions && inputRef.current && (
        <>
         <strong style={{ paddingLeft: '10px' }}>Quick Actions</strong>
         <ul>
          <li onClick={() => handleProfileSearchClick(search)}>Profiles matching
           <span>{inputRef.current.value}</span>
          </li>
          <li onClick={() => handlePostSearchClick(search)}>Posts matching
           <span>{inputRef.current.value}</span>
          </li>
         </ul>

        </>
       )}

      </div>
     </>
    )}
   </form>

   {storeSearch.length > 1 ? (
    <AiFillCloseCircle color='lightgray' size={20} onClick={goToHome} className={styles.searchIcon} />
   ) : (
    <AiOutlineSearch color='lightgray' size={20} onClick={handleOnSubmit} className={styles.searchIcon} />
   )}

  </div>

 );
})

export default Search;