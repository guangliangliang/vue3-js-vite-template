export const roleOptions = [
  {
    id: 1,
    name: '超级管理员',
    description: '拥有所有权限'
  },
  {
    id: 2,
    name: '系统管理员',
    description: '可以管理系统设置和用户'
  },
  {
    id: 3,
    name: '运营人员',
    description: '可以查看数据和处理日常事务'
  },
  {
    id: 4,
    name: '内容编辑',
    description: '负责管理和发布内容'
  },
  {
    id: 5,
    name: '游客',
    description: '只读权限，无法进行任何操作'
  }
].map((item) => {
  const { id: key, name: value } = item
  return { key, value }
})
