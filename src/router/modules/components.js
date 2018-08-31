/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const componentsRouter = {
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
}

export default componentsRouter
