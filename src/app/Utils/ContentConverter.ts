
export class ContentConverter{
  resizeImg(rawContent: string): string{
    let modified = null;
    if (rawContent.indexOf('width:')<0){
      let imgText = rawContent.split('figure')[1];
      let imgArray = imgText.split('image');
      let beResized = 'image image_resized" style="width:30%;'.concat(imgArray[1]);
      imgArray[1] = beResized;
      const resizedText = imgArray.join("");
      modified = '<figure' + resizedText;
    }
    else{
      modified = rawContent.replace('width:50','width:30');
    }
    return modified;
  }
  getFirstImg(rawContent: string): string{
    const startIdx = rawContent.indexOf('<figure');
    const subContent = rawContent.substr(startIdx);
    const endIdx = subContent.indexOf('</figure>');
    return rawContent.substr(startIdx, endIdx);
  }

  getDisplayText(rawContent: string, length: number, topicId: string, postId: number): string{
    const pArray = rawContent.split('<p>');
    pArray[0] = '<p>';
    let subArrayP = null;
    let lastElem = null;
    if (pArray.length < 3){
      return this.extractLessThanLength(pArray, topicId, postId);
    }
    else{
      subArrayP = pArray.slice(0, length);
      lastElem = subArrayP[length - 1].split('</p>')[0];
    }

    const textViewMore = '<p>' + lastElem + '...' + '<a href="/topics/' + topicId + '/posts/'+ postId + '">View More</a></p>';
    subArrayP[length-1] = textViewMore;
    const displayText = subArrayP.join("");
    return displayText;
  }

  extractLessThanLength(pArray:string[], topicId: string, postId: number):string{
    let subArrayP = pArray.slice(0, pArray.length);
    let lastElem = subArrayP[pArray.length - 1].split('</p>')[0];
    const textViewMore = '<p>' + lastElem + '...' + '<a href="/topics/' + topicId + '/posts/'+ postId + '">View More</a></p>';
    console.log(textViewMore);
    subArrayP[subArrayP.length - 1] = textViewMore;
    let resizedText = subArrayP.join("");
    return resizedText;
  }
}
