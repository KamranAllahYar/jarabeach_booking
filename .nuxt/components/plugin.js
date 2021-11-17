import Vue from 'vue'
import { wrapFunctional } from './index'

const components = {
  SpecialLookout: () => import('../../components/extras/lookout/SpecialLookout.vue' /* webpackChunkName: "components/special-lookout" */).then(c => wrapFunctional(c.default || c)),
  SpecialLookoutMeal: () => import('../../components/extras/lookout/SpecialLookoutMeal.vue' /* webpackChunkName: "components/special-lookout-meal" */).then(c => wrapFunctional(c.default || c)),
  SpecialDomesticStaff: () => import('../../components/extras/domesticstaff/SpecialDomesticStaff.vue' /* webpackChunkName: "components/special-domestic-staff" */).then(c => wrapFunctional(c.default || c)),
  SpecialDomesticStaffInfo: () => import('../../components/extras/domesticstaff/SpecialDomesticStaffInfo.vue' /* webpackChunkName: "components/special-domestic-staff-info" */).then(c => wrapFunctional(c.default || c)),
  SpecialBikes: () => import('../../components/extras/SpecialBikes.vue' /* webpackChunkName: "components/special-bikes" */).then(c => wrapFunctional(c.default || c)),
  SpecialCake: () => import('../../components/extras/SpecialCake.vue' /* webpackChunkName: "components/special-cake" */).then(c => wrapFunctional(c.default || c)),
  SpecialDrinkCollection: () => import('../../components/extras/SpecialDrinkCollection.vue' /* webpackChunkName: "components/special-drink-collection" */).then(c => wrapFunctional(c.default || c)),
  SpecialMassage: () => import('../../components/extras/SpecialMassage.vue' /* webpackChunkName: "components/special-massage" */).then(c => wrapFunctional(c.default || c)),
  SpecialMassagesMultiple: () => import('../../components/extras/SpecialMassagesMultiple.vue' /* webpackChunkName: "components/special-massages-multiple" */).then(c => wrapFunctional(c.default || c)),
  SpecialNewMassage: () => import('../../components/extras/SpecialNewMassage.vue' /* webpackChunkName: "components/special-new-massage" */).then(c => wrapFunctional(c.default || c)),
  SpecialPhotoshoot: () => import('../../components/extras/SpecialPhotoshoot.vue' /* webpackChunkName: "components/special-photoshoot" */).then(c => wrapFunctional(c.default || c)),
  SpecialQuadBikes: () => import('../../components/extras/SpecialQuadBikes.vue' /* webpackChunkName: "components/special-quad-bikes" */).then(c => wrapFunctional(c.default || c)),
  SpecialRoomDecoration: () => import('../../components/extras/SpecialRoomDecoration.vue' /* webpackChunkName: "components/special-room-decoration" */).then(c => wrapFunctional(c.default || c)),
  SpecialUnforgettableExperience: () => import('../../components/extras/SpecialUnforgettableExperience.vue' /* webpackChunkName: "components/special-unforgettable-experience" */).then(c => wrapFunctional(c.default || c)),
  ExtrasLayout: () => import('../../components/global/ExtrasLayout.vue' /* webpackChunkName: "components/extras-layout" */).then(c => wrapFunctional(c.default || c)),
  Loading: () => import('../../components/global/Loading.vue' /* webpackChunkName: "components/loading" */).then(c => wrapFunctional(c.default || c)),
  MainButton: () => import('../../components/global/MainButton.vue' /* webpackChunkName: "components/main-button" */).then(c => wrapFunctional(c.default || c)),
  Navbar: () => import('../../components/global/Navbar.vue' /* webpackChunkName: "components/navbar" */).then(c => wrapFunctional(c.default || c)),
  Notification: () => import('../../components/global/Notification.vue' /* webpackChunkName: "components/notification" */).then(c => wrapFunctional(c.default || c)),
  ProgressNav: () => import('../../components/global/ProgressNav.vue' /* webpackChunkName: "components/progress-nav" */).then(c => wrapFunctional(c.default || c)),
  StartOverButton: () => import('../../components/global/StartOverButton.vue' /* webpackChunkName: "components/start-over-button" */).then(c => wrapFunctional(c.default || c)),
  TopProgressBar: () => import('../../components/global/TopProgressBar.vue' /* webpackChunkName: "components/top-progress-bar" */).then(c => wrapFunctional(c.default || c)),
  UpdateBookingBanner: () => import('../../components/global/UpdateBookingBanner.vue' /* webpackChunkName: "components/update-booking-banner" */).then(c => wrapFunctional(c.default || c)),
  Calendar: () => import('../../components/Calendar.vue' /* webpackChunkName: "components/calendar" */).then(c => wrapFunctional(c.default || c)),
  Logo: () => import('../../components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c)),
  NewRoomCalendar: () => import('../../components/NewRoomCalendar.vue' /* webpackChunkName: "components/new-room-calendar" */).then(c => wrapFunctional(c.default || c)),
  ReservationBox: () => import('../../components/ReservationBox.vue' /* webpackChunkName: "components/reservation-box" */).then(c => wrapFunctional(c.default || c)),
  RoomCalendar: () => import('../../components/RoomCalendar.vue' /* webpackChunkName: "components/room-calendar" */).then(c => wrapFunctional(c.default || c)),
  RoomSelect: () => import('../../components/RoomSelect.vue' /* webpackChunkName: "components/room-select" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
