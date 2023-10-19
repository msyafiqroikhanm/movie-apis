const XLSX = require('xlsx');
const { Customers, Ratings, Reviews } = require('../models');

const importService = async (file) => {
  const workbook = XLSX.readFile(`./public/${file.filename}`);
  const sheet = workbook.SheetNames[0];
  console.log(sheet);
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

  //   console.log(data);
  //* Filter data from excel
  const registrator = [];
  for (let i = 0; i < data.length; i++) {
    const element = data[i];

    const form_ratings = [];
    const reviews = await Reviews.findAll({ where: { HotelID: element.hotel } });
    const UID = getRandomTimeByDate(new Date(element.post_time));
    if (reviews.length) {
      for (let i = 0; i < reviews.length; i++) {
        const review = reviews[i];

        form_ratings.push({
          HotID: element.hotel,
          RevID: review.RevID,
          Rating: generateRandomNumber(),
          PostingDate: new Date(),
          CreateDate: new Date(),
          UID,
        });
      }
      form_ratings.push({
        HotID: element.hotel,
        RevID: 1000 + Number(element.hotel),
        Rating: generateRandomNumber(),
        PostingDate: new Date(),
        CreateDate: new Date(),
        UID,
      });

      const customer = await Customers.findOne({
        where: { UID },
      });
      if (!customer) {
        //   console.log(reviews);
        console.log(form_ratings);
        await Customers.create({
          UID,
          PostingDate: element.post_time,
          Email: element.email,
          Name: element.name,
          Phone: element.phonenbr,
          Notes: element.note,
          CreateDate: new Date(),
        });
        await Ratings.bulkCreate(form_ratings);
      } else {
        console.log({ double: true });
      }
    }
  }
  return file;
};

const generateRandomNumber = () => {
  const randomNumber = Math.random(); // Menghasilkan angka desimal acak antara 0 dan 1
  if (randomNumber < 0.8) {
    // 60% kemungkinan
    // Menghasilkan angka 3, 4, atau 5
    return Math.floor(Math.random() * 3) + 3;
  } else {
    // Menghasilkan angka 1 atau 2
    return Math.floor(Math.random() * 2) + 1;
  }
};

function getRandomTimeByDate(inputDate) {
  if (!(inputDate instanceof Date)) {
    return null;
  }

  const randomHour = Math.floor(Math.random() * 24);
  const randomMinute = Math.floor(Math.random() * 60);
  const randomSecond = Math.floor(Math.random() * 60);

  const randomTime = new Date(inputDate);
  randomTime.setHours(randomHour);
  randomTime.setMinutes(randomMinute);
  randomTime.setSeconds(randomSecond);

  return randomTime.valueOf() / 1000;
}

module.exports = { importService };
