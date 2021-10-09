(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{467:function(t,e,o){"use strict";o.r(e);var r=o(12),n=(o(42),o(51),o(50),o(77),{layout:"booking",data:function(){return{noOfDays:1,rooms:[],steps:[{target:"#roomSetup",content:"Please click here to<br />view our rooms.",params:{placement:"top"}}]}},computed:{roomOptions:function(){return this.$store.getters.roomsData},enoughRooms:function(){return this.$store.getters.confirmEnoughRooms}},methods:{addRoom:function(){this.rooms.push({booking_date:null,room_id:null})},removeRoom:function(i){1!=this.rooms.length&&this.rooms.splice(i,1)},gotoNext:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.enoughRooms){e.next=3;break}return t.$toast.error("You have not selected enough rooms to accommodate the number / type of guests in your booking request -\n                    please click <a target='_blank' class='mx-2 font-bold text-yellow-100' href='https://www.jarabeachresort.com/room-detail'>here</a> for room information."),e.abrupt("return");case 3:if(t.$store.commit("UPDATE_ROOMS",t.rooms),t.$store.commit("COMPLETE_AVAILABILITY"),!t.$store.state.editMode){e.next=9;break}return o=t.$store.state.editBooking,e.next=9,t.$store.dispatch("extras/loadOldExtras",o);case 9:t.$router.push({path:"/extras"});case 10:case"end":return e.stop()}}),e)})))()},gotoBack:function(){this.$store.commit("UPDATE_ROOMS",this.rooms),this.$router.push({path:"/guests"})},selectRooms:function(t){console.log("Availability page"),console.log(t),this.rooms=t.slice(0),console.log(this.rooms),this.$store.commit("UPDATE_ROOMS",t)},closeTour:function(){this.$tours.myTour.stop()}},mounted:function(){var t=this,e="viewTour";window.localStorage.getItem(e)||setTimeout((function(){t.$tours.myTour.start(),window.localStorage.setItem(e,!0)}),100),setTimeout((function(){t.$store.commit("TOGGLE_FULL_PAGE_LOADER",!1)}),2e3)},created:function(){console.log("STORE_ROOMS"),this.rooms=this.$store.state.rooms.slice(0),console.log(this.rooms)},middleware:function(t){var e=t.store,o=t.redirect;t.$toast;e.state.guests_done||o("/guests")}}),l=o(4),component=Object(l.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"pb-60"},[o("h1",{staticClass:"px-6 mb-6 text-xl font-bold text-center md:px-0 md:text-2xl"},[t._v("Select the dates you would like to stay")]),t._v(" "),o("div",{staticClass:"flex flex-col justify-center space-y-6 md:space-y-0 md:space-x-6 md:flex-row md:px-6"},[o("div",{staticClass:"w-full md:w-10/12"},[o("div",{staticClass:"pt-6 bg-white border-t border-b md:border md:rounded-lg md:shadow-lg"},[o("NewRoomCalendar",{staticClass:"w-full",attrs:{initialRooms:t.rooms},on:{selected:function(e){return t.selectRooms(e)},viewsetup:function(e){return t.closeTour()}}}),t._v(" "),t.rooms.length>0?o("div",{staticClass:"flex w-11/12 mx-auto mt-6 mb-6 space-x-2 md:space-x-6 md:w-9/12"},[o("MainButton",{attrs:{outline:""},on:{click:function(e){return t.gotoBack()}}},[t._v("Back")]),t._v(" "),o("MainButton",{on:{click:function(e){return t.gotoNext()}}},[t._v("Next")])],1):t._e()],1),t._v(" "),o("div",{staticClass:"flex items-center w-full my-6 space-x-2"},[o("StartOverButton",{staticClass:"w-full"})],1)]),t._v(" "),o("div",{staticClass:"flex-shrink-0 w-full px-6 md:px-0 md:w-3/12"},[o("ReservationBox",{attrs:{showDiscount:"",hideExtraGuests:""}})],1)]),t._v(" "),o("v-tour",{attrs:{name:"myTour",steps:t.steps},scopedSlots:t._u([{key:"default",fn:function(e){return[o("transition",{attrs:{name:"fade"}},[e.steps[e.currentStep]?o("v-step",{key:e.currentStep,attrs:{step:e.steps[e.currentStep],"previous-step":e.previousStep,"next-step":e.nextStep,stop:e.stop,skip:e.skip,"is-first":e.isFirst,"is-last":e.isLast,labels:e.labels}},[e.isLast?[o("div",{attrs:{slot:"actions"},slot:"actions"},[o("button",{staticClass:"px-3 py-1 border",on:{click:e.stop}},[t._v("Close")])])]:t._e()],2):t._e()],1)]}}])})],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{NewRoomCalendar:o(213).default,MainButton:o(31).default,StartOverButton:o(206).default,ReservationBox:o(207).default})}}]);