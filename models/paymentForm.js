// Set the application ID
var applicationId = "sandbox-sq0idp-L3Zq8zqhsQ4Lfebheybxyg";

// Set the location ID
var locationId = "	X6KVEGZEKC0SE";

// Create and initialize a payment form object
var paymentForm = new SqPaymentForm({

  // Initialize the payment form elements
  applicationId: applicationId,
  locationId: locationId,
  inputClass: 'sq-input',
  autoBuild: false,

  // Customize the CSS for SqPaymentForm iframe elements
  inputStyles: [{
    fontSize: '16px',
    fontFamily: 'Helvetica Neue',
    padding: '16px',
    color: '#373F4A',
    backgroundColor: 'transparent',
    lineHeight: '24px',
    placeholderColor: '#CCC',
    _webkitFontSmoothing: 'antialiased',
    _mozOsxFontSmoothing: 'grayscale'
  }],

  // Initialize Apple Pay placeholder ID
  applePay: false,

  // Initialize Masterpass placeholder ID
  masterpass: false,

  // Initialize the credit card placeholders
  cardNumber: {
    elementId: 'sq-card-number',
    placeholder: '• • • •  • • • •  • • • •  • • • •'
  },
  cvv: {
    elementId: 'sq-cvv',
    placeholder: 'CVV'
  },
  expirationDate: {
    elementId: 'sq-expiration-date',
    placeholder: 'MM/YY'
  },
  postalCode: {
    elementId: 'sq-postal-code',
    placeholder: '12345'
  },

  // SqPaymentForm callback functions
  callbacks: {
    /*
     * callback function: createPaymentRequest
     * Triggered when: a digital wallet payment button is clicked.
     * Replace the JSON object declaration with a function that creates
     * a JSON object with Digital Wallet payment details
     */
    createPaymentRequest: function () {

      return {
        requestShippingAddress: false,
        requestBillingInfo: true,
        currencyCode: "USD",
        countryCode: "US",
        total: {
          label: "MERCHANT NAME",
          amount: "100",
          pending: false
        },
        lineItems: [
          {
            label: "Subtotal",
            amount: "100",
            pending: false
          }
        ]
      }
    },

    /*
     * callback function: cardNonceResponseReceived
     * Triggered when: SqPaymentForm completes a card nonce request
     */
    cardNonceResponseReceived: function (errors, nonce, cardData) {
      if (errors) {
        // Log errors from nonce generation to the Javascript console
        console.log("Encountered errors:");
        errors.forEach(function (error) {
          console.log('  ' + error.message);
          alert(error.message);
        });

        return;
      }
      // Assign the nonce value to the hidden form field
      document.getElementById('card-nonce').value = nonce;

      // POST the nonce form to the payment processing page
      document.getElementById('nonce-form').submit();

    },

    /*
     * callback function: unsupportedBrowserDetected
     * Triggered when: the page loads and an unsupported browser is detected
     */
    unsupportedBrowserDetected: function () {
      /* PROVIDE FEEDBACK TO SITE VISITORS */
    },

    /*
     * callback function: inputEventReceived
     * Triggered when: visitors interact with SqPaymentForm iframe elements.
     */
    inputEventReceived: function (inputEvent) {
      switch (inputEvent.eventType) {
        case 'focusClassAdded':
          /* HANDLE AS DESIRED */
          break;
        case 'focusClassRemoved':
          /* HANDLE AS DESIRED */
          break;
        case 'errorClassAdded':
          document.getElementById("error").innerHTML = "Please fix card information errors before continuing.";
          break;
        case 'errorClassRemoved':
          /* HANDLE AS DESIRED */
          document.getElementById("error").style.display = "none";
          break;
        case 'cardBrandChanged':
          /* HANDLE AS DESIRED */
          break;
        case 'postalCodeChanged':
          /* HANDLE AS DESIRED */
          break;
      }
    },

    /*
     * callback function: paymentFormLoaded
     * Triggered when: SqPaymentForm is fully loaded
     */
    paymentFormLoaded: function () {
      /* HANDLE AS DESIRED */
      console.log("The form loaded!");
    }
  }
});
function buildForm(form) {
  if (SqPaymentForm.isSupportedBrowser()) {
    form.build();
    form.recalculateSize();
  }
}

/*
 * function: requestCardNonce
 *
 * requestCardNonce is triggered when the "Pay with credit card" button is
 * clicked
 *
 * Modifying this function is not required, but can be customized if you
 * wish to take additional action when the form button is clicked.
 */
function requestCardNonce(event) {

  // Don't submit the form until SqPaymentForm returns with a nonce
  event.preventDefault();

  // Request a nonce from the SqPaymentForm object
  paymentForm.requestCardNonce();
}
// digital wallet

