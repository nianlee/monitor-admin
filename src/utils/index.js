import api from "./api";
import config from "./config";
import request from "./request";

// 刷新数据
export const refreshData = (dispatch, useNamespace) => {
  window.GLOBAL_INTERVAL = setInterval(function() {
    if (useNamespace) {
      dispatch({ type: "dashboard/intervalData" });
    } else {
      dispatch({ type: "intervalData" });
    }
  }, 10 * 1000);
};

// 停止刷新数据
export const stopRefreshData = () => {
  clearInterval(window.GLOBAL_INTERVAL);
};

// 转换区域初始化格式
export const formatInitAreaData = areaList => {
  let areaData = [];
  if (areaList && areaList.length > 0) {
    const info = areaList[0];
    if (info && info.allCode) {
      areaData = info.allCode.split("_");
    }
  }
  return areaData;
};

// 将状态数字，改为中文表示
export const formatState = item => {
  if (item.state == "-1") {
    item.state = "故障";
  } else if (item.state == "0") {
    item.state = "离线";
  } else {
    item.state = "正常";
  }

  // 供电
  if (item.powerSupplyState == "1") {
    item.powerSupplyState = "正常";
  } else if (item.powerSupplyState == "-1") {
    item.powerSupplyState = "异常";
  } else if (item.powerSupplyState == "-2") {
    item.powerSupplyState = "--";
  } else {
    item.powerSupplyState = "--";
  }

  // 环境
  if (item.environmentState == "1") {
    item.environmentState = "风扇开";
  } else if (item.environmentState == "-2") {
    item.environmentState = "--";
  } else if (item.environmentState == "-1") {
    item.environmentState = "异常";
  } else {
    item.environmentState = "风扇关";
  }

  // 网络
  if (item.networkState == "-1") {
    item.networkState = "异常";
  } else if (item.networkState == "1") {
    item.networkState = "正常";
  } else {
    item.networkState = "--";
  }

  // 安防
  if (item.securityState == "-1") {
    item.securityState = "异常";
  } else if (item.securityState == "-2") {
    item.securityState = "--";
  } else if (item.securityState == "0") {
    item.securityState = "正常";
  } else {
    item.securityState = "异常";
  }

  // 防雷
  if (item.lightningProtectionState == "-1") {
    item.lightningProtectionState = "异常";
  } else if (item.lightningProtectionState == "-2") {
    item.lightningProtectionState = "--";
  } else if (item.lightningProtectionState == "0") {
    item.lightningProtectionState = "正常";
  } else {
    item.lightningProtectionState = "异常";
  }

  // 漏电
  if (item.leakageState == "0") {
    item.leakageState = "正常";
  } else if (item.leakageState == "1") {
    item.leakageState = "异常";
  } else if (item.leakageState == "-2") {
    item.leakageState = "异常";
  } else {
    item.leakageState = "异常";
  }


  return item;
};

