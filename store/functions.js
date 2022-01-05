const calcExtraPeople = function (rooms, getters) {
  let bigMax = 0;
  let smallMax = 0;

  rooms.map((r) => {
    // const r = state.roomsData.find(r => r.id == roomid);
    if (r.type == 'standard') {
      bigMax += 2;
      smallMax += 1;
    } else if (r.type == 'family') {
      bigMax += 3;
      smallMax += 2;
    } else if (r.type == 'villa') {
      bigMax += 2;
      smallMax += 2;
    }
  });

  const noTeens = getters.noTeens;

  let totalBig = Math.max(getters.bigPeople - bigMax, 0);
  const totalSmall = Math.max(getters.smallPeople - smallMax, 0);

  let totalTeen = 0;

  if (totalBig >= noTeens) {
    totalBig -= noTeens;
    totalTeen = noTeens;
  } else {
    totalTeen = totalBig;
    totalBig = 0;
  }

  return {
    big: Math.max(totalBig, 0),
    teen: totalTeen,
    small: totalSmall,
    total: totalBig + totalSmall + totalTeen,
  }
}

const calcExtraPeoplePrice = function (getters, rooms) {
  let price = 0;
  let smallPrice = 35000;
  let bigPrice = 50000;
  const bigVillaPrice = 100000;

  const extraPeople = calcExtraPeople(rooms, getters);

  const bigPeople = extraPeople.big;
  const teenPeople = extraPeople.teen;
  const smallPeople = extraPeople.small;
  const totalPeople = extraPeople.total;

  if (totalPeople <= 0) return 0;

  const roomFit = getters.extraPeopleRoomFit;

  if (getters.hasVillaMixed) {
    const customExtras = getters.customVillaExtras;
    if (customExtras.length > 0) {
      for (let i = 0; i < customExtras.length; i++) {
        const extra = customExtras[i];

        if (extra.room == 'villa') {
          price += bigVillaPrice;
        } else {
          if (extra.type == 'teen') {
            price += smallPrice;
          } else {
            price += bigPrice;
          }
        }
      }

      return price // * +getters.totalNights;
    }
  }

  if (roomFit.villa > 0) {
    return bigVillaPrice * totalPeople// * +getters.totalNights;
  }

  price += (bigPeople * bigPrice);
  price += (teenPeople * smallPrice);
  price += (smallPeople * smallPrice);

  return price // * +getters.totalNights;
}

const calcRoomLimit = function (getters, rooms) {
  const roomTypes = rooms.map(r => {
    return r.type;
  });

  // const standardTotalMax = 4;
  // const familyTotalMax = 6;
  // const villaTotalMax = 6;

  const standardBigMax = 2;
  const familyBigMax = 5;
  const villaBigMax = 4;

  const standardSmallMax = 2;
  const familySmallMax = 2;
  const villaSmallMax = 2;

  let totalBigMax = 0;
  let totalSmallMax = 0;

  roomTypes.forEach((type) => {
    if (type == 'standard') {
      totalBigMax += standardBigMax;
      totalSmallMax += standardSmallMax;
    } else if (type == 'family') {
      totalBigMax += familyBigMax;
      totalSmallMax += familySmallMax;
    } else if (type == 'villa') {
      totalBigMax += villaBigMax;
      totalSmallMax += villaSmallMax;
    }
  });

  const bigDiff = totalBigMax - getters.bigPeople;
  if (bigDiff < 0) return false;

  totalSmallMax += bigDiff;

  return getters.smallPeople <= totalSmallMax;
}

const calcRoomPrice = function (getters, rooms) {
  let totalPeople = getters.totalPeople;
  let nowSingles = false;

  let roomsLeft = rooms.map((room_id) => {
    return rooms.find((room) => room.room_id == room_id);
  });

  let roomPrices = 0;
  for (let i = 0; i < rooms.length; i++) {
    const nowRoom = rooms[i];

    if (roomsLeft.length >= totalPeople) {
      nowSingles = true;
    } else {
      nowSingles = false;
    }

    if (nowSingles) {
      roomPrices += nowRoom.single_price;
    } else {
      roomPrices += nowRoom.price;
    }

    if (nowRoom.type == 'villa') totalPeople -= 3;
    if (nowRoom.type == 'family') totalPeople -= 3;
    if (nowRoom.type == 'standard') totalPeople -= 2;
    roomsLeft.splice(i, 1);
  }

  return roomPrices;
}

export {
  calcExtraPeople,
  calcExtraPeoplePrice,
  calcRoomLimit,
  calcRoomPrice,
}
