import { LoadingOutlined } from '@ant-design/icons'
import { Progress, Spin } from 'antd'
import React from 'react'

function LoadingEle({size = 35}) {
  return (
    <div style={{display : "flex", justifyContent:"center"}} >
     <Spin
    indicator={
      <LoadingOutlined
        style={{
          fontSize: size,
          
        }}
        spin
      />
    }/>
    </div>
  )
}

export default LoadingEle
