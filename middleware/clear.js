import differenceInSeconds from 'date-fns/differenceInSeconds'
import parseISO from 'date-fns/parseISO'

export default function ({ store, redirect, route }) {
  let lastUpdate = store.state.lastUpdate;

  if (!(lastUpdate instanceof Date)) {
    lastUpdate = parseISO(lastUpdate);
  }

  if (lastUpdate == null) {
    store.commit("UPDATE_EXPIRY", new Date());
    return;
  }

  const seconds = differenceInSeconds(
    new Date(),
    lastUpdate,
  )

  console.log("Update expiry");
  console.log(lastUpdate);
  console.log(new Date());
  console.log(seconds);

  if (seconds > 60 * 60) { // 60minutes
    store.commit("RESET_STORE");
    store.commit("extras/RESET_STORE");

    if (route.path != "/") {
      redirect("/");
      setTimeout(() => {
        location.reload();
      }, 500);
    }
  }

  store.commit("UPDATE_EXPIRY", new Date());
}
