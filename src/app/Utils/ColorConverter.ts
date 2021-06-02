export class ColorConverter{
   public colors = [
     '#F44336',
     '#B71C1C',
     '#D50000',
     '#E91E63',
     '#880E4F',
     '#C51162',
     '#9C27B0',
     '#4A148C',
     '#673AB7',
     '#311B92',
     '#6200EA',
     '#3F51B5',
     '#1A237E',
     '#0D47A1',
     '#01579B',
     '#006064',
     '#004D40',
     '#1B5E20',
     '#33691E',
     '#F57F17',
     '#FF6F00',
     '#E65100',
     '#BF360C',
     '#DD2C00',
     '#3E2723',
     '#4E342E',
     '#212121'

  ]
  public setColor(username: string):string{
    let color = "";
    for(let i = 0; i < 25; i++){
      if ((username.toUpperCase().charCodeAt(0)-65)==i){
        color = this.colors[i];
        i = 25;
        console.log(color);
      }
    }
    return color;
  }
}
