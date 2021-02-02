/**
 * @param {*} time 
 * Reformatting the date to shorter format
 */
const timeConverter = (time) => {
    const d = new Date(time);
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1;
    var curr_year = d.getFullYear();
    if(curr_month < 10) curr_month = "0" + curr_month
    if(curr_date < 10) curr_date = "0" + curr_date
    return  curr_year + "-" + curr_month + "-" + curr_date 
}

module.exports = {
    timeConverter,
};