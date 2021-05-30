import {ThemePalette} from '@angular/material/core';

export interface ChipColor {
    name: string;
    color: ThemePalette;
  }

export class TagsConverter{
    colors: ThemePalette;
    chipObj: ChipColor;
    matChip: ChipColor[];

    public getTokens(tags: String):any[]{
      var tokens= [];
      if(tags!=""&& tags!=undefined){
        tokens = tags.split('#');
        tokens.shift();
      }
      return tokens;
    }

    public getMatChips(tags: String):any[]{
        this.matChip = [];
        var tagsName = this.getTokens(tags);
        tagsName.forEach(t=>{
            this.chipObj = {
                name:'',
                color:undefined
            };
            var randomNum =  Math.floor(Math.random() * 3);
            this.chipObj.name = t;
            switch(randomNum){
                case 0:
                    this.chipObj.color = 'primary';
                    break;
                case 1:
                    this.chipObj.color = 'accent';
                    break;
                case 2:
                    this.chipObj.color = 'warn';
                    break;
            }
            this.matChip.push(this.chipObj);
        })
        return this.matChip;
    }
}
