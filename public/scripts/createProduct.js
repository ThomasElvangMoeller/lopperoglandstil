
onload = () => {
    const name = document.body.querySelector("#name");
    const desciption = document.body.querySelector("#description");
    const category = document.body.querySelector("#category");
    const price = document.body.querySelector("#price");
    const amount = document.body.querySelector("#amount");
    const submit = document.body.querySelector("#submit");
    const unique = document.body.querySelector("#unique");
    const chosenPic = document.body.querySelector("#chosenPicture");
    const addInputFile = document.body.querySelector("#addInputFile");


    let productID;

    let url = 'http://localhost:8080/api/produkter'

    addInputFile.onclick = () => {
      const picHolder = document.body.querySelector("#picHolder");

        let addInput2 = document.createElement("input");
        addInput2.type = "file";
        addInput2.setAttribute('class','chosenPicture');
        addInput2.setAttribute('accept', 'image/*');
        addInput2.setAttribute('name', 'product');
        picHolder.appendChild(addInput2);
    };

    submit.onclick = async () => {
        console.log("button clicked")
        let categories = category.value.split(", ");
        const product = {
            name: name.value,
            desciption: desciption.value,
            amount: amount.value,
            categories: categories,
            price: price.value,
            unique: unique.value
        }
        const JSONproduct = JSON.stringify(product)
        let res = await fetch(url, {
            method: "POST",
            body: JSONproduct,
            headers: {'Content-Type': 'application/json'}
        })

        let json = await res.json();
        productID = json.id;
        let upload = "/api/produkter/" + productID + "/uploadbilleder"
        console.log(chosenPic);

        const choices = document.body.querySelectorAll(".chosenPicture");
        console.log(choices);

        let uploadForm = document.body.innerHTML += `<form id = "theForm" action ="${upload}" enctype="multipart/form-data"  method="POST"></form>`;
        const form = document.body.querySelector("#theForm");

        for(let i = 0; i < choices.length; i++){
            form.appendChild(choices[i]);
            console.log(choices[i].value);
            console.log(upload);
        }
        form.submit(function (evt) {
            evt.preventDefault();
        });
        form.remove();





    };

};