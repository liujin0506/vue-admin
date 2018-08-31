import Layout from '@/views/layout/Layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: '/system/aca',
  name: 'system',
  meta: {
    title: '系统配置',
    icon: 'setting'
  },
  children: [
    { path: 'aca', component: () => import('@/views/system/aca'), name: 'system/aca', meta: { title: '权限列表' }},
    { path: 'role', component: () => import('@/views/system/role'), name: 'system/role', meta: { title: '角色列表' }},
    { path: 'user', component: () => import('@/views/system/user'), name: 'system/user', meta: { title: '管理员列表' }}
  ]
}

export default systemRouter
