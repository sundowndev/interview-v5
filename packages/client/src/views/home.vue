<template>
  <section class="section">
    <div class="text-center">
      <h1>Interview-v5</h1>
      <h3>Choose a room to book</h3>
    </div>

    <hr />

    <div>
      <label for="date">Date</label>
      <input
        type="date"
        name="date"
        id="date"
        :min="new Date().toISOString().slice(0, 10)"
        v-model="filters.startingAt"
      />
    </div>

    <div>
      <label for="startHour">Starting at :</label>
      <select name="startHour" id="startHour">
        <option value="1" selected>1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
      </select>

      <span>:</span>

      <select name="startMinutes" id="startMinutes">
        <option value="00" selected>00</option>
        <option value="15">15</option>
        <option value="30">30</option>
        <option value="45">45</option>
      </select>

      <select name="startHourState" id="startHourState">
        <option value="am">AM</option>
        <option value="pm" selected>PM</option>
      </select>
    </div>

    <div>
      <label for="endHour">Ending at :</label>
      <select name="endHour" id="endHour">
        <option value="1" selected>1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
      </select>

      <span>:</span>

      <select name="endMinutes" id="endMinutes">
        <option value="00" selected>00</option>
        <option value="15">15</option>
        <option value="30">30</option>
        <option value="45">45</option>
      </select>

      <select name="endHourState" id="endHourState">
        <option value="am">AM</option>
        <option value="pm" selected>PM</option>
      </select>
    </div>

    <div>
      <input type="checkbox" id="tv" name="tv" checked />
      <label for="tv">TV</label>
      <input type="checkbox" id="retro" name="retro" checked />
      <label for="retro">Retro Projecteur</label>
    </div>

    <hr />

    <RoomList :filters="filters" v-on:update:items="items = $event"></RoomList>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import RoomList from '../components/roomList.vue';

export default Vue.extend({
  components: { RoomList },
  data() {
    return {
      selectedRoom: null,
      filters: { startingAt: new Date(), capacity: 5, eq: ['tv', 'retro'] },
    };
  },
  methods: {},
});
</script>

<style>
</style>
