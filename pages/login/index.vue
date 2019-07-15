<template>
  <c-form-auth />
</template>

<script>
import CFormAuth from '@/components/molecules/CFormAuth'

export default {
  middleware: [
    'connected'
  ],

  components: {
    CFormAuth
  }
}
</script>
