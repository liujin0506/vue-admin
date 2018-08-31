import Layout from '@/views/layout/Layout'

const cmsRouter = {
  path: '/cms',
  component: Layout,
  redirect: '/cms/content/list',
  name: 'cms',
  meta: {
    title: '内容管理',
    icon: 'example'
  },
  children: [
    { path: 'content/create', component: () => import('@/views/cms/content/create'), name: 'createContent', meta: { title: '新增文章', icon: '' }, hidden: true },
    { path: 'content/edit/:id(\\d+)', component: () => import('@/views/cms/content/edit'), name: 'editContent', meta: { title: '编辑文章', noCache: true }, hidden: true },
    { path: 'content/list', component: () => import('@/views/cms/content/list'), name: 'contentList', meta: { title: '文章列表', icon: '' }},
    { path: 'category/list', component: () => import('@/views/cms/content/list'), name: 'categoryList', meta: { title: '栏目列表', icon: '' }}
  ]
}

export default cmsRouter
