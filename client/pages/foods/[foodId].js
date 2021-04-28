import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import { Header, Button, Message, Icon } from "semantic-ui-react";

const FoodShow = ({ food, currentUser }) => {
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      foodId: food.id,
    },
    onSuccess: (order) =>
      Router.push('/orders/[orderId]', `/orders/${order.id}`)
  });

  return (
    <div>
      <div></div>
      {food.userId === currentUser?.id ? <><Message warning>
          <Message.Header>You're viewing your food.</Message.Header>
          <p>
          Go back to home <b>try other foods</b> to purchase.
          </p>
        </Message>
        <div></div>
        <Button Button inverted color='yellow' onClick={() => Router.push('/')}>Go to Home</Button>
        </>
        : <Message positive>
          <Message.Header>You are one click away from buying the food.</Message.Header>
          <p>
          Go on <b>click purchase</b> and enjoy your meal.
          </p>
        </Message>}
        <Header as='h2'>
          <Icon name='food' />
          <Header.Content>{food.name}</Header.Content>
        </Header>
        <Header as='h4'>
          <Icon name='rupee' />
          <Header.Content>Price: {food.price}</Header.Content>
        </Header>
        {errors}
        <Button positive onClick={() => doRequest()} disabled= {food.userId === currentUser?.id}>Purchase</Button>
    </div>
  );
};

FoodShow.getInitialProps = async (context, client) => {
  const { foodId } = context.query;
  const { data } = await client.get(`/api/foods/${foodId}`);

  return { food: data };
};

export default FoodShow;
