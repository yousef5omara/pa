
let mood = "createing";

let baarinp = document.getElementById("barinp");

let tmp;

let type = document.getElementById("type");



let itemscount = document.getElementById("itemscount");


let title = document.getElementById("title");

let adad = document.getElementById("adad");

let price = document.getElementById("price");

let ads = document.getElementById("ads");

let express = document.getElementById("express");

let discount = document.getElementById("discount");

let tspan = document.getElementsByTagName("span")[0];

let create = document.getElementById("create");

let search = document.getElementById("search");


let tbody = document.getElementById("tbody");

//totale function

function theTotal() {
    if (price.value != "") {
        let total = (+price.value + +ads.value + +express.value) - +discount.value;
        tspan.innerHTML = total;
    }
    else {
        tspan.innerHTML = "";
    }
}

//create data

let products;
if (localStorage.productss != null) {
    products = JSON.parse(localStorage.productss);
} else {
    products = [];
}

create.onclick = function () {
    let newproduct = {
        name: title.value.toLowerCase(),
        barcode: baarinp.value,
        type: type.value,
        price: price.value,
        total: tspan.innerHTML,
        adad: adad.value,
        ads: ads.value,
        express: express.value,
        discount: discount.value,
    };


    if (mood == "createing") {
        if (newproduct.adad > 1) {
            for (let i = 0; i < newproduct.adad; i++) {
                products.push(newproduct);
            }
        } else {
            products.push(newproduct);
        };

    }
    else {
        products[tmp] = newproduct;
        mood = "createing";
        create.innerHTML = "إضافه";
        adad.style.opacity = "1";
    }




    localStorage.setItem("productss", JSON.stringify(products));

    showdata();

    clearinputs();
}

//show data

function showdata() {
    let table = "";
    for (let i = 0; i < products.length; i++) {
        // تحقق مما إذا كان العنصر موجودًا وليس null أو undefined
        if (products[i] && products[i].name) {
            table += `<tr>
                        <td>${i}</td>
                        <td>${products[i].name}</td>
                        <td>${products[i].barcode}</td>
                        <td>${products[i].type}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].ads}</td>
                        <td>${products[i].express}</td>
                        <td>${products[i].discount}</td>
                        <td>${products[i].total}</td>
                        <td><button id="update" onclick="updatedata(${i})">تعديل</button></td>
                        <td><button id="del" onclick="delitem(${i})">بيع</button></td>
                    </tr>`;
        }
    }

    tbody.innerHTML = table;

    let delall = document.getElementById("delall");
    if (products.length > 0) {
        delall.innerHTML = `<button id="btn1" onclick="deleteall()">حذف الكل (${products.length})</button>`;
    } else {
        delall.innerHTML = ``;
    }
}
showdata();
function clearinputs() {

    title.value = "";
    baarinp.value = "";
    type.value = "";
    price.value = "";
    tspan.innerHTML = "";
    ads.value = "";
    express.value = "";
    discount.value = "";
    adad.value = "";

}

showdata();

// delete data
function delitem(i) {
    products.splice(i, 1);
    localStorage.productss = JSON.stringify(products);
    showdata()

    let delall = document.getElementById("delall");
    if (products.length > 0) {


        delall.innerHTML = `<button id = "btn1" onclick = "deleteall()">حذف الكل (${products.length})</button>`;
    } else {
        delall.innerHTML = ``;
    }
    showdata();
}





function deleteall() {

    localStorage.clear();
    products.splice(0);
    showdata();
    setTimeout(() => { window.alert("تم الحذف بنجاح") }, 100);


}

//updatedata
function updatedata(i) {
    title.value = products[i].name;
    barinp.value = products[i].barcode;
    type.value = products[i].type;
    price.value = products[i].price;
    tspan.innerHTML = products[i].total;
    ads.value = products[i].ads;
    express.value = products[i].express;
    discount.value = products[i].discount;
    adad.style.opacity = "0";
    create.innerHTML = "تعديل";
    mood = "updateing";
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
};

showdata();

//search

let searchmood = "title";

function getsrmood(id) {
    if (id == "bytitle") {
        searchmood = "title";
        search.placeholder = "البحث بالإسم";

    } else if (id == "bytype") {
        searchmood = "type";
        search.placeholder = "البحث بالنوع";
    } else {
        searchmood = "barcode";
        search.placeholder = "البحث بالباركود";
    }
    search.focus();


}

