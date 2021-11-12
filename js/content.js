var _currentPlace = window.location.toString();

const getRandomRange = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

class Bot {
  doc = null;
  constructor(doc) {
    this.doc = doc ?? document;
  }

  getListElement(className) {
    return this.doc.getElementsByClassName(className);
  }

  getElement(id) {
    return this.doc.getElementById(id);
  }

  getRandomElement(listElement) {
    return listElement[getRandomRange(0, listElement.length)];
  }

  async scrollToElement(element) {
    if (element)
      try {
        await wait(getRandomRange(2500, 4500));
        await element.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      } catch (error) {
        console.log(error);
      }
  }

  async clickElement(element) {
    if (element)
      try {
        await wait(getRandomRange(2500, 4500));
        await element.click();
      } catch (error) {
        console.log(error);
      }
  }

  async viewlistImg(count) {
    var i = getRandomRange(0, 10);
    if (i % 2 == 0) {
      let img = this.getElement("icImg");
      await this.scrollToElement(img);

      await wait(2000);
      let btnNext = this.getListElement("next-arr navigation-image-arr");
      await this.clickElement(btnNext[0]);

      await wait(2000);
      let img1 = this.getElement("icImg");
      await this.clickElement(img1);

      await wait(2000);
      let btnNext1 = this.getListElement(
        "pntrArr pntrArrNext pntrArrImg activeNext"
      );
      await this.clickElement(btnNext1[0]);
      await wait(2000);
      await this.clickElement(btnNext1[0]);
      await wait(2000);
      await this.clickElement(btnNext1[0]);

      await wait(2000);
      let btnClose = this.getListElement("vi_pl_cls_btn");
      await this.clickElement(btnClose[0]);
    } else {
      let btnPrev = this.getListElement("prev-arr navigation-image-arr");
      await this.clickElement(btnPrev[0]);
    }
    count++;
    if (count < 5) this.viewlistImg(count);
    else window.location.href = "https://www.ebay.com/";
  }

  async viewlistImg2(count) {
    let listPrice = this.getListElement("price");
    let price = this.getRandomElement(listPrice);
    await wait(1000);
    await this.clickElement(price);
    let listImg = this.getListElement("app-filmstrip__image cc-image");
    let img = this.getRandomElement(listImg);
    await wait(1000);
    await this.scrollToElement(img);
    await wait(1000);
    await this.clickElement(img);
    count++;
    let i = getRandomRange(1, 10);
    if (count < 5) this.viewlistImg2(count);
    else if (i % 2 == 0) {
      let listings = this.getListElement("url");
      let product = this.getRandomElement(listings);
      await wait(1000);
      await this.scrollToElement(product);
      await wait(1000);
      await this.clickElement(product);
    } else window.location.href = "https://www.ebay.com/";
  }

  async search(key) {
    let input = this.getElement("gh-ac");
    input.value = key;
    let btnSearch = this.getElement("gh-btn");
    await this.clickElement(btnSearch);
  }

  async chooseResultSearch() {
    let listProduct = this.getListElement("s-item__image-img");
    let product = this.getRandomElement(listProduct);
    await wait(2000);
    await this.scrollToElement(product);
    await wait(2000);
    await this.clickElement(product);
  }

  async chooseCategory() {
    let shopByCategory = this.getListElement("b-guidancecard__link");
    let elem = this.getRandomElement(shopByCategory);
    await wait(2000);
    await this.scrollToElement(elem);
    await wait(2000);
    await this.clickElement(elem);
    let listProduct = this.getListElement("s-item__title");
    await wait(2000);
    if (listProduct.length > 0) {
      let product = this.getRandomElement(listProduct);
      await wait(2000);
      await this.scrollToElement(product);
      await wait(2000);
      await this.clickElement(product);
    } else window.location.href = "https://www.ebay.com/";
  }

  async allCategory() {
    let listTitle = this.getListElement("cat-url");
    let title = this.getRandomElement(listTitle);
    console.log(title);
    await wait(1000);
    await this.scrollToElement(title);
    await wait(1000);
    await this.clickElement(title);
  }

  async th1() {
    await wait(10000);
    let listProduct = this.getListElement("hl-item__link");
    let product = this.getRandomElement(listProduct);
    await this.scrollToElement(product).then(() => this.clickElement(product));
  }

  async th2() {
    await wait(10000);
    let btnCategory = this.getElement("gh-shop-a");
    await this.clickElement(btnCategory);
    let listCategory = this.getListElement("scnd");
    await wait(2000);
    let category = this.getRandomElement(listCategory);
    await this.clickElement(category);
  }
}

// if (_currentPlace == "https://www.ebay.com/") {
//   let key = sessionStorage.getItem("keyWord");
//   if (key != "") {
//     console.log(key);
//     const bot = new Bot();
//     bot.search(key);
//   }
// }

if (_currentPlace == "https://www.ebay.com/") {
  const bot = new Bot();
  let i = getRandomRange(1, 4);
  console.log(i);
  switch (i) {
    case 1:
      console.log("th1");
      bot.th1();
      break;
    case 2:
      console.log("th2");
      bot.th2();
      break;
    case 3:
      console.log("th3");
      let key = sessionStorage.getItem("keyWord");
      bot.search(key || "sale");
      break;
    default:
      break;
  }
}

if (_currentPlace.includes("/itm/")) {
  const bot = new Bot();
  bot.viewlistImg(0);
}

if (_currentPlace.includes("/p/")) {
  const bot = new Bot();
  bot.viewlistImg2(0);
}

if (_currentPlace.includes("/b/")) {
  const bot = new Bot();
  bot.chooseCategory();
}

if (_currentPlace.includes("/sch/")) {
  const bot = new Bot();
  bot.chooseResultSearch();
}
if (_currentPlace.includes("/n/")) {
  const bot = new Bot();
  bot.allCategory();
}

chrome.runtime.onMessage.addListener(function (req, reder, sendRespone) {
  if (req.value) {
    const bot = new Bot();
    sessionStorage.setItem("keyWord", req.value);
    bot.search(req.value);
  }
});
