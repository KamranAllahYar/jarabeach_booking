import Vue from 'vue'

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
  el.clickOutsideEvent = function (event) {
    if (event.target.parentElement
        && !(el == event.target || el.contains(event.target))
        && !(el == event.target || el.contains(event.target))
        && !(event.target.classList.contains("bg-cal-non-avail") || event.target.parentElement.classList.contains("bg-cal-non-avail"))
        && !(el.parentElement.children[0].contains(event.target))) {
      vnode.context[binding.expression](event);
    }
  };
  document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
  document.body.removeEventListener('click', el.clickOutsideEvent)
  },
})
