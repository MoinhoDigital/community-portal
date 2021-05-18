import currency from 'currency.js'

const localStorageKey = `@moinho/cobuy`;

const fetchGoogle = async (id) => {
  const googleUrl = `https://spreadsheets.google.com/feeds/cells/${id}/1/public/full?alt=json`;
  const response = await fetch(googleUrl);
  const json = await response.json();
  function parseData(data) {
    const obj = data.reduce((prev, curr) => {
      let { row, col, inputValue } = curr.gs$cell;
      row = parseInt(row) - 1;
      col = parseInt(col);
      if (row === 0) return prev;
      if (prev[row]) {
        const newRow = { ...prev[row], [col]: inputValue };
        const newData = {
          ...prev,
          [row]: newRow,
        };
        return newData;
      } else {
        const newRow = { [row]: { [col]: inputValue } };
        const newData = {
          ...prev,
          ...newRow,
        };
        return newData;
      }
    }, {});
    const splitDate = obj[6][2].split("-");
    const splitStart = splitDate[0].split("/");
    const splitEnd = splitDate[1].split("/");
    const currentYear = new Date().getFullYear();
    const currentDate = new Date();
    const startDate = new Date(
      currentYear,
      parseInt(splitStart[1]) - 1,
      parseInt(splitStart[0]) + 1
    );
    const endDate = new Date(
      currentYear,
      parseInt(splitEnd[1]) - 1,
      parseInt(splitEnd[0]) + 1
    );
    const BRL = value => currency(value, { symbol: 'R$', decimal: ',', separator: '.' });
    const pricePerLotWithoutFee = BRL(obj[7][2]);
    const pricePerLot = pricePerLotWithoutFee.add((pricePerLotWithoutFee.divide(10)))

    let participants = []
    for (let index = 13; index < Object.keys(obj).length + 2; index++) {
      const amount = obj[index][2].replace(/,/g, '')
      participants.push({
        name: obj[index][1],
        quantity: obj[index][2],
        shipping: obj[index][5],
        payed: obj[index][6] === 'TRUE' ? true : false,
        dueAmount: pricePerLot.multiply(amount)
      })
    }
    participants.sort((a,b) =>  b.payed ? 1 : -1)
    return {
      organizers: obj[2][2],
      // orgnizerFee: obj[4][2],
      name: obj[4][2],
      link: obj[9][2],
      image: obj[10][2],
      seller: obj[6][2],
      startDate,
      endDate,
      stage: 2,
      open: currentDate <= endDate,
      pricePerLotWithoutFee,
      pricePerLot,
      bankDetails: obj[8][2],
      participants
    };
  }
  const finalData = parseData(json.feed.entry);
  return finalData;
};

const store = (data) =>
  window.localStorage.setItem(localStorageKey, JSON.stringify(data));

export const getStore = async () => {
  try {
    const res = window.localStorage.getItem(localStorageKey);
    const json = JSON.parse(res);
    return json;
  } catch (err) {
    return err;
  }
};

const fetchStore = async (sheet) => {
  try {
    const data = await fetchGoogle(sheet);
    await store(data);
    return data;
  } catch (err) {
    return err;
  }
};

export default fetchStore;
