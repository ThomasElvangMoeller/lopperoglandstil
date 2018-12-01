let currentRow = 0;
let categories = new Set();
let currentlyEditing = false;

onload = async () =>{
    let [tabletemplate, producttemplate, productedittemplate, productsJSON] = await Promise.all([fetch('/templates/inventorytable.hbs'), fetch('/templates/inventoryproductspecs.hbs'), fetch('/templates/inventoryproductspecsedit.hbs'), fetch('/api/produkter')]);
    let [tabletemplateText, producttemplateText, productEditTemplateText, product] = await Promise.all([tabletemplate.text(), producttemplate.text(), productedittemplate.text(), productsJSON.json()]);
    const compiledTableTemplate = Handlebars.compile(tabletemplateText);
    const compiledProductTemplate = Handlebars.compile(producttemplateText);
    const compiledProductEdit = Handlebars.compile(productEditTemplateText);
    document.getElementById('inventory_main').innerHTML = await compiledTableTemplate({product});

    for (let e of product){
        for (let c of e.categories){
            categories.add(c);
        }
    }


    document.getElementById('link_to_front').onclick = () => {
        window.location.href = '/';
    };

    function addFunctionToRows() {
        let table = document.getElementById('inventory_table');
        for (let i = 1, row; row = table.rows[i]; i++) {
            row.onmouseover = function () {
                if(!currentlyEditing) {
                    getTableRowIndex(i)
                }
            }
        }
        const bins = document.getElementsByClassName('icon_bin');
        for (let i = 1, bin; bin = bins[i]; i++){
            bin.onclick = function () {
                console.log(bin.id);
                deleteProduct(bin.id);
            }
        }
        const edits = document.getElementsByClassName('icon_edit');
        for (let i = 1, edit; edit = edits[i]; i++){
            edit.onclick = function () {
                currentlyEditing = true;
                console.log(edit.id);
                editProduct(edit.id);
            }
        }
    }
    addFunctionToRows();


    function getTableRowIndex(row){
        if(row !== currentRow) {
            currentRow = row;
            document.getElementById('inventory_specs').innerHTML = compiledProductTemplate({product: product[currentRow-1]})
        }
        console.log(currentRow);
    }

    async function deleteProduct(id) {
        let areYouSure = confirm('Er du sikker på at du vil slette valgte produkt? \nDette er permanent og kan ikke fortrydes');
        if(areYouSure) {
            await fetch('/api/produkter/' + id, {method: 'DELETE'});
            productsJSON = await fetch('/api/produkter');
            product = await productsJSON.json();
            document.getElementById('inventory_main').innerHTML = await compiledTableTemplate({product});
            addFunctionToRows();
            document.getElementById('inventory_specs').innerHTML = compiledProductTemplate({product: product[currentRow - 2]})
        }
    }

    async function editProduct(id) {
        document.getElementById('inventory_specs').innerHTML = compiledProductEdit({product: product[currentRow-1]});
    }


};


