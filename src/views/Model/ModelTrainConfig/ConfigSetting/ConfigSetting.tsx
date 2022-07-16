import { Form, Radio, RadioChangeEvent, InputNumber, message } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import './ConfigSetting.module.less'
import ModelTrainConfigType from '../types';
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';

const CusInputNumber = (props: any) => {
  const { onChange, formInstance, maxFps, ...rest } = props
  const handleOnChange = (value: string) => {
    console.log('changed', value);
    // const {max} = props
    // if(value){}
    onChange(value)
    const video = Math.floor((maxFps / +value))
    formInstance.setFieldsValue({
      video
    })
  };
  const handleStep = (value: string, info: { offset: number, type: 'up' | 'down' }) => {
    console.log('changed', value);
    console.log('info', info);
    const { max, tips = '' } = props
    if (info?.type === 'up') {
      const _v = value
      if (_v >= max) {
        message.warning(tips)
      }
    }
  }
  return (
    <div>
      <InputNumber onStep={handleStep} onChange={handleOnChange} upHandler={<CaretUpOutlined />} downHandler={<CaretDownOutlined />} {...rest} />
    </div>
  )
}

const CusRadioGroup = (props: any) => {
  const {
    onChange, formInstance, minFps, maxFps, ...rest
  } = props

  const handleOnChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    const value = e.target.value
    console.log(minFps)
    onChange(value);
    if (value === 1) {
      const _fps = maxFps > 25 ? 25 : maxFps
      const video = Math.floor((maxFps / _fps))
      formInstance.setFieldsValue({
        fps: _fps, video
      })
    } else if (value === 2) {
      const _fps = maxFps > 5 ? 5 : maxFps
      const video = Math.floor((maxFps / _fps))
      formInstance.setFieldsValue({
        fps: _fps, video
      })
    } else {
      const _fps = maxFps > 5 ? 5 : maxFps
      const video = Math.floor((maxFps / _fps))
      formInstance.setFieldsValue({
        fps: 5, video
      })
    }
  };
  return (
    <Radio.Group onChange={handleOnChange} {...rest}>

      <Radio value={1}>速度优先</Radio>
      <Radio value={2}>精度优先</Radio>
      <Radio value={3}>自定义</Radio>

    </Radio.Group>
  )
}

const ConfigSetting = (props: ModelTrainConfigType.ConfigSetting): JSX.Element => {
  const { selected, formInstance } = props

  const [maxFps, setMaxFps] = useState(30)

  const userInfo = useSelector((state: any) => {
    return state.globalSlice.userInfo
  })
  const user_gpu = userInfo?.quota?.task_gpu_limited || 1

  useEffect(() => {
    if (!isEmpty(selected)) {
      console.log(selected)
      const _fpsmax = selected.fps_limited || 30
      setMaxFps(_fpsmax)
      formInstance.setFieldsValue({
        mode: 2,
        fps: 5,
        video: Math.floor(_fpsmax / 5)
      })
    }
  }, [selected, formInstance])

  const handleConfigFucking = (cValue:any, allVlaue:any) => {
    console.log(cValue, allVlaue)
  }
  return (
    <div styleName='ConfigSetting'>
      <div className='ConfigSetting_title'>
          模型配置
      </div>

      <div className='form_wrap'>
        <Form
          form={formInstance}
          name='basic'
          onValuesChange={handleConfigFucking}

        >
          <div className='form_cus_item'>
            <div className='label'>多卡训练</div>
            <Form.Item

              name='gpu_count'
              initialValue={1}
            >
              <CusInputNumber min={1} max={user_gpu} upHandler={<CaretUpOutlined />} downHandler={<CaretDownOutlined />} tips={`您当前的训练配额卡数是${user_gpu}个，想升级服务请联系客服。`} />
            </Form.Item>
          </div>

          <div className='form_cus_item'>
            <div className='dark_label'>参数配置：</div>
            <Form.Item

              name='mode'
              rules={[{ required: true }]}
              initialValue={2}
            >
              <CusRadioGroup formInstance={formInstance} minFps={1} maxFps={maxFps} />
            </Form.Item>
          </div>
          <Form.Item dependencies={['mode']} noStyle>
            {({ getFieldValue }) => {
              const type = getFieldValue('mode')
              console.log(type, 'typetype')
              // if (type !== 3) {
              //   return null
              // }
              return (
                <span style={{ display: type !== 3 ? 'none' : 'block' }} className='additional_from_items'>
                  <div className='form_cus_item'>
                    <div className='label'>单芯片部署路数</div>
                    <Form.Item

                      name='video'
                      initialValue={1}
                    >
                      <CusInputNumber disabled={true} />
                    </Form.Item>
                  </div>
                  <div className='form_cus_item'>
                    <div className='label'>帧率设置</div>
                    <Form.Item

                      name='fps'
                      initialValue={5}
                    >
                      <CusInputNumber formInstance={formInstance} min={1} maxFps={maxFps} max={30} upHandler={<CaretUpOutlined />} downHandler={<CaretDownOutlined />} tips={`当前加速器支持最大fps为${30}`} />
                    </Form.Item>
                  </div>
                </span>
              )
            }}
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default ConfigSetting