function requestCardNonce(event) {

  // Don't submit the form until SqPaymentForm returns with a nonce
  event.preventDefault();

  // Request a nonce from the SqPaymentForm object
  paymentForm.requestCardNonce();
}
var paymentForm = new SqPaymentForm({
  // Initialize the payment form elements
  applicationId: applicationId,
  locationId: locationId,
  inputClass: 'sq-input',

  // Customize the CSS for SqPaymentForm iframe elements
  inputStyles: [{
    backgroundColor: 'transparent',
    color: '#333333',
    fontFamily: '"Helvetica Neue", "Helvetica", sans-serif',
    fontSize: '16px',
    fontWeight: '400',
    placeholderColor: '#8594A7',
    placeholderFontWeight: '400',
    padding: '16px',
    _webkitFontSmoothing: 'antialiased',
    _mozOsxFontSmoothing: 'grayscale'
  }],

  // Initialize Google Pay button ID
  googlePay: {
    elementId: 'sq-google-pay'
  },

  // Initialize Apple Pay placeholder ID
  applePay: {
    elementId: 'sq-apple-pay'
  },

  // Initialize Masterpass placeholder ID
  masterpass: {
    elementId: 'sq-masterpass'
  },

  // Initialize the credit card placeholders
  cardNumber: {
    elementId: 'sq-card-number',
    placeholder: '•••• •••• •••• ••••'
  },
  cvv: {
    elementId: 'sq-cvv',
    placeholder: 'CVV'
  },
  expirationDate: {
    elementId: 'sq-expiration-date',
    placeholder: 'MM/YY'
  },
  postalCode: {
    elementId: 'sq-postal-code'
  },

  // SqPaymentForm callback functions
  callbacks: {

    /*
     * callback function: methodsSupported
     * Triggered when: the page is loaded.
     */
    methodsSupported: function (methods) {
      if (!methods.masterpass && !methods.applePay && !methods.googlePay) {
        var walletBox = document.getElementById('sq-walletbox');
        walletBox.style.display = 'none';
      } else {
        var walletBox = document.getElementById('sq-walletbox');
        walletBox.style.display = 'block';
      }

      // Only show the button if Google Pay is enabled
      if (methods.googlePay === true) {
        var googlePayBtn = document.getElementById('sq-google-pay');
        googlePayBtn.style.display = 'inline-block';
      }

      // Only show the button if Apple Pay for Web is enabled
      if (methods.applePay === true) {
        var applePayBtn = document.getElementById('sq-apple-pay');
        applePayBtn.style.display = 'inline-block';
      }

      // Only show the button if Masterpass is enabled
      if (methods.masterpass === true) {
        var masterpassBtn = document.getElementById('sq-masterpass');
        masterpassBtn.style.display = 'inline-block';
      }
    },

    /*
     * callback function: createPaymentRequest
     * Triggered when: a digital wallet payment button is clicked.
     */
    createPaymentRequest: function () {

      var paymentRequestJson = {
        requestShippingAddress: false,
        requestBillingInfo: true,
        shippingContact: {
          familyName: "CUSTOMER LAST NAME",
          givenName: "CUSTOMER FIRST NAME",
          email: "mycustomer@example.com",
          country: "USA",
          region: "CA",
          city: "San Francisco",
          addressLines: [
            "1455 Market St #600"
          ],
          postalCode: "94103",
          phone:"14255551212"
        },
        currencyCode: "USD",
        countryCode: "US",
        total: {
          label: "MERCHANT NAME",
          amount: "1.00",
          pending: false
        },
        lineItems: [
          {
            label: "Subtotal",
            amount: "1.00",
            pending: false
          }
        ]
      };

      return paymentRequestJson;
    },

    /*
     * callback function: validateShippingContact
     * Triggered when: a shipping address is selected/changed in a digital
     *                 wallet UI that supports address selection.
     */
    validateShippingContact: function (contact) {

      var validationErrorObj ;
      /* ADD CODE TO SET validationErrorObj IF ERRORS ARE FOUND */
      return validationErrorObj ;
    },

    /*
     * callback function: cardNonceResponseReceived
     * Triggered when: SqPaymentForm completes a card nonce request
     */
    cardNonceResponseReceived: function(errors, nonce, cardData, billingContact, shippingContact) {
      if (errors){
        var error_html = "";
        for (var i =0; i < errors.length; i++){
          error_html += "<li> " + errors[i].message + " </li>";
        }
        document.getElementById("error").innerHTML = error_html;
        document.getElementById('sq-creditcard').disabled = false;

        return;
      }else{
        document.getElementById("error").innerHTML = "";
      }

      // Assign the nonce value to the hidden form field
      document.getElementById('card-nonce').value = nonce;

      // POST the nonce form to the payment processing page
      document.getElementById('nonce-form').submit();

    },

    /*
     * callback function: unsupportedBrowserDetected
     * Triggered when: the page loads and an unsupported browser is detected
     */
    unsupportedBrowserDetected: function() {
      /* PROVIDE FEEDBACK TO SITE VISITORS */
    },

    /*
     * callback function: inputEventReceived
     * Triggered when: visitors interact with SqPaymentForm iframe elements.
     */
    inputEventReceived: function(inputEvent) {
      switch (inputEvent.eventType) {
        case 'focusClassAdded':
          /* HANDLE AS DESIRED */
          break;
        case 'focusClassRemoved':
          /* HANDLE AS DESIRED */
          break;
        case 'errorClassAdded':
          /* HANDLE AS DESIRED */
          break;
        case 'errorClassRemoved':
          /* HANDLE AS DESIRED */
          break;
        case 'cardBrandChanged':
          /* HANDLE AS DESIRED */
          break;
        case 'postalCodeChanged':
          /* HANDLE AS DESIRED */
          break;
      }
    },

    /*
     * callback function: paymentFormLoaded
     * Triggered when: SqPaymentForm is fully loaded
     */
    paymentFormLoaded: function() {
      /* HANDLE AS DESIRED */
    }
  }
});

