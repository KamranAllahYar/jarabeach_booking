(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{420:function(t,e,n){var content=n(445);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(42).default)("448eb69a",content,!0,{sourceMap:!1})},443:function(t,e,n){window,t.exports=function(){return a={},t.m=e=[function(t,e,n){"use strict";var a,r,i,o,c,u,s,l,d,p,f;n.r(e),o=!(i=[]),s=u=c=null,f="function"==typeof(a={props:{embed:{type:Boolean,default:!1},paystackkey:{type:String,required:!0},email:{type:String,required:!0},firstname:{type:String,default:""},lastname:{type:String,default:""},amount:{type:Number,required:!0},reference:{type:String,required:!0},channels:{type:Array,default:function(){return["card","bank"]}},accessCode:{type:String,default:""},callback:{type:Function,required:!0,default:function(){}},close:{type:Function,required:!0,default:function(){}},metadata:{type:Object,default:function(){return{}}},currency:{type:String,default:"NGN"},plan:{type:String,default:""},quantity:{type:String,default:""},subaccount:{type:String,default:""},split:{type:Object,default:function(){return{}}},splitCode:{type:String,default:""},transactionCharge:{type:Number,default:0},bearer:{type:String,default:""}},data:function(){return{scriptLoaded:null}},created:function(){var t=this;this.scriptLoaded=new Promise((function(e){t.loadScript((function(){e()}))}))},mounted:function(){this.embed&&this.payWithPaystack()},methods:{loadScript:function(t){var e=document.createElement("script");e.src="https://js.paystack.co/v1/inline.js",document.getElementsByTagName("head")[0].appendChild(e),e.readyState?e.onreadystatechange=function(){"loaded"!==e.readyState&&"complete"!==e.readyState||(e.onreadystatechange=null,t())}:e.onload=function(){t()}},isDynamicSplit:function(){return this.split.constructor===Object&&0<Object.keys(this.split).length},payWithPaystack:function(){var t=this;this.scriptLoaded&&this.scriptLoaded.then((function(){var e={key:t.paystackkey,email:t.email,firstname:t.firstname,lastname:t.lastname,channels:t.channels,amount:t.amount,access_code:t.accessCode,ref:t.reference,callback:function(e){t.callback(e)},onClose:function(){t.close()},metadata:t.metadata,currency:t.currency,plan:t.plan,quantity:t.quantity,subaccount:t.isDynamicSplit()?"":t.subaccount,split:t.isDynamicSplit()?t.split:null,split_code:t.isDynamicSplit()?"":t.splitCode,transaction_charge:t.isDynamicSplit()?0:t.transactionCharge,bearer:t.isDynamicSplit()?"":t.bearer};t.embed&&(e.container="paystackEmbedContainer"),e=window.PaystackPop.setup(e),t.embed||e.openIframe()}))}}})?a.options:a,(r=function(){var t=this,e=t._self._c||t.$createElement;return t.embed?e("div",{attrs:{id:"paystackEmbedContainer"}}):e("button",{staticClass:"payButton",on:{click:t.payWithPaystack}},[t._t("default",[t._v("Make Payment")])],2)})&&(f.render=r,f.staticRenderFns=i,f._compiled=!0),o&&(f.functional=!0),u&&(f._scopeId="data-v-"+u),s?f._ssrRegister=d=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),c&&c.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)}:c&&(d=l?function(){c.call(this,(f.functional?this.parent:this).$root.$options.shadowRoot)}:c),d&&(f.functional?(f._injectStyles=d,p=f.render,f.render=function(t,e){return d.call(e),p(t,e)}):f.beforeCreate=(l=f.beforeCreate)?[].concat(l,d):[d]),n={exports:a,options:f},e.default=n.exports}],t.c=a,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)t.d(r,a,function(t){return e[t]}.bind(null,a));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},t.p="/dist/",t(t.s=0);function t(n){if(a[n])return a[n].exports;var r=a[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var e,a}()},444:function(t,e,n){"use strict";n(420)},445:function(t,e,n){var r=n(41)(!1);r.push([t.i,".payButton{flex:1;width:100%}",""]),t.exports=r},458:function(t,e,n){"use strict";n.r(e);var r=n(8),o=(n(37),n(31),n(9),n(50),n(36),n(443)),c={layout:"booking",components:{Paystack:n.n(o).a},data:function(){return{code:"",loadingCode:!1,loading:!1,trans_ref:null,holdDisclaimer:!1}},computed:{shouldShowBookOnHold:function(){if(this.$store.state.editMode)return!1;var t=(new Date).getHours();return console.log(t),!(t>=20||t<8)},shouldShowPaymentButton:function(){return!this.$store.state.editMode||!(this.$store.state.editMode&&this.totalPrice<=0)},totalNights:function(){return this.$store.getters.totalNights},totalRooms:function(){return this.$store.getters.totalRooms},rooms:function(){return this.$store.getters.bookedRooms},roomsPrice:function(){return this.rooms.reduce((function(t,e){return t+e.price}),0)},specials:function(){return this.$store.getters["extras/allSelected"]},totalPrice:function(){return this.$store.state.editMode?100*this.$store.getters.differenceToPay:100*this.$store.getters.totalPrice},guestEmail:function(){return this.$store.state.guest.email},paystackkey:function(){return this.$config.PAYMENT_PUBLIC_KEY}},methods:{holdDisclaimerToggle:function(t){this.holdDisclaimer=t},removeExtra:function(t){console.log(t);var e=t.type;this.$store.commit("extras/REMOVE_EXTRA",e),this.createTransaction()},createTransaction:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,e.next=3,t.$store.dispatch("createTransaction");case 3:n=e.sent,console.log(n),t.trans_ref=n,t.loading=!1;case 7:case"end":return e.stop()}}),e)})))()},completeBooking:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(console.log(t),"success"!=t.status){n.next=9;break}return n.next=4,e.$store.dispatch("createBooking",{trans_ref:e.trans_ref,method_ref:t.transaction,method:"Paystack"});case 4:r=n.sent,console.log(r),r&&(console.log(r),e.$router.push("/done"),e.$store.commit("RESET_STORE"),e.$store.commit("extras/RESET_STORE")),n.next=10;break;case 9:e.$toasted.error(res.message);case 10:e.loading=!1;case 11:case"end":return n.stop()}}),n)})))()},updateBooking:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.loading){e.next=2;break}return e.abrupt("return");case 2:return t.loading=!0,e.next=5,t.$store.dispatch("createBooking",{trans_ref:t.trans_ref,method_ref:"update booking",method:"Update"});case 5:(n=e.sent)&&(console.log(n),t.$router.push("/done"),t.$store.commit("RESET_STORE"),t.$store.commit("extras/RESET_STORE")),t.loading=!1;case 8:case"end":return e.stop()}}),e)})))()},bookOnHoldBooking:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("Clickling book on hold"),!t.loading){e.next=3;break}return e.abrupt("return");case 3:return t.loading=!0,e.next=6,t.$store.dispatch("createBooking",{trans_ref:t.trans_ref,method_ref:"offline booking",method:"Offline"});case 6:n=e.sent,console.log(n),n&&(console.log(n),t.$router.push("/done_hold"),t.$store.commit("RESET_STORE"),t.$store.commit("extras/RESET_STORE")),t.loading=!1;case 10:case"end":return e.stop()}}),e)})))()},currency:function(t){return"₦"+t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},gotoBack:function(){this.$router.push("/policies")},removeRoom:function(t){console.log(t),this.$store.commit("REMOVE_ROOM",t)},checkDiscount:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.$store.commit("UPDATE_DISCOUNT",null),!(t.code.length<=2)){e.next=4;break}return t.$toast.info("Please input a proper code"),e.abrupt("return");case 4:t.loadingCode=!0,console.log("Check for - "+t.code),t.$axios.post("/check-discount",{code:t.code}).then((function(e){var data=e.data;if(console.log(data),data.success){t.$toasted.success(data.message);var n=Object.assign({},data.data);console.log(n),t.$store.commit("UPDATE_DISCOUNT",n),t.createTransaction()}else t.$toasted.error(data.message);console.log(data)})).finally((function(){t.loadingCode=!1}));case 7:case"end":return e.stop()}}),e)})))()},closePayment:function(){console.log("You closed payment"),this.$toast.error("Payment was not completed"),this.createTransaction()}},mounted:function(){this.createTransaction()},middleware:function(t){var e=t.store,n=t.redirect;t.$toast;e.state.policy_done||n("/policies"),e.commit("UPDATE_DISCOUNT",null)}},l=(n(444),n(1)),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h1",{staticClass:"mb-6 text-xl font-bold text-center md:text-2xl"},[t._v("Here's your booking summary!")]),t._v(" "),n("div",{staticClass:"flex flex-col justify-center space-y-6 md:space-y-0 md:space-x-6 md:flex-row"},[n("div",{staticClass:"w-full md:w-6/12"},[n("div",{staticClass:"px-6 pt-6 text-gray-700 bg-white border-t border-b md:border md:rounded-lg md:shadow-lg"},[n("div",{staticClass:"border rounded-md"},[n("div",{staticClass:"flex flex-col divide-y"},[n("div",{staticClass:"flex items-center justify-between px-3 py-4"},[n("div",{staticClass:"text-base"},[n("div",[t._v("Stay ("+t._s(t.totalNights)+" Nights - "+t._s(t.totalRooms)+" Rooms)")])]),t._v(" "),n("div",{staticClass:"text-lg font-bold text-right"},[n("div",[t._v(t._s(t.currency(t.roomsPrice)))])])]),t._v(" "),t._l(t.specials,(function(e){return n("div",{key:e.id,staticClass:"flex items-center justify-between px-3 py-4"},[n("div",[t._v(t._s(e.name))]),t._v(" "),n("div",{staticClass:"text-lg font-bold"},["cakes"==e.type?n("span",[t._v("\n                                    "+t._s(t.currency(t.$store.getters["extras/cakesPrice"]))+"\n                                ")]):"drinks"==e.type?n("span",[t._v("\n                                    "+t._s(t.currency(t.$store.getters["extras/drinksPrice"]))+"\n                                ")]):"massages"==e.type?n("span",[t._v("\n                                    "+t._s(t.currency(t.$store.getters["extras/massagesPrice"]))+"\n                                ")]):"photoshoot"==e.type?n("span",[t._v("\n                                    "+t._s(t.currency(t.$store.getters["extras/photoshootPrice"]))+"\n                                ")]):"roomDecoration"==e.type?n("span",[t._v("\n                                    "+t._s(t.currency(t.$store.getters["extras/decorationPrice"]))+"\n                                ")]):"unforgettableExperience"==e.type?n("span",[t._v("\n                                    "+t._s(t.currency(t.$store.getters["extras/experiencePrice"]))+"\n                                ")]):"domesticStaff"==e.type?n("span",[t._v("\n                                    "+t._s(t.currency(t.$store.getters["extras/staffPrice"]))+"\n                                ")]):"massage"==e.type?n("span",[t._v("\n                                    "+t._s(t.currency(t.$store.getters["extras/massagePrice"]))+"\n                                ")]):"newmassage"==e.type?n("span",[t._v("\n                                    "+t._s(t.currency(t.$store.getters["extras/newmassagePrice"]))+"\n                                ")]):"quadbike"==e.type?n("span",[t._v("\n                                    "+t._s(t.currency(t.$store.getters["extras/quadbikePrice"]))+"\n                                ")]):"lookout"==e.type?n("span",[t._v("\n                                    "+t._s(t.currency(t.$store.getters["extras/lookoutPrice"]))+"\n                                ")]):n("span",[t._v("\n                                    "+t._s(t.currency(0))+"\n                                ")]),t._v(" "),n("div",{staticClass:"text-xs font-light text-right text-red-500 cursor-pointer hover:underline",on:{click:function(n){return t.removeExtra(e)}}},[t._v("Remove")])])])}))],2)]),t._v(" "),t.$store.state.editMode?t._e():n("div",{staticClass:"mt-6 mb-12 border border-gray-100 rounded-md bg-gray-50 ring-gray-200 focus-within:ring ring-offset-2"},[n("form",{staticClass:"flex justify-between p-2",on:{submit:function(e){return e.preventDefault(),t.checkDiscount()}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.code,expression:"code"}],staticClass:"w-full ml-2 bg-transparent outline-none",attrs:{placeholder:"Enter Discount code"},domProps:{value:t.code},on:{input:function(e){e.target.composing||(t.code=e.target.value)}}}),t._v(" "),n("div",{staticClass:"w-40 ml-3"},[n("MainButton",{staticClass:"text-white rounded-md focus:outline-none focus:ring bg-brand-blue-400",attrs:{loading:t.loadingCode,type:"submit"}},[t._v("Apply")])],1)])]),t._v(" "),n("div",{staticClass:"flex flex-col items-center w-full my-6 space-y-2 md:space-y-0 md:flex-row md:space-x-2"},[n("MainButton",{staticClass:"w-3/12",attrs:{outline:""},on:{click:function(e){return t.gotoBack()}}},[t._v("Back")]),t._v(" "),t.shouldShowPaymentButton?[t.shouldShowBookOnHold?n("div",{staticClass:"relative flex-shrink-0 w-full md:w-5/12",on:{mouseenter:function(e){return t.holdDisclaimerToggle(!0)},mouseleave:function(e){return t.holdDisclaimerToggle(!1)}}},[n("MainButton",{attrs:{loading:t.loading},nativeOn:{click:function(e){return t.bookOnHoldBooking()}}},[n("div",{staticClass:"flex justify-center"},[n("svg",{staticClass:"w-6 h-6 mr-2",attrs:{fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"}},[n("path",{attrs:{"fill-rule":"evenodd",d:"M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z","clip-rule":"evenodd"}})]),t._v("\n                                    Hold | Bank Transfer\n                                ")])]),t._v(" "),t.holdDisclaimer?n("div",{staticClass:"absolute p-2 mx-auto text-xs bg-white border-2 rounded border-brand-blue-300",staticStyle:{top:"-120px"}},[t._v("\n                                Booking will only be held for "),n("b",[t._v("30 mins")]),t._v(". You must send a proof of payment to\n                                "),n("b",[t._v("bookings@jarabeachresort.com")]),t._v(" within that time or the hold on the\n                                booking will be cancelled.\n                                "),n("br"),t._v(" "),n("i",{staticClass:"text-red-800"},[t._v("Option not available between 6pm-9am WAT")])]):t._e()],1):t._e(),t._v(" "),n("div",{staticClass:"flex-shrink-0 w-full md:w-4/12 "},[null!=t.trans_ref?n("Paystack",{attrs:{amount:t.totalPrice,email:t.guestEmail,paystackkey:t.paystackkey,reference:t.trans_ref,callback:t.completeBooking,close:t.closePayment,embed:!1}},[n("MainButton",{attrs:{loading:t.loading}},[n("div",{staticClass:"flex justify-center"},[n("svg",{staticClass:"w-6 h-6 mr-2",attrs:{fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"}},[n("path",{attrs:{"fill-rule":"evenodd",d:"M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z","clip-rule":"evenodd"}})]),t._v("\n                                        Book | Paystack\n                                    ")])])],1):t._e()],1)]:[n("MainButton",{attrs:{loading:t.loading},on:{click:function(e){return t.updateBooking()}}},[t._v("\n                            Update Booking\n                        ")])]],2)]),t._v(" "),n("div",{staticClass:"flex items-center w-full my-6 space-x-2"},[n("StartOverButton",{staticClass:"w-full"})],1)]),t._v(" "),n("div",{staticClass:"flex-shrink-0 w-full px-6 md:px-0 md:w-3/12"},[n("ReservationBox",{attrs:{showDiscount:"",showGuests:!0}})],1)])])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{MainButton:n(25).default,StartOverButton:n(188).default,ReservationBox:n(189).default})}}]);