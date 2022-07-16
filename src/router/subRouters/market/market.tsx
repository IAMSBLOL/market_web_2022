
import {
  APP_GUIDE_PAGE,
  APP_DATA_SET_INDEX,
  APP_MODEL_INDEX,
  APP_DATASET_DETAIL,
  APP_DATASET_CREATE_TYPE,

  APP_DATASET_ANALYSE,
  APP_MODEL_TRAIN_CONFIG,
  APP_MODEL_TRAIN_DETAIL,
  APP_SELECT_DEPLOY_TYPE
} from '../../pathNames'
import { lazy } from 'react'
import { SuspenseFn } from '../../utils'
import localfile from '../localfile';
import thirdparty from '../thirdparty';

const NotFound = lazy(() => import('@src/views/NotFound'));
const App = lazy(() => import('@src/views/container/app'));
const AutoMLLayout = lazy(() => import('@src/views/container/AutoMLLayout'));
const TaskStepLayout = lazy(() => import('@src/views/container/TaskStepLayout'));
const GuideHome = lazy(() => import('@src/views/GuideHome'));
const DataSetIndex = lazy(() => import('@src/views/DataSet/DataSetIndex'));
const DataSetDetail = lazy(() => import('@src/views/DataSet/DataSetDetail'));
const ModelIndex = lazy(() => import('@src/views/Model/ModelIndex'));
const SelectCreateType = lazy(() => import('@src/views/DataSet/CreateDataSet/SelectCreateType'));
const DatasetAnalysis = lazy(() => import('@src/views/DataSet/DatasetAnalysis'));
const ModelTrainConfig = lazy(() => import('@src/views/Model/ModelTrainConfig'));
const ModelDetail = lazy(() => import('@src/views/Model/ModelDetail'));

const SelectDeployType = lazy(() => import('@src/views/Deployment/SelectDeployType'));

export default {
  path: '/app',
  strict: true,
  element: SuspenseFn(App),
  children: [
    // 仅有头部任务的
    {

      element: SuspenseFn(AutoMLLayout),
      children: [
        {
          path: APP_GUIDE_PAGE,
          element: SuspenseFn(GuideHome),

        },
        {
          path: APP_DATASET_CREATE_TYPE,
          element: SuspenseFn(SelectCreateType),

        },
        // 本地文件上传

        localfile,

        // 第三方
        thirdparty,

        // 有步骤条的
        {
          path: '/app/',
          strict: true,
          element: SuspenseFn(TaskStepLayout),
          children: [
            {
              path: APP_MODEL_INDEX,
              element: SuspenseFn(ModelIndex),

            },
            {
              path: APP_DATA_SET_INDEX,
              element: SuspenseFn(DataSetIndex),

            },
            {
              path: APP_DATASET_DETAIL,
              element: SuspenseFn(DataSetDetail),

            },
            {
              path: APP_DATASET_ANALYSE,
              element: SuspenseFn(DatasetAnalysis),

            },
            {
              path: APP_MODEL_TRAIN_CONFIG,
              element: SuspenseFn(ModelTrainConfig),

            },
            {
              path: APP_MODEL_TRAIN_DETAIL,
              element: SuspenseFn(ModelDetail),

            },

            {
              path: APP_SELECT_DEPLOY_TYPE,
              element: SuspenseFn(SelectDeployType),

            },

            {
              path: '*',
              element: SuspenseFn(NotFound),
            },
          ]
        },
        {
          path: '*',
          element: SuspenseFn(NotFound),
        },
      ]
    },

  ]
}
