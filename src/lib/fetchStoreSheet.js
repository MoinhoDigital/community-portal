import currency from "currency.js";

const localStorageKey = `@moinho/cobuy`;

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}


const fetchGoogle = async (id) => {
  const googleUrl = `https://spreadsheets.google.com/feeds/cells/${id}/1/public/full?alt=json`;
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${id}`;
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
    const splitPaymentDate = obj[7][2].split("/");
    const splitStart = splitDate[0].split("/");
    const splitEnd = splitDate[1].split("/");
    const currentYear = new Date().getFullYear();
    const currentDate = new Date();
    const tomorrow = currentDate.addDays(1)
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
    const paymentEnd = new Date(
      currentYear,
      parseInt(splitPaymentDate[1]) - 1,
      parseInt(splitPaymentDate[0])
    );
    const BRL = (value) =>
      currency(value, { symbol: "R$", decimal: ",", separator: "." });
    const pricePerLotWithoutFee = BRL(obj[8][2]);
    const pricePerLot = pricePerLotWithoutFee.add(
      pricePerLotWithoutFee.divide(10)
    );
    const open = currentDate <= endDate;
    const openPayment = tomorrow < paymentEnd;
    let tracking = []
    let index = 2
    while (index > 0) {
      const trackingNumber = obj[12][index]
      if (trackingNumber) {
        index++
        tracking.push(trackingNumber)
      }
      else index = 0
    }

    let participants = [];
    for (let index = 17; index < Object.keys(obj).length + 2; index++) {
      const amount = obj[index][2].replace(/,/g, "");
      participants.push({
        name: obj[index][1],
        quantity: obj[index][2],
        shipping: obj[index][5],
        payed: obj[index][6] === "TRUE" ? true : false,
        dueAmount: pricePerLot.multiply(amount),
        received: obj[index][7] === "TRUE" ? true : false
      });
    }
    participants
    .sort((a, b) => {
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
    })
    .sort((a, b) => (b.payed ? 1 : -1))
    .sort((a, b) => (b.received ? 1 : -1))

    const percentReceived = participants.reduce((prev, curr) => {
      if (curr.received) return prev + 100 / participants.length
      else return prev
    }, 0)
    const getStage = () => {
      if (open) return 1;
      else if (openPayment) return 2;
      else if (!openPayment && tracking.length < 1) return 3
      else if (tracking.length > 0 && percentReceived > 1 && percentReceived < 100) return 4
      return 0;
    };
    let organizers = []
    for (let index = 2; index < Object.keys(obj[2]).length + 1; index++) {
      if (obj[2][index]) {
        const splitContact = obj[2][index].split(':')
        organizers.push({
          name: splitContact[0],
          contact: splitContact[1].replace(/\s/g, '')
        })
      }
    }
    return {
      tracking,
      distributionHub: obj[13][2],
      percentReceived,
      sheetUrl: sheetUrl,
      organizers,
      // orgnizerFee: obj[4][2],
      name: obj[4][2],
      link: obj[10][2],
      image: obj[11][2],
      seller: obj[5][2],
      startDate,
      endDate,
      paymentEnd,
      stage: getStage(),
      open,
      pricePerLotWithoutFee,
      pricePerLot,
      bankDetails: obj[9][2],
      participants,
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
