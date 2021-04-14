<template>
    <div class="flex flex-col w-full">
        <div class="flex items-center px-4 mb-6 space-x-4 md:px-6">
            <div class="flex items-center h-10 text-base font-semibold w-28 md:w-40 md:text-lg text-brand-blue-400">
                {{ startDateStr }}<br />
                {{ endDateStr }}
            </div>

            <div class="flex items-center justify-end space-x-2">
                <div @click="prevMonth()" class="flex items-center justify-center w-8 h-8 bg-blue-200 rounded-full cursor-pointer text-brand-blue-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </div>
                <div @click="nextMonth()" class="flex items-center justify-center w-8 h-8 bg-blue-200 rounded-full cursor-pointer text-brand-blue-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </div>
                <div class="w-7">
                    <svg v-if="loading" class="w-5 h-5 mr-3 -ml-1 text-black animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            </div>
            <div class="flex-1"></div>
            <div class="flex-shrink-0 text-xs font-semibold border-b cursor-pointer md:text-base border-brand-blue-400 text-brand-blue-400" @click="openSlideshow()" id="roomSetup">
                View Room Setup
            </div>
        </div>

        <div class="flex items-center px-3 py-3 text-xs md:text-base md:px-6 md:py-3">
            <div class="flex items-center flex-shrink-0 mr-5 text-gray-600 md:w-auto">
                <div class="flex items-center justify-center flex-shrink-0 w-4 h-4 mr-2 rounded-sm md:mr-4 md:w-5 md:h-5 bg-cal-non-avail bg-opacity-20">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 19 19">
                        <path d="M5.5415 3.1665L13.4582 15.8332" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M13.4582 3.1665L5.5415 15.8332" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div> Not available
            </div>
            <div class="flex items-center text-gray-600 md:ml-10 md:w-auto">
                <div class="flex-shrink-0 w-4 h-4 mr-2 rounded-sm md:mr-4 md:w-5 md:h-5 bg-cal-avail bg-opacity-20"></div> Available - numbers represent available rooms
            </div>
        </div>

        <div class="flex w-full" v-for="(datesHalf, k) in calType30Days" :key="k">
            <div class="flex-shrink-0 w-32 bg-cal-box md:w-36">
                <div class="flex items-center px-4 text-base font-bold border border-l-0 border-gray-100 md:px-6 md:text-xl h-14">
                    <span v-if="k == 0">
                        <!-- {{ months[calMonth-1] }}. -->
                        <!-- {{calYear}} -->
                    </span>
                </div>
                <div v-for="roomType in roomTypes" :key="roomType" class="flex items-center w-full px-4 text-sm capitalize border border-l-0 border-gray-100 md:px-6 md:text-base h-14">
                    {{ roomType }}
                </div>
            </div>
            <div class="flex-1 overflow-y-auto md:overflow-y-visible">
                <div class="flex md:grid" :class="`grid-cols-${datesHalf.length}`">
                    <div v-for="(compDate, ix) in datesHalf" :key="ix+'sss'" class="flex flex-col items-center justify-center flex-shrink-0 text-sm text-center text-black border border-gray-100 bg-cal-box w-14 md:w-auto h-14">
                        <div class="text-xs md:text-xs">{{ weekDays[compDate.weekday] }}.</div>
                        <div class="text-xs font-light md:text-sm">{{ compDate.day }}</div>
                        <div class="text-xs font-light md:text-xs">{{ months[compDate.month] }}</div>
                    </div>
                </div>
                <div class="flex md:grid" :class="`grid-cols-${datesHalf.length}`" v-for="roomType in roomTypes" :key="roomType">
                    <div v-for="(compDate, ix) in datesHalf" :key="ix+'-df'"
                        class="relative flex items-center justify-center flex-shrink-0 text-xl text-gray-500 border border-gray-100 cursor-pointer font-extralight bg-opacity-20 w-14 md:w-auto h-14"
                        :class="roomsAvailable(roomType, compDate.dateStr) <= 0 ? 'bg-white' : 'bg-brand-blue-300'"
                        @click="selectRoom(roomType, compDate.dateStr)">
                        <!-- {{ compDate.dateStr }} -->
                        <div v-if="isSingle(roomType, compDate.dateStr)" class="flex items-center justify-center w-full h-10 transform scale-110 bg-green-400 rounded-full">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <div v-else-if="isStart(roomType, compDate.dateStr)" class="flex items-center justify-center w-full h-10 transform scale-110 bg-green-400 rounded-l-full"
                            :class="{'opacity-50 rounded-full': endDate == null}">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <div v-else-if="isEnd(roomType, compDate.dateStr)" class="flex items-center justify-center w-full h-10 transform scale-110 bg-green-400 rounded-r-full">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <div v-else-if="isBetween(roomType, compDate.dateStr)" class="w-full h-10 transform scale-110 bg-green-400"></div>
                        <span v-else-if="loading">-</span>
                        <span v-else-if="roomsAvailable(roomType, compDate.dateStr) <= 0">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 19 19">
                                <path d="M5.5415 3.1665L13.4582 15.8332" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M13.4582 3.1665L5.5415 15.8332" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                        <span v-else>{{ roomsAvailable(roomType, compDate.dateStr) }}</span>

                        <!-- POPOVER -->
                        <div v-if="isEnd(roomType, compDate.dateStr) && !smallScreen" @click.stop=""
                            class="absolute bottom-0 right-0 z-50 w-48 py-2 pl-3 pr-4 text-sm transform translate-x-full bg-white border rounded-lg"
                            style="--tw-translate-x: 104%">
                            <div v-if="loadingRoomOptions">
                                <svg class="w-5 h-5 mr-3 -ml-1 text-black animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                            <div v-else>
                                <template v-for="h in hoveredRooms">
                                    <div v-if="h.available == true" :key="h.room.id" class="flex items-center py-2 cursor-pointer"
                                        @click="h.available == true ? addToBookedRoom(h.room, h.date) : ''">
                                        <svg v-if="!isBooked(h.room.id, h.date)" viewBox="0 0 16 16" class="inline-block w-6 h-6 mr-2 text-brand-blue" fill="none" stroke="currentColor">
                                            <path d="M8 14.703a6.75 6.75 0 100-13.5 6.75 6.75 0 000 13.5z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <svg v-else class="inline-block w-6 h-6 mr-2 text-brand-blue" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                        </svg>

                                        <span class="text-gray-700 whitespace-nowrap">
                                            {{ h.room.name }}
                                        </span>
                                    </div>
                                </template>
                                <div class="px-1" v-if="hoveredRooms.length <= 0">
                                    No rooms available for booking on this date
                                </div>
                            </div>
                        </div>
                        <!-- POPOVER END -->

                        <!-- MOBILE POPOVER -->
                        <template v-if="isEnd(roomType, compDate.dateStr) && showMobileSelect">
                            <div class="fixed inset-0 z-40 flex items-end w-screen h-screen bg-black bg-opacity-5" @click.stop>
                                <div class="flex-1"></div>
                                <div class="w-full px-4 pt-6 pb-12 bg-white " @click.stop>
                                    <div class="flex justify-end">
                                        <button @click="mobileSelectSheet = false">Done</button>
                                    </div>
                                    <div v-if="loadingRoomOptions">
                                        <svg class="w-5 h-5 mr-3 -ml-1 text-black animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </div>
                                    <div v-else>
                                        <template v-for="h in hoveredRooms">
                                            <div v-if="h.available == true" :key="h.room.id" class="flex items-center py-2 cursor-pointer"
                                                @click="h.available == true ? addToBookedRoom(h.room, h.date) : ''">
                                                <svg v-if="!isBooked(h.room.id, h.date)" viewBox="0 0 16 16" class="inline-block w-6 h-6 mr-2 text-brand-blue" fill="none" stroke="currentColor">
                                                    <path d="M8 14.703a6.75 6.75 0 100-13.5 6.75 6.75 0 000 13.5z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                                <svg v-else class="inline-block w-6 h-6 mr-2 text-brand-blue" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                                </svg>

                                                <span class="text-gray-700 whitespace-nowrap">
                                                    {{ h.room.name }} Room
                                                </span>
                                            </div>
                                        </template>
                                        <div class="px-1" v-if="hoveredRooms.length <= 0">
                                            No rooms available for booking on this date
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <!-- MOBILE POPOVER END -->

                    </div>
                </div>
            </div>
        </div>
        <div class="flex items-center justify-center py-3 bg-gray-100 md:hidden">
            <svg width="44" height="31" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M20.84 17.29l-3.158-2.577a1.365 1.365 0 01-.471-1.397v0a1.366 1.366 0 011.934-.89l.978.489V7.29a1.25 1.25 0 011.25-1.25v0a1.25 1.25 0 011.25 1.25v3.75l1.661.278a2.5 2.5 0 012.09 2.465v3.507M12.623 6.04h4.375M15.748 2.915L12.623 6.04l3.125 3.125M25.123 6.04h6.25M28.248 2.915l3.125 3.125-3.125 3.125" stroke="#747474" stroke-linecap="round" stroke-linejoin="round" />
                <path opacity=".8" d="M.35 27.313l.609-.119c.07.476.203.824.399 1.043.2.215.527.322.98.322.364 0 .64-.082.826-.245a.77.77 0 00.28-.602.672.672 0 00-.252-.553c-.168-.135-.534-.296-1.099-.483-.541-.173-.931-.362-1.169-.567-.233-.21-.35-.485-.35-.826 0-.355.138-.658.413-.91.28-.252.656-.378 1.127-.378.462 0 .847.114 1.155.343.308.229.492.565.553 1.008l-.588.126c-.056-.299-.17-.527-.343-.686-.168-.159-.427-.238-.777-.238-.308 0-.544.07-.707.21a.663.663 0 00-.245.525.55.55 0 00.224.455c.15.117.48.259.994.427.649.21 1.085.422 1.309.637.224.215.336.509.336.882 0 .401-.152.74-.455 1.015-.303.27-.721.406-1.253.406-1.162 0-1.818-.597-1.967-1.792zM4.94 29l-.818-3.71h.567l.595 2.793h.014l.98-2.793h.518l.966 2.793h.014l.665-2.793H9L8.11 29h-.524l-1.05-3.031h-.014L5.473 29H4.94zm4.513 0v-3.71h.574V29h-.574zm-.042-4.459v-.651h.658v.651h-.658zm1.92 2.065v1.176c0 .215.091.404.273.567a.996.996 0 00.68.238c.368 0 .65-.126.846-.378.2-.252.301-.607.301-1.064 0-.453-.1-.805-.3-1.057-.202-.257-.484-.385-.848-.385a.912.912 0 00-.693.28.896.896 0 00-.259.623zm-.574 3.969V25.29h.546v.357h.014c.093-.117.233-.222.42-.315.187-.098.401-.147.644-.147.462 0 .847.18 1.155.539.308.355.462.828.462 1.421 0 .597-.15 1.073-.448 1.428-.299.355-.688.532-1.169.532-.229 0-.439-.049-.63-.147-.191-.098-.327-.203-.406-.315h-.014v1.932h-.574zm6.253-2.716l.462.301c-.14.27-.341.497-.602.679-.257.177-.574.266-.952.266-.504 0-.917-.177-1.24-.532-.321-.36-.482-.835-.482-1.428s.156-1.066.469-1.421c.317-.36.725-.539 1.225-.539.494 0 .896.175 1.204.525.308.35.462.828.462 1.435v.168H14.77c.004.355.102.656.294.903.196.247.476.371.84.371a1.327 1.327 0 00.672-.175.873.873 0 00.203-.196c.074-.093.119-.154.133-.182.018-.028.051-.086.098-.175zm-2.226-1.001h2.205a1.355 1.355 0 00-.28-.812c-.178-.229-.45-.343-.82-.343-.359 0-.632.124-.818.371a1.298 1.298 0 00-.287.784zm4.6 2.142v-3.199h-.518v-.511h.525v-.567c0-.313.07-.53.21-.651.14-.121.34-.182.602-.182h.595v.511h-.49c-.144 0-.242.028-.294.084-.046.056-.07.173-.07.35v.455h.917v.511h-.91V29h-.567zm3.12-.413a.96.96 0 00.777-.378c.21-.257.315-.611.315-1.064 0-.453-.103-.805-.308-1.057a.961.961 0 00-.784-.385c-.327 0-.595.126-.805.378-.21.247-.315.602-.315 1.064 0 .462.105.819.315 1.071.21.247.478.371.805.371zm0 .518c-.49 0-.894-.173-1.211-.518-.317-.345-.476-.826-.476-1.442 0-.607.163-1.085.49-1.435.327-.35.726-.525 1.197-.525.466 0 .858.175 1.176.525.322.35.483.828.483 1.435 0 .616-.157 1.097-.47 1.442-.312.345-.709.518-1.19.518zM24.609 29v-3.71h.546v.399h.014a.779.779 0 01.329-.343.908.908 0 01.44-.119.61.61 0 01.162.021c.056.01.098.019.126.028l.035.021-.105.567a.634.634 0 00-.294-.056c-.238 0-.411.08-.518.238-.108.154-.161.404-.161.749V29h-.574zm5.612-1.232V26.62a.905.905 0 00-.26-.63c-.172-.191-.403-.287-.692-.287-.369 0-.649.126-.84.378-.192.252-.287.607-.287 1.064 0 .457.095.812.287 1.064.191.252.471.378.84.378a.98.98 0 00.679-.245.75.75 0 00.273-.574zM30.277 29v-.357h-.014a1.439 1.439 0 01-1.085.462c-.49 0-.882-.177-1.176-.532-.29-.355-.434-.83-.434-1.428 0-.593.151-1.066.455-1.421a1.46 1.46 0 011.155-.539c.424 0 .767.154 1.029.462h.014V23.89h.574V29h-.518zm3.362 0v-.406h-.014c-.07.121-.203.238-.4.35-.195.107-.44.161-.734.161-.411 0-.724-.1-.938-.301-.21-.2-.315-.453-.315-.756 0-.308.093-.548.28-.721.191-.177.513-.324.966-.441.168-.042.291-.075.37-.098.085-.023.18-.054.288-.091a.934.934 0 00.23-.119.498.498 0 00.12-.14.333.333 0 00.056-.189.478.478 0 00-.196-.392c-.126-.107-.32-.161-.581-.161-.495 0-.796.245-.903.735l-.518-.147a1.3 1.3 0 01.455-.791c.242-.205.557-.308.945-.308.429 0 .767.107 1.015.322.252.21.378.541.378.994V29h-.504zm-1.022-1.673c-.318.089-.535.184-.651.287a.516.516 0 00-.168.399c0 .387.245.581.735.581.336 0 .595-.075.777-.224a.709.709 0 00.273-.56v-.924h-.014c-.066.135-.383.282-.952.441zm2.279.595v-2.121h-.518v-.511h.532v-.91h.546v.91h.917v.511h-.91v2.051c0 .22.03.373.091.462.06.089.182.133.364.133h.28V29h-.308c-.35 0-.604-.089-.763-.266-.154-.182-.231-.453-.231-.812zm4.322-.063l.462.301c-.14.27-.341.497-.602.679-.257.177-.574.266-.952.266-.504 0-.917-.177-1.24-.532-.321-.36-.482-.835-.482-1.428s.156-1.066.469-1.421c.317-.36.725-.539 1.225-.539.494 0 .896.175 1.204.525.308.35.462.828.462 1.435v.168h-2.786c.004.355.102.656.294.903.196.247.476.371.84.371a1.327 1.327 0 00.672-.175.873.873 0 00.203-.196c.074-.093.119-.154.133-.182.018-.028.051-.086.098-.175zm-2.226-1.001h2.205a1.355 1.355 0 00-.28-.812c-.178-.229-.45-.343-.82-.343-.359 0-.632.124-.818.371a1.298 1.298 0 00-.287.784zm2.937.882l.54-.105c.07.649.412.973 1.028.973.294 0 .514-.054.658-.161a.501.501 0 00.224-.427.471.471 0 00-.21-.42c-.135-.093-.422-.2-.86-.322-.458-.126-.78-.268-.967-.427-.186-.159-.28-.373-.28-.644 0-.275.115-.513.343-.714.229-.205.544-.308.945-.308.406 0 .728.098.966.294.238.191.397.448.476.77l-.497.133c-.144-.471-.46-.707-.945-.707-.242 0-.43.051-.56.154-.13.103-.196.224-.196.364 0 .154.063.268.19.343.125.075.415.177.867.308.48.135.81.292.987.469.182.173.276.408.28.707 0 .294-.119.548-.357.763-.233.215-.585.322-1.057.322-.49 0-.865-.126-1.127-.378-.256-.257-.406-.586-.448-.987z" fill="#747474" />
            </svg>
        </div>

        <CoolLightBox
            :items="items"
            :index="index"
            @close="index = null">
        </CoolLightBox>

        <!-- !!!! DONT REMOVE !!! : grid-cols-32 grid-cols-31 grid-cols-30 grid-cols-29 grid-cols-28 grid-cols-27 grid-cols-17 grid-cols-16 grid-cols-15 grid-cols-14 grid-cols-13 grid-cols-12 (for purgecss )-->
    </div>
