export const checkInfoStyle = styles => {
  const { flex, sizes, border } = styles;

  return (`
    ${flex.vertical}
    ${sizes.full}

    .input_container {
      margin: 4.167vw 0;

      label {
        font-size: var(--font-size-standard);
      }

      input {
        ${border}
        border-color: var(--grey-dark);
      }
    }

    .submit_container {
      ${sizes.free('60%')}
      ${flex.horizontal.center}

      button {
        ${sizes.free('100%', 'calc(var(--gap-multiply-big) * 2)')}
        font-size: var(--font-size-normal);
      }

      button:first-of-type {
        margin-right: var(--gap-multiply-small);
      }

      button:last-of-type {
        margin-left: var(--gap-multiply-small);
      }
    }

    @media (orientation: portrait) {
      @media (min-width: 600px) {
        .input_container {
          margin: ${4.167 * 1.778}vw 0;
        }

        .submit_container {
          button:first-of-type {
            margin-right: calc(var(--gap-multiply-small) * 2);
          }

          button:last-of-type {
            margin-left: calc(var(--gap-multiply-small) * 2);
          }
        }
      }

      @media (max-width: 599px) {
        h2 {
          font-size: 16px;
          text-align: center;
        }

        .input_container {
          margin: 40px 0;

          label {
            margin-right: 5px;
            font-size: 16px;
          }
        }

        .submit_container {
          button {
            ${sizes.free('100%', '30px')}
            font-size: 13px;
          }

          button:first-of-type {
            margin-right: var(--gap-multiply-small);
          }

          button:last-of-type {
            margin-left: var(--gap-multiply-small);
          }
        }
      }
    }
  `);
};

export const modInfoStyle = styles => {
  const { flex, sizes, border } = styles;

  return (`
    ${sizes.full}
    ${flex.vertical}
    justify-content: space-between;

    * {
      ${sizes.free('100%')}
    }

    #contents-divider {
      margin-bottom: calc(var(--gap-standard) * 2);
      ${border}
      border-color: var(--btn-disable);
    }

    .input_container {
      margin-top: var(--gap-standard);
      padding: 0 var(--gap-standard);
      ${flex.vertical}
      align-items: flex-start;

      label {
        padding-left: var(--gap-standard);
        font-size: var(--font-size-normal);
      }

      input {
        margin: calc(var(--gap-standard) / 2) 0;
        ${border}
        border-color: var(--grey-dark);
        ${sizes.free('100%')}
      }

      p {
        font-size: var(--font-size-normal);
      }
    }

    #input-email {
      ${sizes.free('100%')}

      label {
        ${sizes.free('100%')}
        display: block;
      }

      input {
        ${sizes.free('48%')}
        display: inline-block;
      }

      p#divider {
        ${sizes.free('4%')}
        display: inline-block;
        text-align: center;
      }

      select {
        ${border}
        border-color: var(--grey-dark);
        border-radius: var(--border-rad-normal);
        padding: var(--gap-multiply-small) calc(var(--gap-multiply-small) * 3);
        ${sizes.free('48%')}
        display: inline-block;
        background: var(--white);
        font-size: var(--font-size-normal);
      }
    }

    .submit-container {
      ${flex.horizontal.center}
      ${sizes.free('100%', 'calc(var(--gap-multiply-big) * 2)')}

      button:first-of-type {
        margin-right: var(--gap-multiply-small);
      }

      button:last-of-type {
        margin-left: var(--gap-multiply-small);
      }
    }

    @media (orientation: portrait) {
      @media (min-width: 600px) {
        #contents-divider {
        }

        #input-email {
          select {
          }
        }

        .submit-container {
          button:first-of-type {
            margin-right: calc(var(--gap-multiply-small) * 2);
          }

          button:last-of-type {
            margin-left: calc(var(--gap-multiply-small) * 2);
          }
        }
      }

      @media (max-width: 599px) {
        #contents-divider {
          margin-bottom: 40px;
        }

        .input_container {
          margin-top: 20px;
          padding: 0 10px;

          label {
            padding-left: 5px;
            font-size: 16px;
          }

          input {
            margin: 5px 0;
            padding: 5px 10px;
            min-height: 30px;
            font-size: 14px;
          }

          p {
            font-size: 12px;
          }
        }

        #input-email {
          input {
            ${sizes.free('40%')}
          }

          p#divider {
            ${sizes.free('10%')}
          }

          select {
            border-radius: 0;
            padding: 5px 10px;
            ${sizes.free('49%')}
            min-height: 30px;
            font-size: 14px;
          }
        }

        .submit-container {
          ${sizes.free('100%', '30px')}

          button {
            font-size: 14px;
          }

          button:first-of-type {
            margin-right: var(--gap-multiply-small);
          }

          button:last-of-type {
            margin-left: var(--gap-multiply-small);
          }
        }
      }
    }
  `);
};

