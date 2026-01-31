<script setup>
import { RegistrationConfig } from '@/config'
defineOptions({
  name: 'BaseAQ'
})
</script>

<template>
  <div class="registration">
    <a v-for="item in RegistrationConfig" :href="item.url" target="_blank" :key="item.value">{{
      item.label
    }}</a>
  </div>
</template>
<style lang="scss" scope>
.registration {
  display: flex;
  flex-direction: column;
  a {
    color: #8a919f;
  }
}
</style>
