export const nextBookings = (state, startingNextCount) => {
  const {
    shownRecords, storedRecords, startSearch, storedFiltered,
  } = state;
  let storeAllRecord = storedRecords;
  if (storedFiltered && storedFiltered.length > 0) {
    storeAllRecord = storedFiltered;
  }
  startingNextCount = 0;
  if (shownRecords && shownRecords.length) {
    if (startSearch === false) {
      const id = shownRecords[shownRecords.length - 1].id;
      storeAllRecord.forEach((v, i) => {
        if (v.id === id) {
          startingNextCount = i + 1;
        }
      });
      if ((startingNextCount + 1) <= storeAllRecord.length) {
        return startingNextCount;
      }
    }
  }
};
export const previousBookings = (state, startingNextCount) => {
  const {
    shownRecords, storedRecords, startSearch, storedFiltered,
  } = state;
  let storeAllRecord = storedRecords;
  if (storedFiltered && storedFiltered.length > 0) {
    storeAllRecord = storedFiltered;
  }
  startingNextCount = 0;
  if (shownRecords && shownRecords.length) {
    if (startSearch === false) {
      const id = shownRecords[0].id;
      storeAllRecord.forEach((v, i) => {
        if (v.id === id) {
          startingNextCount = i - 10;
        }
      });
      if (startingNextCount >= 0) {
        return startingNextCount;
      }
      return -1;
    }
  }
  return -1;
};

export const startRecord = (state, startingNextCountParam) => {
  const { storedFiltered } = state;
  let startingNextCount = startingNextCountParam;
  let storeAllRecord = state.shownRecords;
  if (storedFiltered && storedFiltered.length > 0) {
    storeAllRecord = storedFiltered;
  }
  if (state.startSearch === false) {
    if (storeAllRecord.length === 0) {
      startingNextCount = 0;
      return startingNextCount;
    }

    return (startingNextCount === 0 && state.shownRecords.length === 0) ? startingNextCount = 0 : startingNextCount + 1;
  }

  return (startingNextCount === 0 && state.shownRecords.length === 0) ? startingNextCount = 0 : startingNextCount + 1;
};

export const endRecord = (state, startingNextCount) =>
  (startingNextCount === 1 ? state.shownRecords.length : startingNextCount + state.shownRecords.length);

export const totalRecords = (state) => {
  if (state && state.storedRecords) {
    return state.storedRecords.length;
  }
  return 0;
};

export const totalFilteredRecords = (state) => {
  if (state && state.storedFiltered) {
    return state.storedFiltered.length;
  }
  return 0;
};
