
let sort = (table) => {
    let arr = Array.from(table.rows);
    arr = arr.slice(1);
    arr.sort( (a, b) => {
        let str  = a.cells[0].textContent;
        let str2 = b.cells[0].textContent;
        return str.localeCompare(str2);
    } );
    
    table.append(...arr);
    return table
}

const tables = document.getElementsByClassName("sort")
let arr = Array.from(tables)
arr.forEach(table => {
    table = sort(table)
})