function searching(value) {
    let table = ``;
    if (searchmood == "title") {

        for (let i = 0; i < products.length; i++) {
            if (products[i].name.includes(value.toLowerCase())) {

                table += `<tr>
                        <td>${i}</td>
                        <td>${products[i].name}</td>
                        <td>${products[i].barcode}</td>
                        <td>${products[i].type}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].ads}</td>
                        <td>${products[i].express}</td>
                        <td>${products[i].discount}</td>
                        <td>${products[i].total}</td>
                        <td><button id="update" onclick="updatedata(${i})">تعديل</button></td>
                        <td><button id="del" onclick="delitem(${i})">بيع</button></td>
                    </tr>`;

                let newa = products.filter(e => e.name.includes(value))
                let n = newa.length
                itemscount.innerHTML = `(${n})`;

            }

        }

    } else if (searchmood == "type") {


        for (let i = 0; i < products.length; i++) {
            if (products[i].type.includes(value.toLowerCase())) {

                table += `<tr>
                        <td>${i}</td>
                        <td>${products[i].name}</td>
                        <td>${products[i].barcode}</td>
                        <td>${products[i].type}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].ads}</td>
                        <td>${products[i].express}</td>
                        <td>${products[i].discount}</td>
                        <td>${products[i].total}</td>
                        <td><button id="update" onclick="updatedata(${i})">تعديل</button></td>
                        <td><button id="del" onclick="delitem(${i})">بيع</button></td>
                    </tr>`;

                let newa = products.filter(e => e.type.includes(value))
                let n = newa.length
                itemscount.innerHTML = `(${n})`;

            }

        }
    } else {
        for (let i = 0; i < products.length; i++) {
            if (products[i].barcode.includes(value.toLowerCase())) {

                table += `<tr>
                        <td>${i}</td>
                        <td>${products[i].name}</td>
                        <td>${products[i].barcode}</td>
                        <td>${products[i].type}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].ads}</td>
                        <td>${products[i].express}</td>
                        <td>${products[i].discount}</td>
                        <td>${products[i].total}</td>
                        <td><button id="update" onclick="updatedata(${i})">تعديل</button></td>
                        <td><button id="del" onclick="delitem(${i})">بيع</button></td>
                    </tr>`;

                let newa = products.filter(e => e.barcode.includes(value))
                let n = newa.length
                itemscount.innerHTML = `(${n})`;

            }

        }

    }









    tbody.innerHTML = table;

}












function searchByBarcode(barcode) {
    let table = "";
    let matchedProducts = products.filter(product => product.barcode.includes(barcode));

    for (let i = 0; i < matchedProducts.length; i++) {
        table += `<tr>
                    <td>${i}</td>
                    <td>${matchedProducts[i].name}</td>
                    <td>${matchedProducts[i].barcode}</td>
                    <td>${matchedProducts[i].type}</td>
                    <td>${matchedProducts[i].price}</td>
                    <td>${matchedProducts[i].ads}</td>
                    <td>${matchedProducts[i].express}</td>
                    <td>${matchedProducts[i].discount}</td>
                    <td>${matchedProducts[i].total}</td>
                    <td><button id="update" onclick="updatedata(${i})">تعديل</button></td>
                    <td><button id="del" onclick="delitem(${i})">بيع</button></td>
                </tr>`;
    }

    tbody.innerHTML = table;
    itemscount.innerHTML = `(${matchedProducts.length})`; // تحديث عدد العناصر التي تم العثور عليها
}








const codeReader = new ZXing.BrowserMultiFormatReader();
const videoElement = document.getElementById("video");
const ssearch = document.getElementById("search");
const scanBarcode = document.getElementById("scanBarcode");
const stopScanBtn = document.getElementById("stopScan");
const barinp = document.getElementById("barinp");


let scanning = false;
let stream = null;


scanBarcode.onclick = function () {
    if (scanning) return;

    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: "environment",
            width: { ideal: 1920 }, 
            height: { ideal: 1080 },
            frameRate: { ideal: 60, max: 120 },
            focusMode: "continuous",
            exposureMode: "continuous"
        }
    })
        .then((videoStream) => {
            stream = videoStream;
            videoElement.srcObject = stream;
            videoElement.setAttribute("playsinline", true);
            videoElement.play();
            scanning = true;

      
            codeReader.decodeFromVideoDevice(undefined, videoElement, (result, err) => {
                if (result) {
                    barinp.value = result.text;
                    ssearch.value = result.text;
                    searchByBarcode(result.text); 

                }
            });
        })
        .catch((err) => console.error("⚠️ خطأ في تشغيل الكاميرا:", err));
};


