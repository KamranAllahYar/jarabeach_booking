<template>
    <div :to="to" class="flex items-center justify-center h-16 w-44 prog" :class="[classesName, hoverClass]">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        to: {
            type: String,
            default: "/",
        },
        first: {
            type: Boolean,
            default: false,
        },
        last: {
            type: Boolean,
            default: false,
        },
        done: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        current() {
            return this.$route.path.includes(this.to);
        },
        hoverClass() {},
        classesName() {
            if (this.current) {
                if (this.last) return "p-lb-e font-bold text-brand-blue";
                else if (this.first) return "p-lb-s font-bold text-brand-blue";
                else if (!this.first) return "p-lb-m font-bold text-brand-blue";
            }

            if (!this.done) {
                if (this.last) return "p-w-e text-gray-400 cursor-default";
                else if (this.first) return "p-w-s text-gray-400 cursor-default";
                else if (!this.first) return "p-w-m text-gray-400 cursor-default";
            } else if (this.done) {
                if (this.last) return "p-b-e text-white";
                else if (this.first) return "p-b-s text-white";
                else if (!this.first) return "p-b-m text-white";
            }
        },
    },
};
</script>

<style >
.prog {
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
}
.p-lb-s {
    background-image: url("~assets/images/progress/m-progress-light-blue-start.png");
}
.p-lb-m {
    background-image: url("~assets/images/progress/m-progress-light-blue-mid.png");
}
.p-lb-e {
    background-image: url("~assets/images/progress/m-progress-light-blue-end.png");
}
.p-w-s {
    background-image: url("~assets/images/progress/m-progress-white-start.png");
}
.p-w-m {
    background-image: url("~assets/images/progress/m-progress-white-mid.png");
}
.p-w-e {
    background-image: url("~assets/images/progress/m-progress-white-end.png");
}
.p-b-s {
    background-image: url("~assets/images/progress/m-progress-blue-start.png");
}
.p-b-m {
    background-image: url("~assets/images/progress/m-progress-blue-mid.png");
}
.p-b-e {
    background-image: url("~assets/images/progress/m-progress-blue-end.png");
}

@media (min-width: 768px) {
    .p-lb-s {
        background-image: url("~assets/images/progress/progress-light-blue-start.png");
    }
    .p-lb-m {
        background-image: url("~assets/images/progress/progress-light-blue-mid.png");
    }
    .p-lb-e {
        background-image: url("~assets/images/progress/progress-light-blue-end.png");
    }
    .p-w-s {
        background-image: url("~assets/images/progress/progress-white-start.png");
    }
    .p-w-m {
        background-image: url("~assets/images/progress/progress-white-mid.png");
    }
    .p-w-e {
        background-image: url("~assets/images/progress/progress-white-end.png");
    }
    .p-b-s {
        background-image: url("~assets/images/progress/progress-blue-start.png");
    }
    .p-b-m {
        background-image: url("~assets/images/progress/progress-blue-mid.png");
    }
    .p-b-e {
        background-image: url("~assets/images/progress/progress-blue-end.png");
    }
}
</style>
