import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .light {
    --color-primary: #CA00CE;
    --color-secondary: #00FFFF;
    --color-success: #49AA19;
    --color-pending: #D87A16;
    --color-fail: #D32029;

    --bg-1: #FAFAFA;
    --color-magenta2: #480049;
    
    --color-1: #395660;
    --color-2: #FFFFFF;
    --color-3: #1C2A2F;
    --color-4: #23353b;
    --color-5: #151F23;
    --color-6: #4F7785;
    --color-7: #A7C1CA;
    --color-8: #E5ECEF;
  }
  .dark {
    --color-primary: #00FFFF;
    --color-secondary: #F100F5;
    --color-success: #49AA19;
    --color-pending: #D87A16;
    --color-fail: #D32029;

    --bg-1: #FAFAFA;

    --color-1: #395660;
    --color-2: #FFFFFF;
    --color-3: #1C2A2F;
    --color-4: #23353b;
    --color-5: #151F23;
    --color-6: #4F7785;
    --color-7: #A7C1CA;
    --color-8: #E5ECEF;
    --color-magenta2: #480049;
  }

  html {
    font-size: 14px;
    font-family: "IBM Plex Mono", monospace !important;
    font-weight: 400;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: center;
    transition: all 0.3s ease 0s;
  }
`

// :root {
//   --toastify-font-family: "Montserrat", arial, sans-serif;
//   --toastify-color-dark: ${colors.bg1};
//   --toastify-text-color-dark: ${colors.txt};
//   --toastify-color-progress-light: ${colors.sliderDotActiveBg};
//   --toastify-color-progress-success: var(--toastify-color-progress-light);
//   --toastify-color-success: ${colors.green};
// }
