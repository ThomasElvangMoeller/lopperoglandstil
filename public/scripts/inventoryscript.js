let currentRow = 0;

onload = async () =>{
    const [tabletemplate, producttemplate, productsJSON] = await Promise.all([fetch('/templates/inventorytable.hbs'), fetch('/templates/inventoryproductspecs.hbs'), fetch('/api/produkter')]);
    const [tabletemplateText, producttemplateText, product] = await Promise.all([tabletemplate.text(), producttemplate.text(), productsJSON.json()]);
    const compiledTableTemplate = Handlebars.compile(tabletemplateText);
    const compiledProductTemplate = Handlebars.compile(producttemplateText);
    document.getElementById('inventory_main').innerHTML = await compiledTableTemplate({product});


    document.getElementById('link_to_front').onclick = () => {
        window.location.href = '/';
    };

   let table = document.getElementById('inventory_table');
    for (let i = 1, row; row = table.rows[i]; i++) {
        row.onclick = function () {
            getTableRowIndex(i)
        }
    }

    function getTableRowIndex(row){
        if(row !== currentRow) {
            currentRow = row;
            document.getElementById('inventory_specs').innerHTML = compiledProductTemplate({product: product[currentRow-1]})
        }
        console.log(currentRow);
    }



};


