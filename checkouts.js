const api = new SquareConnect.CheckoutApi();
const idempotencyKey = require('crypto').randomBytes(32).toString('hex');
const body = {
  idempotency_key: idempotencyKey,
  order: {
    reference_id: 'reference_id',
    line_items: [
      {
        name: 'Standard Turf',
        quantity: '100',
        base_price_money: {
          amount: 3.50,
          currency: 'USD'
        },
        discounts: [
          {
            name: '7% off previous season item',
            percentage: '7'
          },
          {
            name: '$3 off Customer Discount',
            amount_money: {
              amount: 300,
              currency: 'USD'
            }
          }
        ]
      },
      {
        name: 'Premium Turf',
        quantity: '1',
        base_price_money: {
          amount: 4,
          currency: 'USD'
        }
      },
      {
        name: 'California Gold',
        quantity: '3',
        base_price_money: {
          amount: 4.5,
          currency: 'USD'
        },
        discounts: [
          {
            name: '$11 off Customer Discount',
            amount_money: {
              amount: 1100,
              currency: 'USD'
            }
          }
        ],
        taxes: [
          {
            name: 'Fair Trade Tax',
            percentage: '5'
          }
        ]
      }
    ],
    discounts: [
      {
        name: "Father's day 12% OFF",
        percentage: '12'
      },
      {
        name: "Global Sales $55 OFF",
        amount_money: {
          amount: 5500,
          currency: 'USD'
        }
      }
    ],
    taxes: [
      {
        name: 'Sales Tax',
        percentage: '10.5'
      }
    ]
  },
  additional_recipients: [
    {
      location_id: '057P5VYJ4A5X1',
      description: 'Application fees',
      amount_money: {
        amount: 60, currency: 'USD'
      }
    }
  ],
  ask_for_shipping_address: true,
  merchant_support_email: 'merchant+support@website.com',
  pre_populate_buyer_email: 'example@email.com',
  pre_populate_shipping_address: {
    address_line_1: '1455 Market St.',
    address_line_2: 'Suite 600',
    locality: 'San Francisco',
    administrative_district_level_1: 'CA',
    postal_code: '94103',
    country: 'US',
    first_name: 'Jane',
    last_name: 'Doe'
  },
  redirect_url: 'https://merchant.website.com/order-confirm'
};

api.createCheckout(LOCATION_ID, body)
  .then((response) => {
    const checkout = response.checkout;
    // Handle checkout object
  });