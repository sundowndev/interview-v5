<template>
  <section>
    <div v-for="room of items" v-bind:key="room.id">
      <p>
        {{ room.name }} - Capacity of {{ room.capacity }} people
        <br />
        <span v-for="eq of room.equipements" v-bind:key="eq.uid">
          <i>{{ eq.name }},</i>
        </span>
      </p>
      <button>Select</button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import { getApiUrl } from '../config';

export default Vue.extend({
  data() {
    return {};
  },
  props: { items: [], filters: {} },
  methods: {},
  computed: {},
  created() {
    axios
      .get(`${getApiUrl()}/rooms`)
      .then(response => {
        // handle success
        console.log(response.data.items);

        if (response.data.items) {
          this.$emit('update:items', response.data.items);
        }
      })
      .catch(error => {
        // handle error
        console.log(error);
      })
      .finally(() => {
        // always executed
      });
  },
});
</script>

<style>
p span {
  color: rgb(145, 145, 145);
}
i {
  font-style: italic;
}
</style>
