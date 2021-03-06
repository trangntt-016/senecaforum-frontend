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
      //generate on 31 Aug email: amazon.team016@gmail.com pass *Abc123456
      tokenUrl: 'https://83075.cke-cs.com/token/dev/5d1116560d21f90693edf8bc03da82085283b46c39975425c0bbc88cfdb6',
      uploadUrl: 'https://83075.cke-cs.com/easyimage/upload/'
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

