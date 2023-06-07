function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
}
  
function emptyOrRows(rows) {
    if (!rows) {
      return [];
    }
    return rows;
}

function currentYear() {
    return new Date().getFullYear();
}

function currentMonth() {
    return new Date().getMonth();
}
  
module.exports = {
    getOffset,
    emptyOrRows,
    currentYear,
    currentMonth
}