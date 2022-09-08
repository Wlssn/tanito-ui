<template>
  <div id="app">
    tanito
    <hr />
    <div>
      <ss-button type="main" @click="clickEvent">main</ss-button>
      <ss-button type="success">success</ss-button>
      <ss-button type="danger">danger</ss-button>
      <ss-button type="plain">plain</ss-button>
      <ss-button>确认</ss-button>
      <pre>
        &lt;ss-button type="main" @click="clickEvent">main&lt;/ss-button>
        &lt;ss-button type="success">success&lt;/ss-button>
        &lt;ss-button type="danger">danger&lt;/ss-button>
        &lt;ss-button type="plain">plain&lt;/ss-button>
        &lt;ss-button>确认&lt;/ss-button>
      </pre>
      <hr />
      <ss-button type="main" @click="visible = true">open dialog</ss-button>
      <ss-dialog
        title="测试"
        :visible="visible"
        @beforeClose="visible = false"
      ></ss-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    clickEvent(e) {
      console.log(e)
    },
  },
}
</script>

<style></style>