</template>

<script>
import getDay from "date-fns/getDay";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import parseISO from "date-fns/parseISO";
import isWeekend from "date-fns/isWeekend";
import isToday from "date-fns/isToday";
import format from "date-fns/format";
import add from "date-fns/add";
import sub from "date-fns/sub";
import getDate from "date-fns/getDate";
import getMonth from "date-fns/getMonth";
import getYear from "date-fns/getYear";
import differenceInDays from "date-fns/differenceInDays";

import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";

var getDaysArray = function (s, e) {
    for (var a = [], d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
        a.push(new Date(d));
    }
    return a;
};

export default {
    props: ["initialRooms"],
    components: {
        CoolLightBox,
    },
    data() {
        return {
            mobileSelectSheet: false,
            smallScreen: false,
            windowWidth: window.innerWidth,
            rooms: [],
            calMonth: new Date().getMonth() + 1,
            calYear: new Date().getFullYear(),
            today: new Date(),
            weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            months: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "June",
                "July",
                "Aug",
                "Sept",
                "Oct",
                "Nov",
                "Dec",
            ],
            availableRooms: [],
            loading: false,
            hoveredRooms: [],
            bookedRooms: [],
            maxYear: new Date().getFullYear() + 1,
            maxMonth: new Date().getMonth() + 1,
            minYear: new Date().getFullYear(),
            minMonth: new Date().getMonth() + 1,

            startDate: null,
            endDate: null,
            seRoom: null,
            loadingRoomOptions: false,

            roomIds: [],

            index: null,
            items: [
                // require("~/assets/images/rooms_img.png"),
                "/room_1.webp",
                "/room_2.webp",
                "/room_3.webp",
                "/room_4.webp",
            ],
        };
    },
    watch: {
        windowWidth: {
            handler(newWidth, oldWidth) {
                if (newWidth <= 768) {
                    this.smallScreen = true;
                } else {
                    this.smallScreen = false;
                }
            },
            immediate: true,
        },
    },
    computed: {
        startDateStr() {
            return format(this.today, "do MMM yyyy");
        },
        endDateStr() {
            return format(add(this.today, { days: 30 }), "do MMM yyyy");
        },
        all30Dates() {
            const today = this.today;

            let all = [];
            for (let i = 0; i <= 30; i++) {
                const date = add(today, { days: i });
                all[i] = {
                    weekday: getDay(date),
                    day: getDate(date),
                    month: getMonth(date),
                    year: getYear(date),
                    dateStr: format(date, "yyyy-MM-dd"),
                };
            }

            return all;
        },
        firstHalf30Days() {
            const nums = [];
            for (let n = 0; n < 15; n++) {
                nums.push(this.all30Dates[n]);
            }
            return nums;
        },
        secondHalf30Days() {
            const nums = [];
            for (let n = 15; n <= 30; n++) {
                nums.push(this.all30Dates[n]);
            }
            return nums;
        },
        calType30Days() {
            if (this.smallScreen) return [this.all30Dates];

            return [this.firstHalf30Days, this.secondHalf30Days];
        },
        showMobileSelect() {
            return this.smallScreen && this.mobileSelectSheet;
        },
        daysInMonth() {
            return new Date(this.calYear, this.calMonth, 0).getDate();
        },
        calTypeDays() {
            if (this.smallScreen) return [this.fullDays];

            return [this.firstHalfDays, this.secondHalfDays];
        },
        fullDays() {
            let num = this.daysInMonth;
            console.log(this.daysInMonth);

            const nums = [];
            for (let n = 1; n <= num; n++) {
                nums.push(n);
            }
            return nums;
        },
        firstHalfDays() {
            let num = Math.ceil(this.daysInMonth / 2);
            console.log(this.daysInMonth);

            const nums = [];
            for (let n = 1; n <= num; n++) {
                nums.push(n);
            }
            return nums;
        },
        secondHalfDays() {
            const num = this.daysInMonth - this.firstHalfDays.length + 1;

            console.log(num + 1);

            const nums = [];
            for (let n = num + 1; n <= this.daysInMonth; n++) {
                nums.push(n);
            }
            return nums;
        },
        dayMonth() {
            return new Date(this.calYear, this.calMonth, 0);
        },
        firstWeekDay() {
            return getDay(new Date(this.calYear, this.calMonth - 1, 1)) + 1;
        },
        roomTypes() {
            const types = [];
            this.rooms.forEach((room) => {
                if (!types.includes(room.type)) {
                    types.push(room.type);
                }
            });

            return types;
        },
        isMaxMonthYear() {
            return (
                this.calYear >= this.maxYear && this.calMonth >= this.maxMonth
            );
        },
        isMinMonthYear() {
            return (
                this.calYear <= this.minYear && this.calMonth <= this.minMonth
            );
        },
        bigPeople() {
            return this.$store.getters.bigPeople;
        },
        smallPeople() {
            return this.$store.getters.smallPeople;
        },
    },
    methods: {
        openSlideshow() {
            this.$emit("viewsetup");
            this.index = 0;
        },
        isBooked(room_id, dateStr) {
            return this.roomIds.includes(room_id);
        },
        checkCanBookBasedOnPeople() {},
        addToBookedRoom(room, dateStr) {
            if (this.roomIds.includes(room.id)) {
                const ix = this.roomIds.findIndex((rid) => rid == room.id);
                if (ix >= 0) {
                    this.roomIds.splice(ix, 1);
                }
            } else {
                // if (room.type == "standard") {
                //     let shouldStop = false;

                //     if (this.bigPeople > 2) {
                //         shouldStop = true;
                //     } else if (this.smallPeople > 2) {
                //         shouldStop = true;
                //     }

                //     if (shouldStop) {
                //         this.$toast.info(
                //             "Our standard rooms welcomes a group of two adults and an infant and toddler only. For your group size, you need to select a family room."
                //         );
                //         return;
                //     }
                // }
                this.roomIds.push(room.id);
            }

            this.generateAndEmitBookedRooms();
        },
        generateAndEmitBookedRooms() {
            const dates = this.getDatesInbetween();

            let bookedRooms = [];

            this.roomIds.forEach((roomId) => {
                dates.forEach((date) => {
                    bookedRooms.push({
                        room_id: roomId,
                        date: date,
                        isWeekend: isWeekend(parseISO(date)),
                    });
                });
            });

            this.$emit("selected", bookedRooms);
        },
        isStart(roomType, dateStr) {
            if (this.seRoom != roomType) return false;
            if (this.startDate == null) return false;

            return this.startDate == dateStr;
        },
        isEnd(roomType, dateStr) {
            if (this.seRoom != roomType) return false;
            if (this.endDate == null) return false;

            return this.endDate == dateStr;
        },
        isSingle(roomType, dateStr) {
            return (
                this.isStart(roomType, dateStr) && this.isEnd(roomType, dateStr)
            );
        },
        isBetween(roomType, dateStr) {
            if (this.seRoom != roomType) return false;
            if (this.startDate == null || this.endDate == null) return false;

            const startStr = this.startDate.substring(0, 10);
            const endStr = this.endDate.substring(0, 10);

            return (
                isAfter(parseISO(dateStr), parseISO(startStr)) &&
                isBefore(parseISO(dateStr), parseISO(endStr))
            );
        },
        selectRoom(roomType, dateStr) {
            if (this.roomsAvailable(roomType, dateStr) <= 0) return;

            this.seRoom = roomType;

            if (this.startDate == dateStr && this.endDate == dateStr) {
                this.startDate = null;
                this.endDate = null;
                return;
            }

            if (this.startDate == null) {
                this.startDate = dateStr;
            } else if (this.endDate == null) {
                if (isBefore(parseISO(dateStr), parseISO(this.startDate))) {
                    this.endDate = this.startDate;
                    this.startDate = dateStr;

                    this.getRoomsAvailableForPeriod();
                } else {
                    this.endDate = dateStr;

                    this.getRoomsAvailableForPeriod();
                }
            } else {
                this.endDate = null;
                this.startDate = dateStr;
            }
        },
        getRoom(roomId) {
            return this.rooms.find((room) => room.id == roomId);
        },
        roomsAvailable(roomType, dateStr) {
            const roomsHere = this.availableRooms[dateStr];

            if (isToday(parseISO(dateStr))) {
                const today = new Date();
                const todayHrs = today.getHours();
                if (todayHrs >= 11) return 0;
            } else if (isBefore(parseISO(dateStr), new Date())) {
                return 0;
            }

            let count = 0;

            if (roomsHere) {
                roomsHere.forEach((room, ix) => {
                    const rs = this.roomTypeIds(roomType);
                    if (rs.includes(room.room_id)) {
                        if (room.available == true) count++;
                    }
                });
            }

            return count;
        },
        roomTypeIds(roomType) {
            return this.rooms
                .filter((room) => room.type == roomType)
                .map((room) => room.id);
        },
        dayOfWeek(day) {
            return this.weekDays[
                getDay(new Date(this.calYear, this.calMonth - 1, day))
            ];
        },
        nextMonth() {
            const diff = differenceInDays(this.today, new Date());

            if (diff > 365) {
                this.$toast.info("You cannot book more than a year ahead");
                return;
            }

            this.today = add(this.today, { days: 31 });

            this.getRoomsForMonth();
        },
        prevMonth() {
            const diff = differenceInDays(this.today, new Date());
            console.log(diff);
            if (diff <= 0) {
                this.$toast.info("You cannot book in the past");
                return;
            }

            this.today = sub(this.today, { days: 31 });

            this.getRoomsForMonth();
        },
        getRooms() {
            this.$axios.get("/rooms").then((res) => {
                this.rooms = res.data.data;
            });
        },
        getRoomsForMonth() {
            this.loading = true;

            const dataToSend = {
                // date: `${this.calYear}-${this.calMonth}-01`,
                date: format(this.today, "yyyy-MM-dd"),
                days: 31,
            };

            setTimeout(() => {
                this.$axios
                    .post("/available-rooms-days", dataToSend)
                    .then((res) => {
                        this.availableRooms = res.data.data;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }, 0);
        },
        async getRoomsAvailableForPeriod() {
            this.loadingRoomOptions = true;
            this.mobileSelectSheet = true;
            const date = this.startDate;
            this.roomIds = [];

            let bookingId = null;
            if (this.$store.state.editMode) {
                bookingId = this.$store.state.editBooking.id;
            }

            return await this.$axios
                .post("/check-rooms", {
                    start: this.startDate,
                    end: this.endDate,
                    // type: this.seRoom,
                    booking_id: bookingId,
                })
                .then((res) => {
                    console.log(res.data.data);
                    const aRooms = res.data.data;

                    this.hoveredRooms = [];
                    aRooms.map((room) => {
                        this.hoveredRooms.push({
                            room: room,
                            available: true,
                            date: date,
                        });
                    });
                    if (this.seRoom == "family") {
                        this.hoveredRooms.sort((a, b) =>
                            a.type > b.type ? 1 : -1
                        );
                    }
                })
                .finally(() => {
                    this.loadingRoomOptions = false;
                });
        },
        getDatesInbetween() {
            if (this.startDate == null || this.endDate == null) return [];

            var dateList = getDaysArray(
                new Date(this.startDate),
                new Date(this.endDate)
            ).map((v) => v.toISOString().slice(0, 10));

            console.log(dateList);

            return dateList;
        },
        onResize() {
            this.windowWidth = window.innerWidth;
        },
    },
    mounted() {
        this.getRooms();
        this.getRoomsForMonth();

        console.log("ROOM CALENDAR MOUNTED");
        console.log(this.initialRooms);

        if (this.initialRooms) {
            this.bookedRooms = this.initialRooms;
            console.log("-----------ALL INITIAL ROOMS");
            console.log(this.initialRooms);
            console.log(this.roomIds);

            const firstRoom = this.initialRooms[0];

            if (firstRoom) {
                if (firstRoom.room_id > 0 && firstRoom.room_id < 5) {
                    this.seRoom = "standard";
                } else {
                    this.seRoom = "family";
                }

                const allDates = this.initialRooms.map((r) => r.date);
                allDates.sort(function (a, b) {
                    return new parseISO(a) - format(parseISO(b), "yyyy-MM-dd");
                });

                this.startDate = allDates[0];
                this.endDate = allDates[allDates.length - 1];
                console.log("This is start date: " + this.startDate);
                console.log("This is end date: " + this.endDate);
                this.getRoomsAvailableForPeriod().then(() => {
                    this.roomIds = this.initialRooms.map((v) => v.room_id);
                    this.roomIds = [...new Set(this.roomIds)];
                });

                console.log(allDates);
            }
        }

        this.$nextTick(() => {
            window.addEventListener("resize", this.onResize);
        });
        this.onResize();
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.onResize);
    },
};
</script>

<style>
.show-from-top-enter-active,
.show-from-top-leave-active {
    transition: transform 100ms, opacity 100ms;
}
.show-from-top-enter,
.show-from-top-leave-to {
    opacity: 0;
    transform: translateX(20px);
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
