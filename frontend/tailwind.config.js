module.exports = {
  content: ['index.html', './src/**/*.{html,js,jsx}'],
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
  theme: {
    screens: {
      sm: '768px',
      md: '1024px',
      lg: '1280px',
      xl: '1440px',
      '2xl': '1920px',
    },
    listStyleType: {
      none: 'none',
      decimal: 'decimal',
      square: 'square',
    },
    fontSize: {
      xs: ['11px', '14px'],
      sm: ['13px', '18px'],
      base: ['16px', '24px'],
      lg: ['18px', '28px'],
      xl: ['20px', '28px'],
    },
    containers: {
      sm: '5rem',
      md: '8rem',
      lg: '10rem',
    },
    colors: {
      transparent: 'transparent',
      black: '#000000',
      blue: '#0000aa',
      darkGray: '#606070',
      darkGrayDark: '#404050',
      lightGray: '#a8a8a8',
      lightGrayDark: '#959595',
      midGray: '#9090a0',
      midGrayDark: '#808090',
      white: '#ffffff',
      whiteDark: '#eeeeee',
      bgButton: '#ffffff',
      bgButtonDark: '#404050',
      bgButtonSecondary: '#ffffff',
      bgButtonSecondaryDark: '#303040',
      bgCheckboxSelected: '#7070ff',
      bgCheckboxSelectedDark: '#6060d0',
      bgError: '#f04040',
      bgErrorDark: '#901000',
      bgErrorSecondary: '#ff6060',
      bgErrorSecondaryDark: '#b03525',
      bgGreen: '#659065',
      bgGreenDark: '#709570',
      bgNav: '#3a3a5a',
      bgNavDark: '#303040',
      bgPrimary: '#ffffff',
      bgPrimaryDark: '#252530',
      bgRed: '#b05050',
      bgRedDark: '#b56060',
      bgSecondary: '#e0e5ff',
      bgSecondaryDark: '#353545',
      bgSuccess: '#40d080',
      bgSuccessDark: '#007035',
      bgThird: '#f0f5ff',
      bgThirdDark: '#303040',
      bgWarning: '#ffb050',
      bgWarningDark: '#c06500',
      borderNestModal: '#555570',
      borderNestModalDark: '#404050',
      borderPrimary: '#80b0ff',
      borderPrimaryDark: '#505060',
      borderSecondary: '#b5c5ff',
      borderSecondaryDark: '#404050',
      borderThird: '#b5c5ff',
      borderThirdDark: '#303040',
      fgGreen: '#00a000',
      fgGreenDark: '#00d000',
      fgName: '#3060c0',
      fgNameDark: '#d59000',
      fgPrimary: '#353595',
      fgPrimaryDark: '#eeeeee',
      fgRed: '#f01020',
      fgRedDark: '#ee3030',
      fgSecondary: '#6060c0',
      fgSecondaryDark: '#80b0ff',
      fgThird: '#6060c0',
      fgThirdDark: '#c0c0e0',
    },
    extend: {
      flexBasis: {
        '1/9': '11.1111111%',
        '2/9': '22.2222222%',
        '3/9': '33.3333333%',
        '4/9': '44.4444444%',
        '5/9': '55.5555555%',
        '6/9': '66.6666666%',
        '7/9': '77.7777777%',
        '8/9': '88.8888888%',
      },
    },
  },
};
