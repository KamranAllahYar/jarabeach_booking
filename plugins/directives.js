import Vue from 'vue'

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
  el.clickOutsideEvent = function (event) {

      if (!(el == event.target || el.contains(event.target)) && (event.target.parentElement.parentElement !== el.parentElement || event.target.parentElement !== el.parentElement)) {
      vnode.context[binding.expression](event);
      }
  };
  document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
  document.body.removeEventListener('click', el.clickOutsideEvent)
  },
})
