import { EditOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@reducer/index'
import { Modal, Input, message } from 'antd'
import { ChangeEvent, useRef, useState } from 'react'
import { isNil } from 'lodash'
import { modifyTaskName } from '@reducer/tasksSilce'

import './TaskNameBar.module.less'

const TaskNameBar = (): JSX.Element => {
  const task_name = useSelector((state: RootState) => {
    return state.tasksSilce.activeTaskInfo.task_name
  })
  const reactKey = useSelector((state: RootState) => {
    return state.tasksSilce.activeTaskInfo.id
  })
  const dispatch = useDispatch()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const taskName = useRef<undefined|string|null>(undefined)

  const handleModifyTaskName = () => {
    setIsModalVisible(true)
  }
  const handleOk = async () => {
    if (isNil(taskName.current)) {
      message.warning('请输入任务名')
      return
    }
    setLoading(true)
    const loading = new Promise(function (resolve) {
      setTimeout(resolve, 1500)
    })
    const setTaskname = new Promise(function (resolve, reject) {
      //
      try {
        dispatch(modifyTaskName({ modelName: taskName.current, reactKey }))
        resolve(true)
      } catch (e) {
        reject(e)
      }
    })

    await Promise.allSettled([
      loading, setTaskname
    ])
    setLoading(false)
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOnchange = (v: ChangeEvent<HTMLInputElement>) => {
    taskName.current = v.target.value
  }
  return (
    <div styleName='TaskNameBar'>
      <div className='edit_icon_wrap' >
        <EditOutlined onClick={handleModifyTaskName} />
        <Modal destroyOnClose title="修改训练基础信息" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} getContainer={false} closable={false} confirmLoading={loading}>
          <p>名称</p>
          <Input maxLength={20} onChange={handleOnchange} defaultValue={task_name} />
          <p>最多20个字符</p>
        </Modal>
      </div>
      {task_name || '未命名'}

    </div>
  )
}

export default TaskNameBar
