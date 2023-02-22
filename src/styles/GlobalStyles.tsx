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
    --color-red3: #58181C;
    
    --color-1: #395660;
    --color-2: #FFFFFF;
    --color-3: #1C2A2F;
    --color-4: #23353b;
    --color-5: #151F23;
    --color-6: #4F7785;
    --color-7: #A7C1CA;
    --color-8: #E5ECEF;
    --color-9: #C1D4DA;
  }
  .dark {
    --color-primary: #00FFFF;
    --color-secondary: #F100F5;
    --color-success: #49AA19;
    --color-pending: #D87A16;
    --color-fail: #D32029;

    --bg-1: #FAFAFA;
    --color-magenta2: #480049;
    --color-red3: #58181C;

    --color-1: #395660;
    --color-2: #FFFFFF;
    --color-3: #1C2A2F;
    --color-4: #23353b;
    --color-5: #151F23;
    --color-6: #4F7785;
    --color-7: #A7C1CA;
    --color-8: #E5ECEF;
    --color-9: #C1D4DA;
  }

  :root {
  --toastify-font-family: "IBM Plex Mono", monospace, sans-serif;
  --toastify-color-dark: var(--color-3);
  --toastify-text-color-dark: var(--color-8);
  --toastify-color-progress-light: var(--color-primary);
  --toastify-color-progress-success: var(--toastify-color-progress-light);
  --toastify-color-success: var(--color-success);
  --toastify-color-progress-dark: linear-gradient(
    to right,
    var(--color-primary),
    var(--color-secondary)
  );

  --rt-color-dark: var(--color-4);
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

  .secondary-outline-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid var(--color-1);
    padding: 8px 16px;
    height: 40px;
    cursor: pointer;

    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: var(--color-8);
  }

  .text-link {
    font-weight: 700;
    font-size: 14px;
    line-height: 22px;
    text-decoration-line: underline;
    color: var(--color-primary);
  }

  .Toastify__toast-container {
    padding: 0px;
    max-width: calc(100% - 32px);
    width: 100%;

    @media (min-width: 640px) {
      max-width: 400px;
    }
  }

  .Toastify__toast-theme--dark {
    background: var(--color-5);
    border: 1px solid var(--color-success);
    padding: 20px;
    border-radius: 0px;

    &.Toastify__toast--error {
      border: 1px solid var(--color-fail);
    }
  }

  .Toastify__toast-body {
    padding: 0px;
  }

  .Toastify__progress-bar--error {
    background: var(--toastify-color-progress-dark);
  }
`
