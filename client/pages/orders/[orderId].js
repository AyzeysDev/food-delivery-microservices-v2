import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Message, Header, Icon } from "semantic-ui-react";
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: '/api/payment',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push('/orders'),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return <div>Order Expired !</div>;
  }

  return (
    <div>
      <div></div>
      <Message color='olive'>
      <Message.Header>Payment Screen</Message.Header>
      <p>
      You're paying with Stripe checkout, click on pay to finish your food purchase.  
      </p>
      </Message>
      <div></div>
      <Header as='h4' icon color='red'>
        <Icon name='time' />
        Time left to pay:
        <Header.Subheader>
        {timeLeft} seconds
       </Header.Subheader>
      </Header>
      <div></div>
      <StripeCheckout
        token={ ({id}) => doRequest({ token: id})}
        stripeKey="pk_test_51IUTQQEWbdnnVcaDs7ntipiEKTTOLq2LUdqLffuYjwhF87uvlmbiYBVjlBGDZnmchPslkgwdFTJLl06uFp8UF8qy00yFjh8BVi"
        amount={order.food.price * 100}
        email={currentUser.email}
      />
      {errors}
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
