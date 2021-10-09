(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{436:function(e,t,r){var content=r(459);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(49).default)("3b5ad934",content,!0,{sourceMap:!1})},458:function(e,t,r){"use strict";r(436)},459:function(e,t,r){var o=r(48)(!1);o.push([e.i,'pre{font-family:"Maison Neue","Source Sans Pro",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word}',""]),e.exports=o},473:function(e,t,r){"use strict";r.r(t);var o={layout:"booking",data:function(){return{currentPolicyId:0,agreed:!1,acceptedPolicies:[]}},computed:{currentPolicy:function(){return this.policies[this.currentPolicyId]},policies:function(){return[this.$store.getters.policies[0]]}},methods:{gotoNext:function(){if(this.$toast.clear(),this.agreed){var e=this.policies.length-1;if(this.currentPolicyId<e)return this.currentPolicyId++,void(this.agreed=!1);this.$store.commit("COMPLETE_POLICY"),this.$router.push({path:"/summary"})}else this.$toasted.error("Please accept the policy first",{duration:6e3,position:"bottom-center",className:"bg-yellow-500"})},gotoBack:function(){this.$router.push({path:"/profile/more"})}},mounted:function(){this.$store.state.policy_done&&(this.agreed=!0,this.currentPolicyId=this.policies.length-1)},middleware:function(e){var t=e.store,r=e.redirect;e.$toast;t.state.profile_done||r("/profile")}},n=(r(458),r(4)),component=Object(n.a)(o,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("h1",{staticClass:"px-6 mb-6 text-xl font-bold text-center md:px-0 md:text-2xl"},[e._v("Please accept our house rules (required)")]),e._v(" "),r("div",{staticClass:"flex flex-col justify-center space-y-6 md:space-y-0 md:space-x-6 md:flex-row"},[r("div",{staticClass:"w-full md:w-6/12"},[r("div",{staticClass:"px-6 pt-6 text-gray-700 bg-white border-t border-b md:border md:rounded-lg md:shadow-lg"},[e.currentPolicy?r("div",{staticClass:"bg-white border rounded-md"},[r("div",{staticClass:"grid grid-cols-2 px-3 py-4 space-x-3 border-b"},[r("div",{staticClass:"text-base font-bold capitalize"},[e._v(e._s(e.currentPolicy.name))])]),e._v(" "),r("div",{staticClass:"px-3 py-4 bg-gray-100"},[r("pre",{staticClass:"w-full overflow-y-auto h-80",domProps:{innerHTML:e._s(e.currentPolicy.content)}})]),e._v(" "),r("div",{staticClass:"px-3 py-4"},[r("label",{staticClass:"inline-flex items-center font-bold cursor-pointer"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.agreed,expression:"agreed"}],staticClass:"w-6 h-6 mr-4 text-green-600 rounded-full focus:ring-1 focus:ring-green-600",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.agreed)?e._i(e.agreed,null)>-1:e.agreed},on:{change:function(t){var r=e.agreed,o=t.target,n=!!o.checked;if(Array.isArray(r)){var l=e._i(r,null);o.checked?l<0&&(e.agreed=r.concat([null])):l>-1&&(e.agreed=r.slice(0,l).concat(r.slice(l+1)))}else e.agreed=n}}}),e._v("\n                            I accept Jara's booking terms and conditions\n                        ")]),e._v(" "),e._m(0)])]):e._e(),e._v(" "),r("div",{staticClass:"flex w-full my-6 space-x-2"},[r("MainButton",{attrs:{outline:""},on:{click:function(t){return e.gotoBack()}}},[e._v("Back")]),e._v(" "),r("MainButton",{on:{click:function(t){return e.gotoNext()}}},[e._v("Next")])],1)]),e._v(" "),r("div",{staticClass:"flex items-center w-full my-6 space-x-2"},[r("StartOverButton",{staticClass:"w-full"})],1)]),e._v(" "),r("div",{staticClass:"flex-shrink-0 w-full px-6 md:px-0 md:w-3/12"},[r("ReservationBox",{attrs:{showDiscount:""}})],1)])])}),[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"mt-6"},[e._v("\n                            I specifically confirm that I:\n                            "),r("ol",{staticClass:"pl-6 mt-1 list-decimal"},[r("li",[e._v("understand the use of illegal drugs is strictly prohibited including marijuana")]),e._v(" "),r("li",[e._v("understand my booking permits only the number of guests stated on my booking")]),e._v(" "),r("li",[e._v("agree to abide by all house rules and regulations set forth to ensure the peace and enjoyment for all guests")]),e._v(" "),r("li",[e._v("agree to pay the access road toll fee owned and operated by the Museyo Youth Community; N500 for a car or SUV or N1,000 for a vehicle above six passengers, where cash is required.")])])])}],!1,null,null,null);t.default=component.exports;installComponents(component,{MainButton:r(31).default,StartOverButton:r(206).default,ReservationBox:r(207).default})}}]);