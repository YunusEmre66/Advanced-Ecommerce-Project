import CategoryList from '@/components/category/category-list'
import { useGetCategoryQuery } from '@/services/category';
import React from 'react'
import { LayoutsTypes } from "@/layouts/Types";

const Category: LayoutsTypes = () => {

  return (
    <CategoryList/>
  )
}

Category.Layout = "Dashboard";
export default Category