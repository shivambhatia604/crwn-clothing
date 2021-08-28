import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({price}) =>{
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51JKh4oSAQ7YxMcamifvGTZgTxamb1rYkA8eyr4AJMtNnfb4nUDGTLRtFxbN2kVaFr4X04kK13m5xfyV2o44vbWrj00S0UP7w83';


    const onToken = token => {
      axios({
        url: 'payment',
        method: 'post',
        data: {
          amount: priceForStripe,
          token: token
        }
      })
        .then(response => {
          alert('succesful payment');
        })
        .catch(error => {
          console.log('Payment Error: ', error);
          alert(
            'There was an issue with your payment!Please make sure you use the provided credit card.'
          );
        });
    };
    
      return (
        <StripeCheckout
          label='Pay Now'
          name='CRWN Clothing Ltd.'
          billingAddress
          shippingAddress
          image='https://svgshare.com/i/CUz.svg'
          description={`Your total is $${price}`}
          amount={priceForStripe}
          panelLabel='Pay Now'
          token={onToken}
          stripeKey={publishableKey}
        />
      );
};
export default StripeCheckoutButton;