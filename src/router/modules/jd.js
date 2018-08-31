import Layout from '@/views/layout/Layout'

const jdRouter = {
  path: '/jd',
  component: Layout,
  redirect: '/jd/category',
  name: 'jd',
  meta: {
    title: '京好赚',
    icon: 'transaction'
  },
  children: [
    { path: 'category', component: () => import('@/views/jd/category'), name: 'jd/category', meta: { title: '栏目列表' }},
    { path: 'goods', component: () => import('@/views/jd/goods'), name: 'jd/goods', meta: { title: '商品列表' }},
    { path: 'swiper', component: () => import('@/views/jd/swiper'), name: 'jd/swiper', meta: { title: '幻灯片' }}
  ]
}

export default jdRouter
