import { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MENU_ACTIONS, WORKSPACE_ACTIONS, FRAME_DATA } from '@/data/modules'
import { Icon } from '@/comps/modules'

const MENU_TYPE = 'MENU_CLIP'

const Clip = ({ dt }) => {

    const [ldt, setLdt] = useState(dt.data ? dt.data : {
        height: 40,
        tools: []
    })
    const currentTool = useSelector(state => state.workspace.currentTool)
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(WORKSPACE_ACTIONS.UPDATE_TOOL({ id: dt.id, props: { data: ldt } }))

    }, [ldt])
    useEffect(() => {

        declip()

    }, [currentTool])
    const openMenu = (e) => {

        if (e && e.stopPropagation) e.stopPropagation()

        dispatch(MENU_ACTIONS.OPEN({
            type: MENU_TYPE,
            posX: e.clientX,
            posY: e.clientY,
            dt
        }))

    }
    const moveClip = (e) => {

        declip()

        let shiftX = e.clientX - dt.posX
        let shiftY = e.clientY - dt.posY
        let posX = 0
        let posY = 0

        const move = (e) => {
            posX = e.clientX - shiftX
            posY = e.clientY - shiftY
            dispatch(WORKSPACE_ACTIONS.UPDATE_TOOL({
                id: dt.id,
                props: { posX, posY }
            }))
            ldt.tools?.forEach((id, index) => {
                dispatch(WORKSPACE_ACTIONS.UPDATE_TOOL({
                    id: id,
                    props: { posX: posX, posY: posY + FRAME_DATA.headHeight * ( index+1 ) }
                }))
            })
        }
        const rest = () => {
            document.removeEventListener('mousemove', move)
            document.removeEventListener('mouseup', rest)
        }

        document.addEventListener('mousemove', move)
        document.addEventListener('mouseup', rest)

    }
    const clip = (e) => {

        stopPropagation(e)
        if (currentTool && !ldt.tools.includes(currentTool)) {

            setLdt(state => ({
                height: state.height + FRAME_DATA.headHeight,
                tools: [ ...state.tools, currentTool ]
            }))

            dispatch(WORKSPACE_ACTIONS.UPDATE_TOOL({
                id: currentTool,
                props: { posX: dt.posX, posY: dt.posY + ldt.height, minimize: true, clip: true}
            }))

        }

    }
    const declip = () => {

        if (ldt.tools.includes(currentTool)) {
            setLdt(state => ({
                height: state.height - FRAME_DATA.headHeight,
                tools: state.tools.filter(id => id !== currentTool)
            }))

            dispatch(WORKSPACE_ACTIONS.UPDATE_TOOL({
                id: currentTool,
                props: { minimize: false, clip: false}
            }))
        }

    }

    const stopPropagation = (e) => e.stopPropagation()

    return (
        <>

            <div
                className={`flex v-flex br absolute light-border z-index bright-2`}
                style={
                    {
                        left: dt.posX + 50,
                        top: dt.posY,
                        width: dt.width - 50,
                        height: ldt.height,
                        transition: 'height .2s'
                    }
                }
                onMouseEnter={clip}
                onMouseLeave={stopPropagation}
                onMouseDown={stopPropagation}
                onDoubleClick={stopPropagation}
                onWheel={stopPropagation}
            >

                <div className='row sm-p' style={{ height: FRAME_DATA.headHeight }} onMouseDown={moveClip}>
                    <div className='col-1 flex h-start'>
                        <Icon type={'clip'} styles={['sm-i', 'light-i']} />
                    </div>
                    <div className={`col-8 xl-fw clr-light overflow-hidden`}>
                        {dt.title}
                    </div>
                    <div className='col-1 flex h-end' onMouseDown={openMenu}>
                        <Icon type={'menu-2'} styles={['sm-i', 'light-i']} />
                    </div>
                </div>

                <div className={`full flex`}></div>

            </div>

        </>
    )

}

export default memo(Clip)