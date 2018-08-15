import { api, request } from 'utils'

// 角色列表查询
export function queryRoleList(data) {
  return request({
    data,
    method: 'get',
    url: api.queryRoleList,
  })
}

// 角色添加
export function addRole(data) {
  return request({
    data,
    method: 'post',
    url: api.addRole,
  })
}

export function deleteRole(data) {
  return request({
    data,
    method:'post',
    url:api.deleteRole,
  })
}

// 角色信息查询
export function queryRoleInfoById(data) {
  return request({
    data,
    method: 'post',
    url: api.queryRoleInfoById,
  })
}

// 角色信息更新
export function editRoleById(data) {
  return request({
    data,
    method: 'post',
    url: api.editRoleById,
  })
}

// 角色菜单查询
export function queryRoleMenuList(data) {
  return request({
    data,
    method: 'post',
    url: api.queryRoleMenuList,
  })
}

export function queryRoleListForDropdown(data) {
  return request({
    data,
    method:'post',
    url:api.queryRoleListForDropdown,
  })
}
