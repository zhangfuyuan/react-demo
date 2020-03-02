/**
 * 包含应用中所有请求接口的函数：接口请求函数
 */
import ajax from './ajax'

// const BASE = "http://192.168.1.155:8081" //"http://localhost:5000"
const BASE = ''

// 登陆接口
export const reqLogin = (username, password) => ajax.get(`${BASE}/user-info?username=${username}&password${password}`)

// 请求用户信息数据
export const reqUserInfo = () => ajax.get(`${BASE}/user-info`)

// 请求设备信息数据
export const reqEquipmentData = () => ajax(`${BASE}/equipment-info`)

// 请求服务信息数据
export const reqSeverMessages = () => ajax(`${BASE}/serverM-info`)

// 添加用户信息
export const reqAddUser = ({
    name,
    eMail,
    phone,
    username,
    password
}) => ajax.post(`${BASE}/user-info`, {
    name,
    eMail,
    phone,
    username,
    password
})

//添加设备信息
export const reqAddEquipment = ({
    id,
    name,
    outIp,
    inIp,
    port,
    config,
    org,
    person
}) => ajax.post(`${BASE}/equipment-info`, {
    id,
    name,
    outIp,
    inIp,
    port,
    config,
    org,
    person
})

// 添加服务信息
export const reqAddServerM = ({
    id,
    name,
    type,
    person,
    autoCall,
    autoRepair,
    detectionMethods,
    repairMethods,
    config
}) => ajax.post(`${BASE}/serverM-info`, {
    id,
    name,
    type,
    config,
    autoCall,
    person,
    autoRepair,
    detectionMethods,
    repairMethods
})

// 修改用户信息
export const reqUpdataUser = ({
    id,
    name,
    eMail,
    phone,
    username,
    password
}) => ajax.put(`${BASE}/user-info/${id}`, {
    name,
    eMail,
    phone,
    username,
    password
})

// 修改设备信息
export const reqUpdataEquipment = ({
    id,
    name,
    outIp,
    inIp,
    port,
    config,
    org,
    person
}) => ajax.put(`${BASE}/equipment-info/${id}`, {
    id,
    name,
    outIp,
    inIp,
    port,
    config,
    org,
    person
})

// 修改服务信息
export const reqUpdataServerM = ({
    id,
    name,
    type,
    config,
    autoCall,
    person,
    autoRepair,
    detectionMethods,
    repairMethods
}) => ajax.put(`${BASE}/serverM-info/${id}`, {
    id,
    name,
    type,
    config,
    autoCall,
    person,
    autoRepair,
    detectionMethods,
    repairMethods
})

// 删除用户信息记录
export const reqDeleteUser = deleteId => ajax.delete(`${BASE}/user-info/${deleteId}`)

// 删除设备
export const reqDeleteEquipment = deleteId => ajax.delete(`${BASE}/equipment-info/${deleteId}`)

// 删除服务
export const reqDeleteServerM = deleteId => ajax.delete(`${BASE}/serverM-info/${deleteId}`)

// 获取后台api接口
export const reqInfoFormApi = () => ajax(`/commServer/common/restart`)
