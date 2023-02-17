import { Typography } from 'antd'
import React from 'react'

function Footer(){
  return (
    <div className='Footer'>
      <Typography.Link href='https://www.google.com'> Privacy Policy</Typography.Link>
      <Typography.Link href='https://www.google.com'> Terms and Conditions</Typography.Link>
      <Typography.Link href='tel:+072637123'> tel:+072637123</Typography.Link>
    </div>
  )
}

export default Footer