<template>
  <v-form>
    <v-btn
      class="primary"
      icon
      @click="pickFile"
    >
      <v-icon>
        edit
      </v-icon>
    </v-btn>
    <input
      ref="image"
      type="file"
      style="display: none"
      accept="image/*"
      @change="onFilePicked"
    >
  </v-form>
</template>

<script>
export default {
  data: () => ({
    title: 'Image Upload',
    dialog: false,
    imageName: '',
    imageUrl: '',
    imageFile: ''
  }),

  methods: {
    pickFile() {
      this.$refs.image.click()
    },

    onFilePicked(e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.imageName = files[0].name
        if (this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.imageFile = files[0] // this is an image file that can be sent to server...
        })
      } else {
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
      }
    }
  }
}
</script>
