import { APP_DATA_SET_INDEX } from '@router'

export type SNAPSHOT_KEY_OF_ROUTER_TYPE ={
  // 选择数据集页面
  select_dataset: string,
  // 选择如何
  select_create_dataset_type: string,
  // 选择模型类型
  select_model_type: string,
  // 填写基础信息和上传文件
  dataset_base_info_form: string,
  // 数据校验页面
  validate_dataset: string,
  // 选择第三方
  select_thirdparty_platform: string,
  // 选择第三方平台项目
  select_thirdparty_platform_project: string,
  // 选择第三方平台项目之后填写信息
  select_thirdparty_platform_dataset_base_info: string,
  // 数据详情
  dataset_detail: string,

  /**
   * 模型相关
   */
  // 模型配置表单类似吧
  set_train_config: string,
  // 模型详情
  model_detail: string,
}

export const SNAPSHOT_KEY_OF_ROUTER: SNAPSHOT_KEY_OF_ROUTER_TYPE = {

  /**
   * 数据集相关的页面
   */

  // 选择数据集页面
  select_dataset: APP_DATA_SET_INDEX,
  // 选择如何
  select_create_dataset_type: '',
  // 选择模型类型
  select_model_type: '',
  // 填写基础信息和上传文件
  dataset_base_info_form: '',
  // 数据校验页面
  validate_dataset: '',
  // 选择第三方
  select_thirdparty_platform: '',
  // 选择第三方平台项目
  select_thirdparty_platform_project: '',
  // 选择第三方平台项目之后填写信息
  select_thirdparty_platform_dataset_base_info: '',
  // 数据详情
  dataset_detail: '',

  /**
   * 模型相关
   */
  // 模型配置表单类似吧
  set_train_config: '',
  // 模型详情
  model_detail: '',
}
