<template>
  <div>
    <input id="searchTextField"
           v-model="location"
              ref="autocomplete"
              type="text"
              size="50"
              placeholder="Enter a location"
              autocomplete="on"/>
    <button v-on:click="">New</button>
  </div>
</template>



<script>
  export default {
    data(){
      return{
        location: ""
      }
    },
    mounted() {
      let options = {
        types: ['(cities)']
      };
      let input = this.$refs.autocomplete;
      let autocomplete = new google.maps.places.Autocomplete(input, options);
    }
  }
</script>
