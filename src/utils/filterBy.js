const filterBy = (data, fields, label) => {

    if (label === '') {
        return data;
    } 
    
    if (!Array.isArray(data)) {
        console.log ('Data was provided in incorrect format');
        return data;
    }

    let filteredItems = [];
    
    filteredItems = data.filter((element, arr, index) => {
        for (let i=0; i < fields.length; i++) {
            console.log(`${element}: ${fields}: ${i}`)
            if (~element[fields[i]].toLowerCase().indexOf(label.toLowerCase())) {
                return element;
            }            
        }
    })

     
    if (filteredItems.length === 0) {
        return null;
    }

    return filteredItems;
    // if (filteredItems.length > 0) {
    //     return filteredItems; 
    // }
}

export default filterBy;