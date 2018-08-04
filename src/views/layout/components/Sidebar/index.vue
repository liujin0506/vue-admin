<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <div class="web_logo">
        <a href="/">
            <img :src="homeLogo" alt="">
            <p>{{$t('main.system')}}</p>
        </a>
    </div>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in permission_routers" :key="route.name" :item="route" :base-path="route.path"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import homeLogo from '@/assets/home_logo.png'

export default {
  components: { SidebarItem },
  data() {
    return {
      homeLogo: homeLogo
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style lang="scss">
  .app-wrapper.hideSidebar{
    .web_logo a { padding: 20px 5px;}
    .web_logo p { opacity: 0;}
  }
</style>
<style lang="scss" scoped>
  .web_logo {
    background: #304156;
    a { color: #FFFFFF; font-size: 14px; display: flex !important; flex-direction: row; justify-content: space-between; padding: 20px; align-items: center; height: 64px; overflow: hidden; width: 0; font-weight: bolder;}
    img { width: 24px; height: 24px;}
    p { margin: 0; line-height: normal; text-overflow: ellipsis; overflow: hidden; word-break: keep-all; opacity: 1; transition: opacity 0.1s; margin-left: 12px; text-align: left; flex: 1;}
  }
</style>