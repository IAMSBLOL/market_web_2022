import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'

type Record<K extends keyof any, T> = {
    [P in K]: T;
};

// 神奇要放到服务端保存了，操作比较多，有点神奇

// 目前设定是：dataset_info、model_info没东西则判定为task_setting状态，都是没到训练那一步，在设置阶段
// export = TaskSlice_V1;
// export = TaskSlice_V1;
// export as namespace TaskSlice_V1;

declare namespace TaskSlice {

    // type Snapshot = ReturnType<SNAPSHOT_KEY_OF_ROUTER>

    interface DatasetTaskSetting {
        dataset_id?: string,
        dataset_version_id?: string,
    }

    interface Dataset_Info {
        dataset_id?: string,
        dataset_version_id?: string,
    }

    interface Dataset {
        // 这个是选数据集的时候的设置，没点下一步的话，存放选中的数据集，类似操作快照
        task_setting: DatasetTaskSetting,
        // 点了下一步就意味着选中了数据集，存放数据集ID和版本ID 查出来的数据里边是啥我也不知道啊，这个怎么存
        dataset_info: Dataset_Info,
    }

    interface Model_Args {
        fps: number | null | undefind,
        ddr: number | null | undefind,
        io: number | null | undefind,
    }

    interface ModelTaskSetting {
        model_args?: Model_Args,
        name?: string,
        gpu_count?: number,
        platform?: Array<string>,
        application?: 'endpoint' | 'cloud'
    }

    interface Model_Info {
        model_id?:string,
        model_iter_id?: string
    }

    interface Model {
        //  模型需要的配置，如果没开始训练的话、就存放这个操作快照
        task_setting: ModelTaskSetting,
        // 点了下一步就意味着开始训练，存模型的ID和iter ID  查出来的数据 这个东西也多，怎么存
        model_info: Model_Info,
    }
    // 里边存啥我也不知道，一般来讲ID+版本ID就够了
    interface taskListItem {
        // 数据的信息
        dataset: Dataset,
        // 训练的信息
        model: Model,
        // 部署的信息 预留
        deploy: Record<string, any>,
        // 任务信息、名字或者其他需要保存的
        // task: TaskInfo,
        // 换成 id\\ 这个任务的ID
        id: string,
        // 当前任务活跃到了哪个页面 超级多
        active_page: typeof SNAPSHOT_KEY_OF_ROUTER,
        // 是不是在任务栏上显示，搜索要加上这个过滤的，要么就是要分开表存的
        alive_in_task_abr?: boolean
        // 这个任务名
        task_name?:string
    }

    interface TaskState {
        taskList: Array<taskListItem>,

        activeTaskInfo: taskListItem,
    }
}
