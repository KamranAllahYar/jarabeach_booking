<template>
    <div class="flex">
        <div>
            <div class="flex items-center justify-between mb-4">
                <div class="text-2xl font-bold">
                    {{ months[calMonth-1] }}
                    <span class="font-light">{{calYear}}</span>
                </div>

                <div>
                    <button class="px-4 text-white bg-blue-500" @click="prevMonth()">
                        <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                    <button class="px-4 text-white bg-blue-500" @click="nextMonth()">
                        <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-7 gap-2 mb-2">
                <div v-for="w in weekDays" :key="w" class="flex items-center justify-center w-12 h-8 text-white bg-green-500">
                    {{ w }}
                </div>
            </div>

            <div class="grid grid-cols-7 gap-2">
                <div v-for="day in daysInMonth" :key="day"
                    class="flex items-center justify-center w-12 h-12 text-black bg-green-200 rounded-md"
                    :class="day == 1 ? `col-start-${firstWeekDay}` : ''">
                    {{ day }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import getDay from "date-fns/getDay";

export default {
    data() {
        return {
            calMonth: new Date().getMonth() + 1,
            calYear: new Date().getFullYear(),
            weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            months: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ],
        };
    },
    computed: {
        daysInMonth() {
            return new Date(this.calYear, this.calMonth, 0).getDate();
        },
        dayMonth() {
            return new Date(this.calYear, this.calMonth, 0);
        },
        firstWeekDay() {
            return getDay(new Date(this.calYear, this.calMonth - 1, 1)) + 1;
        },
    },
    methods: {
        nextMonth() {
            if (this.calMonth == 12) {
                this.calMonth = 1;
                this.calYear++;
                return;
            }

            this.calMonth++;
        },
        prevMonth() {
            if (this.calMonth == 1) {
                this.calMonth = 12;
                this.calYear--;
            }
            this.calMonth--;
        },
    },
};
</script>
