import Layout from '../views/layout/Layout'

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  }
]

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/

export const asyncRouterMap = [

  {
    path: '/components',
    component: Layout,
    redirect: 'noredirect',
    name: 'component-demo',
    meta: {
      title: 'components',
      icon: 'component'
    },
    children: [
      { path: 'icon-index', component: () => import('@/views/demos/svg-icons/index'), name: 'icons', meta: { title: 'icons', noCache: true }},
      { path: 'tinymce', component: () => import('@/views/demos/components-demo/tinymce'), name: 'tinymce-demo', meta: { title: 'tinymce' }},
      { path: 'markdown', component: () => import('@/views/demos/components-demo/markdown'), name: 'markdown-demo', meta: { title: 'markdown' }},
      { path: 'json-editor', component: () => import('@/views/demos/components-demo/jsonEditor'), name: 'jsonEditor-demo', meta: { title: 'jsonEditor' }},
      { path: 'splitpane', component: () => import('@/views/demos/components-demo/splitpane'), name: 'splitpane-demo', meta: { title: 'splitPane' }},
      { path: 'avatar-upload', component: () => import('@/views/demos/components-demo/avatarUpload'), name: 'avatarUpload-demo', meta: { title: 'avatarUpload' }},
      { path: 'dropzone', component: () => import('@/views/demos/components-demo/dropzone'), name: 'dropzone-demo', meta: { title: 'dropzone' }},
      { path: 'sticky', component: () => import('@/views/demos/components-demo/sticky'), name: 'sticky-demo', meta: { title: 'sticky' }},
      { path: 'count-to', component: () => import('@/views/demos/components-demo/countTo'), name: 'countTo-demo', meta: { title: 'countTo' }},
      { path: 'mixin', component: () => import('@/views/demos/components-demo/mixin'), name: 'componentMixin-demo', meta: { title: 'componentMixin' }},
      { path: 'back-to-top', component: () => import('@/views/demos/components-demo/backToTop'), name: 'backToTop-demo', meta: { title: 'backToTop' }},
      { path: 'drag-dialog', component: () => import('@/views/demos/components-demo/dragDialog'), name: 'dragDialog-demo', meta: { title: 'dragDialog' }},
      { path: 'dnd-list', component: () => import('@/views/demos/components-demo/dndList'), name: 'dndList-demo', meta: { title: 'dndList' }},
      { path: 'drag-kanban', component: () => import('@/views/demos/components-demo/dragKanban'), name: 'dragKanban-demo', meta: { title: 'dragKanban' }},
      { path: 'clipboard-index', component: () => import('@/views/demos/clipboard/index'), name: 'clipboardDemo', meta: { title: 'clipboardDemo' }},
      { path: 'i18n-index', component: () => import('@/views/demos/i18n-demo/index'), name: 'i18n', meta: { title: 'i18n' }},
      { path: 'theme-index', component: () => import('@/views/demos/theme/index'), name: 'theme', meta: { title: 'theme' }},
      { path: 'zip-download', component: () => import('@/views/demos/zip/index'), name: 'exportZip', meta: { title: 'exportZip' }},
      { path: 'exportExcel', component: () => import('@/views/demos/excel/exportExcel'), name: 'exportExcel', meta: { title: 'exportExcel' }},
      { path: 'selectExcel', component: () => import('@/views/demos/excel/selectExcel'), name: 'selectExcel', meta: { title: 'selectExcel' }},
      { path: 'uploadExcel', component: () => import('@/views/demos/excel/uploadExcel'), name: 'uploadExcel', meta: { title: 'uploadExcel' }}
    ]
  },

  {
    path: '/charts',
    component: Layout,
    redirect: 'noredirect',
    name: 'charts',
    meta: {
      title: 'charts',
      icon: 'chart'
    },
    children: [
      { path: 'keyboard', component: () => import('@/views/charts/keyboard'), name: 'keyboardChart', meta: { title: 'keyboardChart', noCache: true }},
      { path: 'line', component: () => import('@/views/charts/line'), name: 'lineChart', meta: { title: 'lineChart', noCache: true }},
      { path: 'mixchart', component: () => import('@/views/charts/mixChart'), name: 'mixChart', meta: { title: 'mixChart', noCache: true }}
    ]
  },

  {
    path: '/tab',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/tab/index'),
      name: 'tab',
      meta: { title: 'tab', icon: 'tab' }
    }]
  },

  {
    path: '/cms',
    component: Layout,
    redirect: '/cms/content/list',
    name: 'cms',
    meta: {
      title: 'cms',
      icon: 'example'
    },
    children: [
      { path: 'content/create', component: () => import('@/views/cms/content/create'), name: 'createContent', meta: { title: 'createContent', icon: '' }, hidden: true },
      { path: 'content/edit/:id(\\d+)', component: () => import('@/views/cms/content/edit'), name: 'editContent', meta: { title: 'editContent', noCache: true }, hidden: true },
      { path: 'content/list', component: () => import('@/views/cms/content/list'), name: 'contentList', meta: { title: 'contentList', icon: '' }},
      { path: 'category/list', component: () => import('@/views/cms/content/list'), name: 'categoryList', meta: { title: 'categoryList', icon: '' }}
    ]
  },

  {
    path: '/system',
    component: Layout,
    redirect: '/system/aca',
    name: 'system',
    meta: {
      title: 'system_config',
      icon: 'excel'
    },
    children: [
      { path: 'aca', component: () => import('@/views/system/aca'), name: 'system/aca', meta: { title: 'aca_list' }},
      { path: 'role', component: () => import('@/views/system/role'), name: 'system/role', meta: { title: 'role_list' }},
      { path: 'user', component: () => import('@/views/system/user'), name: 'system/user', meta: { title: 'user_list' }}
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

