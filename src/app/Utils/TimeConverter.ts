export class TimeConverterUtils{
    public TimeConverterUtils(){}

    public convertedMonth(monthIdx: number): string{
        const month = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        return month[monthIdx];
    }

    public typeOfDate(date: Date): number{
        const convertedDate = new Date(date);
        const today = new Date();
        const yesterday = new Date(Date.now() - 864e5);

        const Today = {
            date: today.getDate(),
            month: today.getUTCMonth(),
            year: today.getFullYear()
        };
        const Yesterday = {
            date: yesterday.getDate(),
            month: yesterday.getUTCMonth(),
            year: yesterday.getFullYear()
        };
        const CheckedDate = {
            date: convertedDate.getDate(),
            month: convertedDate.getUTCMonth(),
            year: convertedDate.getFullYear()
        };

        if (CheckedDate.date == Yesterday.date && CheckedDate.month == Yesterday.month && CheckedDate.year == Yesterday.year){
            return -1;
        }
        else if (CheckedDate.date == Today.date && CheckedDate.month == Today.month && CheckedDate.year == Today.year){
            return 0;
        }
        return 1;
    }

    public convertedDay(day: number): string{
        return day < 10 ? ('0' + day.toString()) : day.toString();
    }

    public convertedHourMinsAmPm(convertedDate: Date): string{
        let hour = '';
        let minutes = '';
        let pmAm = '';
        hour = (convertedDate.getHours() > 12) ? (convertedDate.getHours() - 12).toString() : convertedDate.getHours().toString();
        if (parseInt(hour) < 10){
            hour = '0' + hour;
        }
        minutes = (convertedDate.getMinutes() < 10) ? ('0' + convertedDate.getMinutes().toString()) : convertedDate.getMinutes().toString();

        pmAm = (convertedDate.getHours() > 12) ? 'pm' : 'am';
        return hour + ':' + minutes + pmAm;
    }


}

export class TimeConverter{


    public utils = new TimeConverterUtils();

    public TimeConverter(){}
    public convertDateComment(date: Date): string{

        const commentedOn = new Date(date);

        let result = '';

        switch (this.utils.typeOfDate(commentedOn)){
            case -1: {
                result = 'Yesterday at ' + this.utils.convertedHourMinsAmPm(commentedOn);
                break;
            }
            case 0: {
                result = 'Today at ' + this.utils.convertedHourMinsAmPm(commentedOn);
                break;
            }
            default: {
                result = this.utils.convertedMonth(commentedOn.getMonth()) + ' ' + this.utils.convertedDay(commentedOn.getDate()) + ', ' + commentedOn.getFullYear();
            }
        }
        return result;
    }

    public convertToYYYYMMDD(dateString: string): string{
        const convertedDate = new Date(dateString);
        const dd = String(convertedDate.getDate()). padStart(2, '0');
        const mm = String(convertedDate.getMonth() + 1). padStart(2, '0');
        const yyyy = convertedDate.getFullYear();
        return yyyy + '-' + mm + '-' + dd;
    }

    public plusDate(end: string): string{
      if(end != null|| end!= ""){
        const splitArr = [];
        splitArr.push(end.slice(0,8),end.slice(8,10));
        const date = parseInt(end.substring(8, 10)) + 1;
        if (date >= 10){
          splitArr[1] = date.toString();
          end = splitArr.join('');
        }
        else{
          splitArr[1] = '0' + date.toString();
          end = splitArr.join("");
        }
      }
      return end;
    }
}
