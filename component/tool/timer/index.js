import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import { Manager_Data } from '@/utils/modules'

export default function Timer(params) {

    const frame_id = params.id
    const initial_data = params.data.timer ? params.data.timer : { start: false, loop_id: 0, hour: 0, min: 0, sec: 0, s_hour: 0, s_min: 0, s_sec: 0 }
    const [data, setData] = useState(initial_data)

    useEffect(() => { update() }, [data])

    const update = () => {

        Manager_Data.update_frame(frame_id, { tool_data: { timer: data } })

    }

    const add_zero = (num) => { return num < 10 ? '0' + num : String(num) }

    const start_pause = () => {

        if (data.start) {

            clearInterval(data.loop_id)
            setData(state => { return { ...state, start: false } })

        } else if(data.hour || data.min || data.sec) {

            let hour = data.hour
            let min = data.min
            let sec = data.sec

            let loop_id = setInterval(() => {

                if (sec > 0) sec -= 1
                else if (min > 0) {
                    min -= 1
                    sec = 59
                } else if (hour > 0) {
                    hour -= 1
                    min = 59
                } else {
                    clearInterval(loop_id)
                    setData(state => { return { ...state, start: false } })
                    sound()
                }

                setData(state => {
                    return { ...state, hour, min, sec }
                })


            }, 1000)

            setData(state => { return { ...state, start: true, loop_id } })

        }



    }

    const rest = () => {

        if (data.start) start_pause()
        setData( state => { return {...state, hour: 0, min: 0, sec: 0} })

    }

    const sound = () => {

        const timer_done_sound = new Audio('/timer_done_sound.wav')
        timer_done_sound.play()

    }

    return (

        <div className='container flex-center'>

            <div>

                <div className='flex-center lg-fs lg-my'>

                    <div className={styles.num}>

                        <div
                            className={`${styles.btn_plus} flex-center full-br`}
                            onMouseDown={() => {
                                setData(state => {
                                    return state.hour < 59 ? { ...state, hour: state.hour + 1 } : state
                                })
                            }}>
                            +
                        </div>

                        {add_zero(data.hour)}

                        <div
                            className={`${styles.btn_minus} flex-center full-br`}
                            onMouseDown={() => {
                                setData(state => {
                                    return state.hour > 0 ? { ...state, hour: state.hour - 1 } : state
                                })
                            }}>
                            -
                        </div>

                    </div>
                    :
                    <div className={styles.num}>

                        <div
                            className={`${styles.btn_plus} flex-center full-br`}
                            onMouseDown={() => {
                                setData(state => {
                                    return state.min < 59 ? { ...state, min: state.min + 1 } : state
                                })
                            }}>
                            +
                        </div>

                        {add_zero(data.min)}

                        <div
                            className={`${styles.btn_minus} flex-center full-br`}
                            onMouseDown={() => {
                                setData(state => {
                                    return state.min > 0 ? { ...state, min: state.min - 1 } : state
                                })
                            }}>
                            -
                        </div>

                    </div>
                    :
                    <div className={styles.num}>

                        <div
                            className={`${styles.btn_plus} flex-center full-br`}
                            onMouseDown={() => {
                                setData(state => {
                                    return state.sec < 59 ? { ...state, sec: state.sec + 1 } : state
                                })
                            }}>
                            +
                        </div>

                        {add_zero(data.sec)}

                        <div
                            className={`${styles.btn_minus} flex-center full-br`}
                            onMouseDown={() => {
                                setData(state => {
                                    return state.sec > 0 ? { ...state, sec: state.sec - 1 } : state
                                })
                            }}>
                            -
                        </div>

                    </div>

                </div>

                <div className='flex-center lg-my lg-g'>

                    <div className='circle' onClick={start_pause}>
                        <img className={data.start ? 'hide' : ''} src="https://img.icons8.com/material-outlined/40/null/circled-play.png" />
                        <img className={data.start ? '' : 'hide'} src="https://img.icons8.com/material-outlined/40/null/circled-pause.png" />
                    </div>

                    <div className='circle' onClick={rest}>
                        <img src="https://img.icons8.com/material-outlined/40/null/restart--v1.png" />
                    </div>

                </div>

            </div>

        </div>

    )

    }