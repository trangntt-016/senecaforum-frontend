export class TimeConverterUtils{
    public TimeConverterUtils(){};

    public convertedMonth(monthIdx:number):string{
        var month = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        return month[monthIdx];
    }

    public typeOfDate(date:Date):number{
        var convertedDate = new Date(date);
        var today = new Date();
        var yesterday = new Date(Date.now()-864e5);
        
        var Today = {
            date:today.getDate(),
            month:today.getUTCMonth(),
            year:today.getFullYear()
        }
        var Yesterday = {
            date:yesterday.getDate(),
            month:yesterday.getUTCMonth(),
            year:yesterday.getFullYear()
        }
        var CheckedDate = {
            date:convertedDate.getDate(),
            month:convertedDate.getUTCMonth(),
            year:convertedDate.getFullYear()
        }

        if(CheckedDate.date==Yesterday.date&&CheckedDate.month==Yesterday.month&&CheckedDate.year==Yesterday.year){
            return -1;
        }
        else if(CheckedDate.date==Today.date&&CheckedDate.month==Today.month&&CheckedDate.year==Today.year){
            return 0;
        }
        return 1;
    }

    public convertedDay(day:number):string{
        return day<10?("0"+day.toString()):day.toString();
    }

    public convertedHourMinsAmPm(convertedDate:Date):string{
        var hour = "";
        var minutes = "";
        var pmAm = "";
        hour = (convertedDate.getHours()>12)?(convertedDate.getHours()-12).toString():convertedDate.getHours().toString();
        if(parseInt(hour)<10){
            hour = "0"+hour;
        }
        minutes = (convertedDate.getMinutes()<10)?("0"+convertedDate.getMinutes().toString()):convertedDate.getMinutes().toString();
        
        pmAm = (convertedDate.getHours()>12)?"pm":"am";
        return hour+":"+minutes+pmAm;       
    }


}

export class TimeConverter{
    
    public TimeConverter(){};

    public utils = new TimeConverterUtils();

    public convertDateComment(date:Date):string{

        var commentedOn = new Date(date);
        
        var result = "";
        
        switch(this.utils.typeOfDate(commentedOn)){
            case -1:{
                result = "Yesterday at "+this.utils.convertedHourMinsAmPm(commentedOn); 
                break;
            }
            case 0:{
                result = "Today at "+this.utils.convertedHourMinsAmPm(commentedOn);
                break;
            }
            default:{
                result = this.utils.convertedMonth(commentedOn.getMonth())+" "+this.utils.convertedDay(commentedOn.getDate())+", "+commentedOn.getFullYear()
            }
        }
        return result;
    }

    public convertToYYYYMMDD(dateString:string):string{
        var convertedDate = new Date(dateString);
        var dd = String(convertedDate.getDate()). padStart(2, '0');
        var mm = String(convertedDate.getMonth()+1). padStart(2, '0');
        var yyyy = convertedDate.getFullYear();
        return yyyy+"-"+mm+"-"+dd;
    }
}