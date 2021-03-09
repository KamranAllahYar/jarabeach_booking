(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{324:function(t,e,r){"use strict";r.r(e);var o={props:{outline:{type:Boolean,default:!1},loading:{type:Boolean,default:!1}},computed:{buttonDesign:function(){return this.outline?"bg-transparent text-brand-blue-400 hover:text-brand-blue-500":"bg-brand-blue-400 hover:bg-brand-blue-500 text-white"}}},n=r(17),component=Object(n.a)(o,(function(){var t=this.$createElement,e=this._self._c||t;return e("button",this._g({staticClass:"w-full px-4 py-2 font-bold border rounded-lg focus:ring-2 ring-offset-1 ring-brand-blue-400 border-brand-blue-400 hover:border-brand-blue-500 focus:outline-none",class:this.buttonDesign},this.$listeners),[this.loading?e("div",{staticClass:"py-1 text-center"},[e("Loading",{staticClass:"mx-auto",attrs:{color:this.outline?"":"text-white"}})],1):this._t("default")],2)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Loading:r(325).default})},325:function(t,e,r){"use strict";r.r(e);var o={props:{size:{default:5},color:{default:"text-brand-blue"}}},n=r(17),component=Object(n.a)(o,(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{staticClass:"animate-spin",class:"w-"+this.size+" h-"+this.size+" "+this.color,attrs:{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"}},[e("circle",{staticClass:"opacity-25",attrs:{cx:"12",cy:"12",r:"10",stroke:"currentColor","stroke-width":"4"}}),this._v(" "),e("path",{staticClass:"opacity-75",attrs:{fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"}})])}),[],!1,null,null,null);e.default=component.exports},326:function(t,e,r){"use strict";r.r(e);r(15),r(68),r(43),r(92);var o=r(64),n=r(48),c={props:{showGuests:{type:Boolean,default:!0},showDiscount:{type:Boolean,default:!1}},computed:{editBooking:function(){return this.$store.state.editBooking},differenceToPay:function(){return this.$store.getters.differenceToPay},specials:function(){return this.$store.getters["extras/allSelected"]},childNo:function(){return this.$store.state.child_no},adultNo:function(){return this.$store.state.adult_no},rooms:function(){return this.$store.getters.bookedRooms},roomDiscountPercent:function(){return this.$store.getters.roomDiscountPercent},roomDiscount:function(){return this.$store.getters.roomDiscount},subTotal:function(){return this.$store.getters.subTotal},discount:function(){return this.$store.getters.discount},totalPrice:function(){return this.$store.getters.totalPrice}},methods:{formatDate:function(t){return Object(o.a)(Object(n.a)(t),"do MMM  Y")},currency:function(t){return"₦"+t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}}},l=r(17),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"flex flex-col space-y-6"},[t.showGuests?r("div",{staticClass:"w-full text-gray-800 border rounded-md border-brand-blue-300 bg-brand-blue-100"},[r("div",{staticClass:"px-3 py-3 text-xl font-bold border-b border-brand-blue-300"},[t._v("Your Reservation")]),t._v(" "),r("div",{staticClass:"flex justify-between px-3 my-3"},[r("div",[t._v("Guests")]),t._v(" "),r("div",[t._v("\n                "+t._s(t.adultNo)+" Adult"),t.adultNo>1?r("span",[t._v("s")]):t._e()])]),t._v(" "),t.childNo>0?r("div",{staticClass:"flex justify-between px-3 my-3"},[r("div",[t._v("Children")]),t._v(" "),r("div",[t._v(t._s(t.childNo)+" Child"),t.childNo>1?r("span",[t._v("ren")]):t._e()])]):t._e(),t._v(" "),t.rooms.length>0?r("div",{staticClass:"flex justify-between px-3 my-3"},[r("div",[t._v("\n                Room"),t.rooms.length>1?r("span",[t._v("s")]):t._e(),t._v(" "),r("br"),t._v(" "),t.roomDiscountPercent>0?r("div",{staticClass:"text-xs text-gray-700"},[t._v("\n                    "+t._s(t.roomDiscountPercent)+"% Discount\n                ")]):t._e()]),t._v(" "),r("div",t._l(t.rooms,(function(e,o){return r("div",{key:o,staticClass:"mb-1 text-right"},[r("div",[t._v(t._s(t.formatDate(e.date)))]),t._v(" "),r("div",{staticClass:"text-xs text-gray-600"},[t._v(t._s(e.name))])])})),0)]):t._e(),t._v(" "),t._l(t.specials,(function(e){return r("div",{key:e.id,staticClass:"flex items-center justify-between px-3 my-3"},[r("div",[t._v(t._s(e.name))]),t._v(" "),r("div",["cake"==e.type?r("span",[t._v("\n                    "+t._s(t.currency(t.$store.getters["extras/cakePrice"]))+"\n                ")]):"drinks"==e.type?r("span",[t._v("\n                    "+t._s(t.currency(t.$store.getters["extras/drinksPrice"]))+"\n                ")]):"photoshoot"==e.type?r("span",[t._v("\n                    "+t._s(t.currency(t.$store.getters["extras/photoshootPrice"]))+"\n                ")]):"roomDecoration"==e.type?r("span",[t._v("\n                    "+t._s(t.currency(t.$store.getters["extras/decorationPrice"]))+"\n                ")]):"domesticStaff"==e.type?r("span",[t._v("\n                    "+t._s(t.currency(t.$store.getters["extras/staffPrice"]))+"\n                ")]):"massage"==e.type?r("span",[t._v("\n                    "+t._s(t.currency(t.$store.getters["extras/massagePrice"]))+"\n                ")]):"quadbike"==e.type?r("span",[t._v("\n                    "+t._s(t.currency(t.$store.getters["extras/quadbikePrice"]))+"\n                ")]):"lookout"==e.type?r("span",[t._v("\n                    "+t._s(t.currency(t.$store.getters["extras/lookoutPrice"]))+"\n                ")]):r("span",[t._v("\n                    "+t._s(t.currency(0))+"\n                ")])])])}))],2):t._e(),t._v(" "),t.showDiscount&&(t.discount>0||t.roomDiscountPercent>0)?r("div",{staticClass:"w-full text-gray-800 border rounded-md border-brand-blue-300 bg-brand-blue-100"},[r("div",{staticClass:"flex justify-between px-3 my-3"},[r("div",[t._v("Sub-total")]),t._v(" "),r("div",{staticClass:"font-bold"},[t._v(t._s(t.currency(t.subTotal)))])]),t._v(" "),t.roomDiscountPercent>0?r("div",{staticClass:"flex justify-between px-3 my-3"},[r("div",[t._v(t._s(t.roomDiscountPercent)+"% Room Discount")]),t._v(" "),r("div",{staticClass:"font-bold"},[t._v(" - "+t._s(t.currency(t.roomDiscount)))])]):t._e(),t._v(" "),t.discount>0?r("div",{staticClass:"flex justify-between px-3 my-3"},[r("div",[t._v("Discount")]),t._v(" "),r("div",{staticClass:"font-bold"},[t._v(" - "+t._s(t.currency(t.discount)))])]):t._e()]):t._e(),t._v(" "),r("div",{staticClass:"flex justify-between w-full px-3 py-3 border rounded-md border-brand-blue-300 bg-brand-blue-100"},[r("div",{staticClass:"text-xl"},[t._v("Total")]),t._v(" "),r("div",{staticClass:"text-xl font-bold"},[t._v(t._s(t.currency(t.totalPrice)))])]),t._v(" "),t.$store.state.editMode?r("div",{staticClass:"w-full px-3 py-3 border rounded-md border-brand-blue-300 bg-brand-blue-100"},[r("div",{staticClass:"flex justify-between"},[r("div",{staticClass:"text-xl"},[t._v("Difference to Pay")]),t._v(" "),r("div",{staticClass:"text-xl font-bold"},[t._v(t._s(t.currency(t.differenceToPay)))])]),t._v(" "),r("div",{staticClass:"flex justify-between text-xs"},[r("div",[t._v("Previous Cost")]),t._v(" "),r("div",{staticClass:"font-bold"},[t._v(t._s(t.currency(t.editBooking.payment.total)))])])]):t._e()])}),[],!1,null,null,null);e.default=component.exports},329:function(t,e,r){var content=r(349);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(53).default)("3b5ad934",content,!0,{sourceMap:!1})},348:function(t,e,r){"use strict";r(329)},349:function(t,e,r){(e=r(52)(!1)).push([t.i,'pre{font-family:"Maison Neue","Source Sans Pro",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word}',""]),t.exports=e},381:function(t,e,r){"use strict";r.r(e);var o={layout:"booking",data:function(){return{currentPolicyId:0,agreed:!1,acceptedPolicies:[]}},computed:{currentPolicy:function(){return this.policies[this.currentPolicyId]},policies:function(){return this.$store.getters.policies}},methods:{gotoNext:function(){if(this.$toast.clear(),this.agreed){var t=this.policies.length-1;if(this.currentPolicyId<t)return this.currentPolicyId++,void(this.agreed=!1);this.$store.commit("COMPLETE_POLICY"),this.$router.push({path:"/summary"})}else this.$toasted.error("Please accept the policy first",{duration:6e3,position:"bottom-center",className:"bg-yellow-500"})},gotoBack:function(){this.$router.push({path:"/profile/more"})}},mounted:function(){this.$store.state.policy_done&&(this.agreed=!0,this.currentPolicyId=this.policies.length-1)},middleware:function(t){var e=t.store,r=t.redirect,o=t.$toast;e.state.profile_done||(o.info("Please provide profile information first"),r("/profile"))}},n=(r(348),r(17)),component=Object(n.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("h1",{staticClass:"px-6 mb-6 text-xl font-bold text-center md:px-0 md:text-2xl"},[t._v("Please accept our policies")]),t._v(" "),r("div",{staticClass:"flex flex-col justify-center space-y-6 md:space-y-0 md:space-x-6 md:flex-row"},[r("div",{staticClass:"w-full md:w-6/12"},[r("div",{staticClass:"px-6 pt-6 text-gray-700 bg-white border-t border-b md:border md:rounded-lg md:shadow-lg"},[t.currentPolicy?r("div",{staticClass:"border rounded-md"},[r("div",{staticClass:"grid grid-cols-2 px-3 py-4 space-x-3 border-b"},[r("div",{staticClass:"text-base font-bold capitalize"},[t._v(t._s(t.currentPolicy.name))])]),t._v(" "),r("div",{staticClass:"px-3 py-4"},[r("pre",{staticClass:"w-full overflow-y-auto h-80",domProps:{innerHTML:t._s(t.currentPolicy.content)}})]),t._v(" "),r("div",{staticClass:"flex justify-start px-3 py-4"},[r("label",{staticClass:"inline-flex items-center font-bold cursor-pointer"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.agreed,expression:"agreed"}],staticClass:"w-6 h-6 mr-4 text-green-600 rounded-full focus:ring-1 focus:ring-green-600",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.agreed)?t._i(t.agreed,null)>-1:t.agreed},on:{change:function(e){var r=t.agreed,o=e.target,n=!!o.checked;if(Array.isArray(r)){var c=t._i(r,null);o.checked?c<0&&(t.agreed=r.concat([null])):c>-1&&(t.agreed=r.slice(0,c).concat(r.slice(c+1)))}else t.agreed=n}}}),t._v("\n                            I will accept the terms and condition\n                        ")])])]):t._e(),t._v(" "),r("div",{staticClass:"flex w-full my-6 space-x-2"},[r("MainButton",{attrs:{outline:""},on:{click:function(e){return t.gotoBack()}}},[t._v("Back")]),t._v(" "),r("MainButton",{on:{click:function(e){return t.gotoNext()}}},[t._v("Next")])],1)])]),t._v(" "),r("div",{staticClass:"flex-shrink-0 w-full px-6 md:px-0 md:w-3/12"},[r("ReservationBox")],1)])])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{MainButton:r(324).default,ReservationBox:r(326).default})}}]);