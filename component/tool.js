import Tool_Note from '@/component/tool_note'
import Tool_Todo from '@/component/tool_todo'
import Tool_Timer from '@/component/tool_timer'
import Tool_Chrono from '@/component/tool_chrono'

export function Tool(_id, _frame_id, _data) {

    switch(_id) {
        // make tool id const @
        case 'note': return <Tool_Note id={_frame_id} data={_data}/>
        case 'todo': return <Tool_Todo id={_frame_id} data={_data}/>
        case 'timer': return <Tool_Timer id={_frame_id} data={_data}/>
        case 'chrono': return <Tool_Chrono id={_frame_id} data={_data}/>
        default: return null
    }

}