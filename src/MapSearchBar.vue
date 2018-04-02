<template>
    <input id="searchTextField"
           ref="autocomplete"
           type="text"
           size="50"
           placeholder="Enter a location"
           autocomplete="on"/>
</template>

<script>
  export default {
    mounted(){
      let options = {
        types: ['(cities)']
      };
      let input = this.$refs.autocomplete;
      let autocomplete = new google.maps.places.Autocomplete(input, options);
    }
  }
</script>
