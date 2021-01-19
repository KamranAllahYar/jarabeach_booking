import differenceInSeconds from 'date-fns/differenceInSeconds'
import parseISO from 'date-fns/parseISO'

export default function ({ store, redirect }) {
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

  if (seconds > 3600) { // 1 Hour
    store.commit("RESET_STORE");
    store.commit("extras/RESET_STORE");

    redirect("/");
  }

  store.commit("UPDATE_EXPIRY", new Date());
}
