import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCartProduct from '../components/HorizontalCartProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCartProduct category={"airpodes"}  heading={"Top's Airpodes"}/>
      <HorizontalCartProduct category={"earphones"}  heading={"Popular's Earphones"}/>
      <HorizontalCartProduct category={"mobiles"}  heading={"Popular's mobiles"}/>
      <HorizontalCartProduct category={"trimmers"}  heading={"Popular's trimmers"}/>
      <HorizontalCartProduct category={"printers"}  heading={"Popular's printers"}/>
      <HorizontalCartProduct category={"refrigerator"}  heading={"Popular's refrigerator"}/>
      <HorizontalCartProduct category={"televisions"}  heading={"Popular's televisions"}/>
      <HorizontalCartProduct category={"camera"}  heading={"Popular's camera"}/>
      <HorizontalCartProduct category={"processor"}  heading={"Popular's processor"}/>
      <HorizontalCartProduct category={"watches"}  heading={"Popular's watches"}/>
    </div>
  )
}

export default Home