export const delInfoStyle = styles => {
  const { flex, sizes, border } = styles;

  return (`
    ${sizes.full}
    ${flex.vertical}

    * {
      ${sizes.free('100%')}
    }

    h2, h3 {
      margin-bottom: var(--gap-standard);
    }

    #guidance {
      ${border}
      border-bottom: 0;
      border-color: var(--btn-disable);
      padding: calc(var(--gap-standard) * 2);
      ${sizes.full}
      height: 70%;

      h1 {
        margin-bottom: var(--gap-standard);
        text-align: center;
        font-size: calc(var(--font-size-normal) * 2);
      }

      li {
        padding-left: var(--gap-standard);
        list-style: disc inside;
        font-size: var(--font-size-standard);
      }
    }

    form {
      ${sizes.full}
      ${flex.vertical}
      justify-content: space-between;
      text-align: center;
      
      h3, p, input {
        margin: var(--gap-standard) 0;
      }

      input {
        ${border}
        border-color: var(--grey-dark);
      }

      p {
        font-size: var(--font-size-standard);
      }

      span {
        color: #ff1515;
      }

      .check-delete {
        margin-bottom: calc(var(--gap-standard) * 2);
        ${border}
        border-top: 0;
        border-color: var(--btn-disable);
        padding: 0 calc(var(--gap-standard) * 2);
        ${flex.vertical}
        ${sizes.free('100%', '70%')}
      }
    }


    .submit-wrapper {
      ${flex.horizontal.center}
      ${sizes.free('100%', 'calc(var(--gap-multiply-big) * 2)')}

      button:first-of-type {
        margin-right: var(--gap-multiply-small);
      }

      button:last-of-type {
        margin-left: var(--gap-multiply-small);
      }
    }

    @media (orientation: portrait) {
      @media (min-width: 600px) {  
          .check-delete {
            ${sizes.free('100%', `50%`)}
          }
        }

        .submit-wrapper {
          button:first-of-type {
            margin-right: calc(var(--gap-multiply-small) * 2);
          }

          button:last-of-type {
            margin-left: calc(var(--gap-multiply-small) * 2);
          }
        }
      }

      @media (max-width: 599px) {
        h2, h3 {
          margin-bottom: 10px;
        }

        h2 {
          font-size: 16px;
        }

        h3 {
          font-size: 14px;
        }

        #guidance {
          padding: 10px;

          h1 {
            margin-bottom: 10px;
            font-size: 28px;
          }

          li {
            padding-left: 10px;
            font-size: 12px;
          }
        }

        form {
          h3, p, input {
            margin: 10px 0;
          }

          input {
          }

          p {
            font-size: 12px;
          }

          span {
            color: #ff1515;
          }

          .check-delete {
            margin-bottom: 20px;
            padding: 0 10px;
            ${flex.vertical}
            ${sizes.free('100%', '50%')}
          }
        }

        .submit-wrapper {
          ${sizes.free('100%', '30px')}

          button {
            font-size: 14px;
          }

          button:first-of-type {
            margin-right: var(--gap-multiply-small);
          }

          button:last-of-type {
            margin-left: var(--gap-multiply-small);
          }
        }
      }

      @media (max-width: 299px) {
        form {
          .check-delete {
            ${sizes.free('100%', '70%')}
          }
        }
      }
    }
  `);
};

export const memInfoStyle = (styles, state) => {
  const { sizes, border } = styles;

  return (`
    ${sizes.full}

    .member-info-contents-wrap {
      padding: calc(var(--gap-standard) * 2) var(--gap-standard);
      ${sizes.full}

      .member-info-contents-tab-wrap {
        button {
          padding: var(--gap-multiply-small) calc(var(--gap-multiply-small) * 3);
          ${border}
          border-color: var(--btn-disable);
          border-bottom: none;
          cursor: pointer;
          box-shadow: none;

          :hover {
            -webkit-filter: brightness(90%);
                    filter: brightness(90%);
          }
        
          :active {
            -webkit-transform: scale(0.95);
                -ms-transform: scale(0.95);
                    transform: scale(0.95);
          }
        }

        button:first-of-type {
          border-radius: var(--border-rad-normal) 0 0 0;
          border-right: none;
          background: ${state === 'modify' ? 'var(--highlight-light)' : 'var(--btn-disable)'};
        }

        button:last-of-type {
          border-radius: 0 var(--border-rad-normal) 0 0;
          background: ${state === 'modify' ? 'var(--btn-disable)' : 'var(--highlight-light)'};
        }
      }

      .member-info-contents {
        ${sizes.free('100%', 'calc(100% - calc(var(--gap-standard) * 2))')}
      }
    }

    @media (orientation: portrait) and (max-width: 599px) {
      .member-info-contents-wrap {
        padding: 40px 20px;

        .member-info-contents-tab-wrap {
          button {
            padding: 5px 15px;
            font-size: 12px;
          }

          button:first-of-type {
            border-radius: 10px 0 0 0;
          }

          button:last-of-type {
            border-radius: 0 10px 0 0;
          }
        }

        .member-info-contents {
          ${sizes.free('100%', 'calc(100% - 40px)')}
        }
      }
    }
  `);
}