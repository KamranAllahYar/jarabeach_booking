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
    }else if (r.type == 'loft') {
      bigMax += 3;
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
  let smallPrice = 42000;
  let bigPrice = 60000;
  const bigVillaPrice = 100000;
  const bigLoftPrice = 60000;
  const smallLoftPrice = 42000;

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
        } else if(extra.room == 'loft'){
          if (extra.type == 'teen') {
            price += smallLoftPrice;
          } else {
            price += bigLoftPrice;
          }
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
  //console.log('ROoms', rooms)
  const roomTypes = rooms.map(r => {
    return r.type;
  });

  // const standardTotalMax = 4;
  // const familyTotalMax = 6;
  // const villaTotalMax = 6;

  const standardBigMax = 2;
  const familyBigMax = 5;
  const villaBigMax = 5;
  const loftBigMax = 5;

  const standardSmallMax = 1;
  const familySmallMax = 1;
  const villaSmallMax = 1;
  const loftSmallMax = 1;

  let totalBigMax = 0;
  let totalSmallMax = 0;

  let smallPeople = getters.smallPeople;
  let isStandardAndChildIsAvailable = false;
  roomTypes.forEach((type) => {
    if (type == 'standard') {
      if(getters.bigPeople === 2 && getters.noChild > 0 && rooms.length === 1) {
        isStandardAndChildIsAvailable = true;
      }
      totalBigMax += standardBigMax;
      totalSmallMax += standardSmallMax;
    } else if (type == 'family') {
      totalBigMax += familyBigMax;
      totalSmallMax += familySmallMax;
    } else if (type == 'villa') {
      totalBigMax += villaBigMax;
      totalSmallMax += villaSmallMax;
    } else if (type == 'loft') {
      totalBigMax += loftBigMax;
      totalSmallMax += loftSmallMax;
    }
  });

  if(isStandardAndChildIsAvailable){
    return false;
  }

  const bigDiff = totalBigMax - getters.bigPeople;
  if (bigDiff < 0) return false;

  totalSmallMax += bigDiff;
  // //console.log('Small People', getters.smallPeople);
  console.log(totalSmallMax);
  return smallPeople <= totalSmallMax;
}

const calcRoomPrice2 = function (getters, rooms) {
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

    if (nowRoom.type == 'loft') totalPeople -= 3;
    if (nowRoom.type == 'villa') totalPeople -= 3;
    if (nowRoom.type == 'family') totalPeople -= 3;
    if (nowRoom.type == 'standard') totalPeople -= 2;
    roomsLeft.splice(i, 1);
  }

  return roomPrices;
}

const calcRoomPrice = function (getters, rooms) {
  let totalPeople = getters.totalPeople;
  let nowSingles = false;

  let roomsLeft = rooms.map((room_id) => {
    return rooms.find((room) => room.room_id == room_id);
  });

  let roomPrices = 0;
  let totalAdults = getters.noAdults;
  let totalTeens = getters.noTeens;
  let totalSmall = getters.noChild - 1;
  let roomAdults = 0;
  let roomSmall = 0;

  for (let i = 0; i < rooms.length; i++) {
    const nowRoom = rooms[i];

    if (roomsLeft.length >= totalPeople) {
      nowSingles = true;
    } else {
      nowSingles = false;
    }


    if (nowRoom.type == 'loft') {
      roomAdults = 5;
      roomSmall = 1;
      // roomTotal = roomAdults + roomSmall
    }
    if (nowRoom.type == 'villa') {
      roomAdults = 5;
      roomSmall = 1;
      // roomTotal = roomAdults + roomSmall
    }
    if (nowRoom.type == 'family') {
      roomAdults = 5;
      roomSmall = 1;
      // roomTotal = roomAdults + roomSmall
    }
    if (nowRoom.type == 'standard') {
      roomAdults = 2;
      roomSmall = 1;
      // roomTotal = roomAdults + roomSmall
    }

    if (nowSingles) {
      if (totalAdults > 0) {
        roomPrices += nowRoom.single_price;
        totalAdults -= 1;
        totalPeople -= 1;
      } else if (totalTeens > 0) {
        roomPrices += (nowRoom.single_price) * 0.5;
        totalTeens -= 1;
        totalPeople -= 1;
      } else if (totalSmall > 0) {
        roomPrices += nowRoom.single_price * 0.25;
        totalSmall -= 1;
        totalSmall -= 1;
      }
    } else {
      if (totalAdults > 0) {
        roomPrices += nowRoom.price * Math.min(roomAdults, totalAdults);
        console.log(nowRoom.price * Math.min(roomAdults, totalAdults));
        totalAdults -= Math.min(roomAdults, totalAdults);
        totalPeople -= Math.min(roomAdults, totalAdults);
      }
      if (totalTeens > 0) {
        roomPrices += nowRoom.price * Math.min(roomAdults, totalTeens) * 0.5;
        console.log(nowRoom.price * Math.min(roomAdults, totalTeens) * 0.5);
        totalTeens -= Math.min(roomAdults, totalTeens);
        totalPeople -= roomAdults;
      }
      if (totalSmall > 0) {
        if (totalAdults > 0)  roomPrices += nowRoom.price * Math.min(roomsmall, totalSmall)  * 0.25;
        else roomPrices += nowRoom.price * Math.min(roomAdults, totalSmall)  * 0.25;
        totalSmall -= roomSmall;
        totalSmall -= roomSmall;
      }
    }

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
