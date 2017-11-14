<template>
  <div class="hello">
    <h2>{{msg}}</h2>
    Date-picker
  </div>
</template>

<script>
  export default {
    name: 'date-picker',
    data () {
      return {
        minDate: new Date(2017, 9, 1),
        maxDate: new Date(2017, 10, 1),
        currentDate: new Date(2017, 9, 15)
      }
    }
  }
</script>
