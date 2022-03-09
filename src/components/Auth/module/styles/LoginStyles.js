export const loginTop = styles => {
  const { sizes, flex, border } = styles;
  return (
    `
      margin: var(--gap-standard) 0;
      padding: calc(var(--gap-standard) + 2.604vw);
      border-radius: var(--border-rad-big);
      ${flex.vertical}
      width: 30vw;
      height: -webkit-max-content;
      height: -moz-max-content;
      height: max-content;
      background: white;
      
      h1 {
        margin-bottom: calc(var(--gap-multiply-big) * 3);
      }
      
      button {
        background: var(--btn-active);
        color: var(--grey-dark);
      }
      
      #login-form, hr {
        margin-bottom: calc(var(--gap-multiply-big) * 2);
      }
      
      #login-form {
        ${sizes.free('100%')}
        ${flex.vertical}
      }
      
      #login-form * {
        margin: 0.833vw;
      }
      
      #login-form input {
        ${border}
        border-color: var(--grey-dark);
        ${sizes.free('100%', '1.823vw')}
      }
      
      #login-form input:first-of-type {
        margin-top: 0;
      }
      
      #login-form button {
        margin-bottom: 0;
        height: 2.604vw;
      }
      
      .option {
        margin: var(--gap-multiply-big);
        ${flex.horizontal.center}
        justify-content: space-around;
        ${sizes.free('100%', '2.604vw')}
        
        button, a {
          height: 2.604vw;
        }
        
        a {
          background: var(--btn-active);
          color: var(--grey-dark);
          box-shadow: 0 0 0.156vw 0.052vw var(--grey-dark);
        }
      }
      
      .option:first-of-type {
        margin-top: 0;
      }
      
      .option a:first-of-type {
        margin-right: var(--gap-multiply-small);
      }
      
      .option a:last-of-type {
        margin-left: var(--gap-multiply-small);
      }
      
      .option button:first-of-type {
        margin-right: var(--gap-multiply-small);
      }
      
      .option button:last-of-type {
        margin-left: var(--gap-multiply-small);
      }
      
      @media (orientation: portrait) {
        @media (min-width: 600px) {
          width: ${30 * 1.778}vw;

          #login-form * {
            margin: ${0.833 * 1.778}vw;
          }

          #login-form input {
            ${sizes.free('100%', `${1.823 * 1.778}vw`)}
          }

          #login-form button {
            height: ${2.604 * 1.778}vw;
          }

          .option {
            ${sizes.free('100%', `${2.604 * 1.778}vw`)}
            
            button, a {
              height: ${2.604 * 1.778}vw;
            }
            
            a {
            }
          }
        }

        @media (orientation: portrait) and (max-width: 599px) {
          margin: 0;
          padding: calc(var(--gap-standard));
          border-radius: 0;
          ${flex.vertical}
          ${sizes.full}

          h1 {
            margin-bottom: calc(var(--gap-multiply-big) * 3);
          }

          #login-form, hr {
            margin-bottom: calc(var(--gap-multiply-big) * 2);
          }

          #login-form * {
            margin: 8px;
          }
          
          #login-form input {
            ${sizes.free('100%', '30px')}
          }

          #login-form button {
            height: 25px;
          }
          
          .option {
            ${sizes.free('100%', '30px')}
            
            button, a {
              height: 30px;
            }
            
            a {
              box-shadow: 0 0 3px 1px var(--grey-dark);
            }
          }
        }
      }
    `
  );
}

export const hrStyle = `
  width: 100%;
  border: 1px solid black;
`;