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
          label: '30%',
          value: '30'
        },
        {
          name: 'resizeImage:75',
          label: '50%',
          value: '50'
        }
      ],
      styles: ['alignLeft', 'full', 'alignRight']
    }
  };
  ckNewConfig = {
    cloudServices: {
      tokenUrl: 'https://80496.cke-cs.com/token/dev/bfc5a41677a1de068acff8947f021287b9ab86fa96a46286ceb333cd8b02',
      uploadUrl: 'https://80496.cke-cs.com/easyimage/upload/'
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
          label: '30%',
          value: '30'
        },
        {
          name: 'resizeImage:75',
          label: '50%',
          value: '50'
        }
      ],
      styles: ['alignLeft', 'full', 'alignRight']
    }
  };
}

export class Test{
    ckConfig = {
      cloudServices: {
        tokenUrl: 'https://80496.cke-cs.com/token/dev/bfc5a41677a1de068acff8947f021287b9ab86fa96a46286ceb333cd8b02',
        uploadUrl: 'https://80496.cke-cs.com/easyimage/upload/'
      },
      toolbar: {
        items: [
          'alignment', '|',
          'bold', 'italic', '|',
          'link', '|',
          'bulletedList', 'numberedList', 'specialCharacters', '|',
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
            label: '30%',
            value: '30'
          },
          {
            name: 'resizeImage:75',
            label: '50%',
            value: '50'
          }
        ],
        styles: ['alignLeft', 'full', 'alignRight']
      }
    };
}
