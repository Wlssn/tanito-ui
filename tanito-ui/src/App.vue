<template>
  <div id="app">
    tanito
    <hr>
    <div>
      <ss-button type="primary" disabled @click="clickEvent">鹿乃kano</ss-button>
      <ss-button type="success" >鹿乃kano</ss-button>
      <ss-button type="danger" >确认</ss-button>
      <ss-button  >鹿乃kano</ss-button>
      <hr>
    </div>
    <div>
      <ss-button type="primary" round disabled @click="clickEvent">鹿乃kano</ss-button>
      <ss-button type="success" round >鹿乃kano</ss-button>
      <ss-button type="danger" round >确认</ss-button>
      <ss-button  round >鹿乃kano</ss-button>
      <hr>
    </div>

  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  methods: {
    clickEvent (e) {
      console.log(e)
    }
  }
}
</script>

<style>

</style>
