<template>
    <div class="back-draw ol-unselectable ol-control">
      <button class="back-draw button">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M12,3A9,9 0 0,0 3,12H0L4,16L8,12H5A7,7 0 0,1 12,5A7,7 0 0,1 19,12A7,7 0 0,1 12,19C10.5,19 9.09,18.5 7.94,17.7L6.5,19.14C8.04,20.3 9.94,21 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3M14,12A2,2 0 0,0 12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12Z" /></svg>
      </button>
    </div>
 </template>
 <script>
 
 export default {
   name: "BackDrawControl",
   data() {
     return {
     }
   },
   mounted() {
   }
 }
 </script>
 <style>
      .back-draw { 
        top: 125px; 
        left: 1.7em;
      } 
      .ol-touch{
        
      }
 </style>