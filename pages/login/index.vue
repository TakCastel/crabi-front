<template>
  <g-auth-form />
</template>

<script>
import GAuthForm from '@/components/GAuthForm'

export default {
  middleware: [
    'connected'
  ],

  components: {
    GAuthForm
  }
}
</script>
