'use client';

import { CSSProperties } from 'react';

import ClipLoader from "react-spinners/ClipLoader";


const Loader = () => {
 return (
  <ClipLoader
   color="#7289da"
   size={125}
  />
 );
}

export default Loader;