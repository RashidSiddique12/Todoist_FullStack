import { Alert } from 'antd'
import React from 'react'

function ErrorEle({message}) {
  return (
    <div>
      <Alert
      message="Error"
      description={message}
      type="error"
      showIcon
    />
    </div>
  )
}

export default ErrorEle
