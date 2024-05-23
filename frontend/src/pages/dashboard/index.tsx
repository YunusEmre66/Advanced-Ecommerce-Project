import { LayoutsTypes } from '@/layouts/Types'
import Link from 'next/link'
import React from 'react'

const Dashboard: LayoutsTypes = () => {
  return (
    <div>
      <Link href="/dashboard/users">Users</Link>
      <Link href="/dashboard/products">Products</Link>
    </div>
  )
}

Dashboard.Layout = "Dashboard"
export default Dashboard