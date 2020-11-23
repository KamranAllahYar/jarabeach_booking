<template>
  <div class="h-screen m-10">
        <div class="flex h-screen w-100">
            <div class="w-1/6 text-center">
                <SideBar/>
            </div>
            <div class="w-5/6 p-16 border">
                <div class="py-10 text-3xl font-bold text-center"> Rooms Setup</div>
                <div class="flex items-center">
                    <label for="days" class="w-2/6">How many days are you booking for</label>
                    <select name="days" id="days" v-model="noOfDays" class="text-sm">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div class="my-10 font-medium">Select room type available for specific date</div>
                <div class="flex items-center w-3/4 p-3 space-x-10 bg-gray-100" v-for="(room, index) in rooms" :key="index">
                    <div class="flex items-center w-1/2 space-x-5">
                        <label for="date" class="">Dates:</label>
                        <input type="date"  id="date" v-model="rooms.date">
                    </div>
                    <div class="flex items-center w-1/2 space-x-5">
                        <label for="type" class="">Room-type Available:</label>
                        <select name="type" id="type" v-model="rooms.type"  class="text-sm">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                    </div>
                    <div class="rounded hover:bg-white" @click="removeRoom(index)">
                        <svg 
                            class="w-6 h-6" fill="none" 
                            stroke="currentColor" viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                        </svg>
                    </div>
                    
                </div>
                <div class="flex items-center justify-end w-3/4 py-2 space-x-3" >
                    <div class="bg-gray-100 rounded" @click="addRoom">  
                        <svg 
                            class="w-6 h-6 cursor-pointer hover:text-gray-600" 
                            fill="none" stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                    </div>
                    
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
        noOfDays: 1,
        rooms: [
            {
                date: null,
                type: 1,
            }
        ]
    }
  },
  methods: {
    addRoom() {
        this.rooms.push({
            date: '',
            type: '',
        });
        console.log('pushed ');
        console.log(this.rooms);
        
    },
    removeRoom(i) {
            this.rooms.splice(i, 1);
        },
  }
}
</script>

<style>

</style>
