
import request, { ApiRes, requestWithProgress } from '../../request'
import { BaseContainerTypeItemProps } from "@/types/dynamic_onfiguration_platform/basic_manage/base_container_type";
import Mock from "mockjs";
//
const baseContainerTypeItems: BaseContainerTypeItemProps[] = [
    {
        "Code": "RT",
        "EnglishName": "Reefer Container",
        "ChineseName": "冷藏集装箱",
        "Remark": "适用于需要温度控制的货物，如生鲜食品、药品、花卉等。需配备制冷设备，保持恒定低温。"
    },
    {
        "Code": "GP",
        "EnglishName": "General Purpose",
        "ChineseName": "普通集装箱",
        "Remark": "通用集装箱，适用于大多数无特殊要求的货物，如电子产品、日用品、纺织品等。"
    },
    {
        "Code": "GOH",
        "EnglishName": "Garment On Hanger",
        "ChineseName": "挂衣箱",
        "Remark": "专为服装类货物设计，内部有挂架，适合悬挂运输，如成衣、服饰等。"
    },
    {
        "Code": "OT",
        "EnglishName": "Open top",
        "ChineseName": "开顶集装箱",
        "Remark": "顶部可开合，适合超高或超大件货物，如机械设备、钢材、风电叶片等。"
    },
    {
        "Code": "TK",
        "EnglishName": "Tank",
        "ChineseName": "罐式集装箱",
        "Remark": "用于运输液体或粉末状货物，如化学品、石油、乳制品、水泥等。"
    },
    {
        "Code": "NOR",
        "EnglishName": "Non-operating Reefer",
        "ChineseName": "非运营冷藏箱",
        "Remark": "无制冷设备的冷藏箱，仅用于临时存储或短途运输，需提前预冷并快速交付。"
    },
    {
        "Code": "FR",
        "EnglishName": "Flat Rack",
        "ChineseName": "平板集装箱",
        "Remark": "无顶无侧板，适合超宽、超重或超长货物，如大型机械、车辆、风力发电机部件等。"
    },
    {
        "Code": "HC",
        "EnglishName": "HIGH CUBE",
        "ChineseName": "高箱",
        "Remark": "高度比标准集装箱高（通常为9.5英尺），适合需要更多装载空间的货物，如大宗散货或体积较大的货物。"
    }
];


// 获取账单管理台账列表
export const getBaseContainerTypeList = async (): Promise<BaseContainerTypeItemProps[]> => {
    return baseContainerTypeItems;
}

// 保存账单管理
export const saveBaseContainerType = async (data: BaseContainerTypeItemProps, onUploadProgress?: (progress: number) => void): Promise<BaseContainerTypeItemProps> => {
    // 模拟上传进度
    if (onUploadProgress) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            onUploadProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 1000);
    }
    return data;
}


/*
// 获取币制信息
export const getBaseContainerTypeList = async (): Promise<BaseContainerTypeItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/base_container_type"
  })
  const responseData = response?.data as ApiRes<BaseContainerTypeItemProps[]>;
  return responseData.data || [];
}

export const saveBaseContainerType = (data:BaseContainerTypeItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/base_container_type/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
