(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{461:function(t,e,l){"use strict";l.r(e);var o={layout:"booking",data:function(){return{special:"lookout"}},computed:{selected:function(){return this.$store.getters["extras/allSelected"]}},methods:{removeExtra:function(){console.log(this.special),this.$store.commit("extras/REMOVE_EXTRA",this.special)}},mounted:function(){var t=this.$route.params.special;t&&(this.special=t)},middleware:function(t){var e=t.store,l=t.redirect;t.$toast;e.state.availability_done||l("/availability")}},r=l(1),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"px-6"},[l("h1",{staticClass:"mb-6 text-xl font-bold text-center md:text-2xl"},[t._v("Select an Extra experience to make your stay even more memorable!")]),t._v(" "),l("div",{staticClass:"flex flex-col justify-center space-y-6 md:space-y-0 md:space-x-3 md:flex-row"},[l("div",{staticClass:"w-full md:w-9/12"},[l("div",{staticClass:"overflow-hidden bg-white border rounded-lg shadow-lg"},[l("ExtrasLayout",{attrs:{currentSpecial:t.special}})],1)]),t._v(" "),l("div",{staticClass:"flex-shrink-0 w-full md:w-3/12"},[l("ReservationBox",{attrs:{showDiscount:""}})],1)])])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{ExtrasLayout:l(194).default,ReservationBox:l(189).default})}}]);