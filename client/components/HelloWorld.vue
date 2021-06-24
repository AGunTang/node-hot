<template>
  <div class="table-content">
    <H1 class="h1">aWWsWW</H1>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: 'TableContent',
  components: {
  },
  data() {
    return {
      multipleSelection: [],
      form: {
        productId: '',
        versionType: 0,
        pubType: 0,
      },
    };
  },
  computed: {
  },
  created() {
  },
  methods: {
  },
};
</script>

<style lang='scss' scoped>
.table-content {
  .h1 {
    color: red;
  }
  .operation {

    i {
      margin-left: 18px;
    }
    &>:first-child {
      margin-left: 0px;
    }

  }
}
</style>
