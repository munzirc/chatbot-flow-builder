import FlowCanvas from '../modules/flow-canvas/FlowCanvas'
import Sidebar from '../modules/sidebar/Sidebar'
import Header from '../modules/header/Header'
import { ReactFlowProvider } from '@xyflow/react'

const Builder = () => {
  return (
    <ReactFlowProvider>
    <Header />
    <div className='w-full min-h-[calc(100vh-52px)] relative flex'>
        <FlowCanvas />
        <Sidebar />
    </div>
    </ReactFlowProvider>
  )
}

export default Builder