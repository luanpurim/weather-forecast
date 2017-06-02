export default class weatherCardController {
    constructor(){
        this.getDate = getDate;
        this.getIcon = getIcon;
    }
    getDate(day){
        return new Date(day*1000);
    }       

    getIcon(icon){
        return "http://openweathermap.org/img/w/"+icon+".png"; 
    }
}