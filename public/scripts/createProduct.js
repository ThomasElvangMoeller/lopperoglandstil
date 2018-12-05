
onload = () => {
    const name = document.body.querySelector("#name");
    const desciption = document.body.querySelector("#description");
    const category = document.body.querySelector("#categories_input");
    const price = document.body.querySelector("#price");
    const amount = document.body.querySelector("#amount");
    const submit = document.body.querySelector("#submit");
    const unique = document.body.querySelector("#unique");
    const chosenPic = document.body.querySelector("#chosenPicture");
    const addInputFile = document.body.querySelector("#addInputFile");
    const category_add = document.body.querySelector("#category_add");
    const selected_category_list = document.body.querySelector("#category_list");
    const submitNewCategory =document.body.querySelector("#submitCategory");
    const categoryNameField =document.body.querySelector("#categoryNameField");
    const deleteCategorySelector = document.body.querySelector("#category_delete");
    const deleteCategory = document.body.querySelector("#category_delete_button");

    let categories = new Set();



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

        let categoriesArray = []

        categories.forEach(elem => {
            categoriesArray.push(elem)
        })

        const product = {
            name: name.value,
            desciption: desciption.value,
            amount: amount.value,
            categories: categoriesArray,
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

    category_add.onclick = function (){
        let selected_category = category.value;

        selected_category_list.innerHTML += `<li class="categorylistelem" id="${selected_category}">${selected_category}</li>`;
        categories.add(selected_category);
    };

    populateDD();

    async function populateDD() {
        category.innerHTML = ``;
        deleteCategorySelector.innerHTML = ``;
        const url = "http://localhost:8080/api/produktkategorier";
        fetch(url)
            .then(res => res.json())
            .then(res =>{
                console.log(res);
                for(let cat of res) {
                    category.innerHTML += `<option value="${cat}">${cat}</option>`;
                    deleteCategorySelector.innerHTML += `<option value="${cat}">${cat}</option>`;
                }
            });
    }


    submitNewCategory.onclick = async() =>{
        const url = "http://localhost:8080/api/produktkategorier"
        const category ={name: categoryNameField.value}
        const JSONCat = JSON.stringify(category)

        fetch(url,{
            method: "POST",
            body: JSONCat,
            headers:{'Content-Type':'application/json'}
        })
        populateDD();
        categoryNameField.value = "";
    };

    deleteCategory.onclick = async () =>{
      let url = "/api/produktkategorier/" + deleteCategorySelector.value;
      fetch(url, {method: "DELETE"});
      populateDD();
    };
};