// 动态属性，数字状态修改
export const formateDynamic = item => {
  if (item.attributeCode == "fanState") {
    if (item.attributeValue == "0") {
      item.attributeValue = "关";
    } else if (item.attributeValue == "1") {
      item.attributeValue = "开";
    } else {
      item.attributeValue = "异常";
    }
  }

  if (item.attributeCode == "DCCtrl6") {
    if (item.attributeValue == "0") {
      item.attributeValue = "关";
    } else if (item.attributeValue == "1") {
      item.attributeValue = "开";
    } else {
      item.attributeValue = "异常";
    }
  }

  if (item.attributeCode == "交流供电") {
    if (item.attributeValue == "0") {
      item.attributeValue = "正常";
    } else {
      item.attributeValue = "异常";
    }
  }

  if (item.attributeCode == "incline") {
    if (item.attributeValue == "0") {
      item.attributeValue = "正常";
    } else {
      item.attributeValue = "异常";
    }
  }

  if (item.attributeCode == "DI1") {
    if (item.attributeValue == "0") {
      item.attributeValue = "关";
    } else {
      item.attributeValue = "开";
    }
  }

  if (item.attributeCode == "DI2") {
    if (item.attributeValue == "0") {
      item.attributeValue = "正常";
    } else {
      item.attributeValue = "异常";
    }
  }


  if (item.attributeCode == "ACInput") {
    if (item.attributeValue == "0") {
      item.attributeValue = "正常";
    } else {
      item.attributeValue = "异常";
    }
  }


  // 漏电
  if (item.attributeCode == "leakageState") {
    if (item.attributeValue == "0") {
      item.attributeValue = "正常";
    } else {
      item.attributeValue = "异常";
    }
  }

  //控制变量
  if (item.attributeCode == "ACCtrl1") {
    if (item.attributeValue == "0") {
      item.attributeValue = "关";
    } else {
      item.attributeValue = "开";
    }
  }

  if (item.attributeCode == "ACCtrl2") {
    if (item.attributeValue == "0") {
      item.attributeValue = "关";
    } else {
      item.attributeValue = "开";
    }
  }
  if (item.attributeCode == "DCCtrl1") {
    if (item.attributeValue == "0") {
      item.attributeValue = "关";
    } else {
      item.attributeValue = "开";
    }
  }
  if (item.attributeCode == "DCCtrl2") {
    if (item.attributeValue == "0") {
      item.attributeValue = "关";
    } else {
      item.attributeValue = "开";
    }
  }
  if (item.attributeCode == "DCCtrl3") {
    if (item.attributeValue == "0") {
      item.attributeValue = "关";
    } else {
      item.attributeValue = "开";
    }
  }
  if (item.attributeCode == "DCCtrl4") {
    if (item.attributeValue == "0") {
      item.attributeValue = "关";
    } else {
      item.attributeValue = "开";
    }
  }
  if (item.attributeCode == "DCCtrl5") {
    if (item.attributeValue == "0") {
      item.attributeValue = "关";
    } else {
      item.attributeValue = "开";
    }
  }
  if (item.attributeCode == "DCCtrl6") {
    if (item.attributeValue == "0") {
      item.attributeValue = "关";
    } else {
      item.attributeValue = "开";
    }
  }

  return item;
};

/*
当网络异常的时候全部显示"--"
export const networkformatState = item => {
  if (item.state == "-1") {
    item.state = "故障";
  } else if (item.state == "0") {
    item.state = "离线";
  } else {
    item.state = "正常";
  }

  if (item.networkState == "-1") {
    item.networkState = "异常";
    item.powerSupplyState = "--";
    item.environmentState = "--";
    item.securityState = "--";
    item.lightningProtectionState = "--";
    item.leakageState = "--";
  }
  return item;
};
*/

// 初始区域所有数据
export const initAreaData = codes => {
  let areaList = [];

  let parentCodes = [0];

  return new Promise((resolve, reject) => {
    if (codes && codes.length > 0) {
      const removeLastItem = codes.slice(0, codes.length - 1);
      parentCodes = parentCodes.concat(removeLastItem);
      Promise.all(
        parentCodes.map(item =>
          request({
            url: api.queryAreaByParentCode,
            method: "POST",
            data: { parentCode: item }
          }),
        )
      )
        .then(res => {
          const formatedAreas = res.map(item => {

            if (item.success && item.data) {
              return item.data.map(area => ({
                ...area,
                label: area.name,
                value: area.code,
                key: area.code
              }));
            } else {
              return [];
            }
          });


          formatedAreas.forEach((area, index) => {
            console.log('index,area',index,area);
            const currentCode = parentCodes[index+1]; // 去掉code=0的 根code

            area.forEach(item => {
              console.log('item',item);
              if (item.code == currentCode) {
                item.children = formatedAreas[index+1];
              }
            });


            if (index == "0") {
              areaList = area;
            }

          });

          console.log('resolve(areaList)',areaList);

          resolve(areaList);

          console.log('areaList',areaList);
        })
        .catch(err => {
          reject(err);
        });
    } else {
      reject("codes 为空");
    }
  });
};

export { api, config, request };
