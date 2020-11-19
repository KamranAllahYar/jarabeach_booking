<template>
  <div class="h-screen m-10">
        <div class="flex h-screen w-100">
            <div class="w-1/6 text-center ">
                <SideBar/>
            </div>
            <div class="w-5/6 p-20 border">
              <div class="text-2xl font-medium">What type of group will this be?</div>
              <div class="uppercase">
                    <div class="mt-5">
                        <input type="radio"  name="group" class="mr-5"><span class="mr-2">Individual</span>
                        <input type="radio"  name="group" class="mr-5"><span class="mr-2">Couple</span>
                        <input type="radio"  name="group" class="mr-5"><span class="mr-2">Family</span>
                        <input type="radio"  name="group" class="mr-5"><span class="mr-2">Groups</span>
                    </div>   
              </div>
              <div class="w-full mt-24">
                <div>3 Adults</div>

                <div class="w-1/2 my-5">
                  <div class="flex">
                    <div class="w-2/6">1 Child</div>
                    <div class="w-3/6">Please specify their age</div>
                    <select name="" id="" class="w-1/6">
                      <option value="12">12</option>
                      <option value="11">11</option>
                      <option value="10">10</option>
                      <option value="9">9</option>
                      <option value="8">8</option>
                    </select>
                  </div>
                </div>

                <div class="w-1/2 my-5">
                  <div class="flex justify-between">
                    <div class="w-2/6">1 Toddler/Infant</div>
                    <div class="w-3/6">Please specify their age</div>
                    <select name="" id="" class="w-1/6">
                      <option value="12">12</option>
                      <option value="11">11</option>
                      <option value="10">10</option>
                      <option value="9">9</option>
                      <option value="8">8</option>
                    </select>
                  </div>
                </div>

                <div class="w-1/2 my-5">
                  <div class="flex justify-between">
                    <div class="w-2/6">1 Infant</div>
                    <div class="w-3/6">Please specify their age</div>
                    <select name="" id="" class="w-1/6">
                      <option value="12">12</option>
                      <option value="11">11</option>
                      <option value="10">10</option>
                      <option value="9">9</option>
                      <option value="8">8</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>