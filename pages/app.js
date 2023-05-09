import { useEffect, useState } from 'react'
import { Context } from '@/component/context'
import { LocalLoadData } from '@/utils/local_data'
import Workspace from '@/component/workspace'
import Navigator from '@/component/navigator'
import Wsm from '@/component/m_workspace'

export default function App() {

  const [workspace, setWorkspace] = useState([])

  useEffect( () => setWorkspace(LocalLoadData()), [])

  return (

    <Context.Provider value={[workspace, setWorkspace]}>
      
      <Wsm/>
      <Navigator/>
      <Workspace/>

    </Context.Provider>

  )

}