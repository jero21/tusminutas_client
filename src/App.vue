<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    document.getElementById('loader').style.display = 'none'
    document.getElementById('vue_app').style.display = 'block'
  }
}
</script>
