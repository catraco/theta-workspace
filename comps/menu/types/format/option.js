import { useState } from 'react'
import { Icon } from '@/comps/modules'


const Option = ({ icon, name, action, subMenu }) => {

    const [ldt, setLdt] = useState({ menu: false })

    return <>

        <div
            className='col-10 row relative v-center h-space-between effect-option sm-py md-px'
            onClick={action}
            onMouseEnter={() => setLdt(state => ({ ...state, menu: true }))}
            onMouseLeave={() => setLdt(state => ({ ...state, menu: false }))}
        >

            {
                icon ?
                <div className='col-1'>
                    <Icon type={icon.type} styles={icon.styles} effect={false} />
                </div> 
                :
                null
            }

            <div className='col-8 sm-px title'>
                {name}
            </div>

            <div className={`col--1 ${subMenu ? null : 'hide'}`}>
                <Icon type={'start'} styles={['sm-i', 'light-i']} effect={false} />
            </div>

            <div
                className={ldt.menu && subMenu ? null : 'hide'}
                style={{
                    position: 'absolute',
                    whiteSpace: 'nowrap',
                    top: 'calc( var(--sm-u) * -1 )',
                    right: 0,
                    transform: 'translate(100%)',
                }}
            >
                {subMenu}
            </div>

        </div>

    </>

}

export default Option