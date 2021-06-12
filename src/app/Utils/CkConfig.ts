export class CkPostConfig{
  ckEditConfig = {
    // cloudServices: {
    //   tokenUrl: 'https://80496.cke-cs.com/token/dev/bfc5a41677a1de068acff8947f021287b9ab86fa96a46286ceb333cd8b02',
    //   uploadUrl: 'https://80496.cke-cs.com/easyimage/upload/'
    // },
    toolbar: {
      items: [
        'heading', '|',
        'alignment', '|',
        'bold', 'italic', '|',
        'fontSize', '|',
        'link', '|',
        'bulletedList', 'numberedList', 'specialCharacters', '|',
        '|',
        'imageUpload',
        'blockQuote',
      ]
    },
    image: {
      toolbar: [
        'imageStyle:alignleft',
        'imageStyle:side',
        'imageStyle:alignright',
        '|',
        'imageTextAlternative',
        'linkImage',
        '|',
        'resizeImage'
      ],
       resizeOptions: [
        {
          name: 'resizeImage:original',
          label: 'Original',
          value: null
        },
        {
          name: 'resizeImage:50',
          label: '50%',
          value: '50'
        },
        {
          name: 'resizeImage:30',
          label: '30%',
          value: '30'
        }
      ],
      styles: ['alignLeft', 'full', 'alignRight']
    }
  };
  ckNewConfig = {
    cloudServices: {
      tokenUrl: 'https://81293.cke-cs.com/token/dev/3518ddeeba59cad3ac3d194499902ee44ed67221f2e1684708bb6e2446fc',
      uploadUrl: 'https://81293.cke-cs.com/easyimage/upload/'
    },
    toolbar: {
      items: [
        'heading', '|',
        'alignment', '|',
        'bold', 'italic', '|',
        'fontSize', '|',
        'link', '|',
        'bulletedList', 'numberedList', 'specialCharacters', '|',
        '|',
        'imageUpload',
        'blockQuote',
      ]
    },
    image: {
      toolbar: [
        'imageStyle:alignleft',
        'imageStyle:side',
        'imageStyle:alignright',
        '|',
        'imageTextAlternative',
        'linkImage',
        '|',
        'resizeImage'
      ],
      resizeOptions: [
        {
          name: 'resizeImage:original',
          label: 'Original',
          value: null
        },
        {
          name: 'resizeImage:50',
          label: '50%',
          value: '50'
        },
        {
          name: 'resizeImage:30',
          label: '30%',
          value: '30'
        }
      ],
      styles: ['alignLeft', 'full', 'alignRight']
    }
  };

  ckCommentConfig = {
    toolbar: {
      items: [
        'alignment', '|',
        'bold', 'italic', '|',
        'link', '|',
        'bulletedList', 'numberedList', 'specialCharacters', '|',
        'blockQuote',
      ]
    }
  };
}

