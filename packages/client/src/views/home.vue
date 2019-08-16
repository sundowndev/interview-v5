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
        :value="new Date().toISOString().slice(0, 10)"
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

    <div v-for="room of rooms" v-bind:key="room.id">
      <p>
        {{ room.name }} - Capacity of {{ room.capacity }} people
        <br />
        <span v-for="eq of room.equipements" v-bind:key="eq.uid">
          <i>{{ eq.name }},</i>
        </span>
      </p>
      <button :click="selectRoom(room)">Select</button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      selectedRoom: null,
      rooms: [
        {
          id: '5d5442dd277dd25a5ed648ac',
          name: 'Salle #1',
          description: 'Salle #1',
          capacity: 5,
          equipements: [
            {
              uid: 'tv',
              name: 'TV',
            },
            {
              uid: 'retro',
              name: 'Retro Projecteur',
            },
          ],
          createdAt: '2016-12-07T12:39:29.812Z',
          updatedAt: '2016-12-08T17:31:39.489Z',
        },
        {
          id: '5d5442dd277dd25a5ed648ac',
          name: 'Salle #1',
          description: 'Salle #1',
          capacity: 5,
          equipements: [
            {
              uid: 'tv',
              name: 'TV',
            },
            {
              uid: 'retro',
              name: 'Retro Projecteur',
            },
          ],
          createdAt: '2016-12-07T12:39:29.812Z',
          updatedAt: '2016-12-08T17:31:39.489Z',
        },
        {
          id: '5d5442dd277dd25a5ed648ac',
          name: 'Salle #1',
          description: 'Salle #1',
          capacity: 5,
          equipements: [
            {
              uid: 'tv',
              name: 'TV',
            },
            {
              uid: 'retro',
              name: 'Retro Projecteur',
            },
          ],
          createdAt: '2016-12-07T12:39:29.812Z',
          updatedAt: '2016-12-08T17:31:39.489Z',
        },
      ],
    };
  },
  methods: {
    selectRoom(room: any) {
      this.selectedRoom = room;
    },
    // getRooms(equipements = null, capacity: number = 0) {
    //   const e = { equipements, capacity };
    // },
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
