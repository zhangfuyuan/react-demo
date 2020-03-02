import React from 'react'
import { Button } from 'antd'
import './index.less'

export default function LinkButton(porps) {
    return (
        <Button className='linkButton' type='link' {...porps} />
    )
}
