import { Message, Table } from "semantic-ui-react";


const OrderIndex = ({ orders }) => {

  const orderList = orders.map((order) => {
    return (
      <Table.Row key={order.id}>
        <Table.Cell>{order.food.name}</Table.Cell>
        <Table.Cell>{order.status}</Table.Cell>
      </Table.Row>
    );
  })

  return (
    <div>
    <div></div>
    <Message color='orange'>
      <Message.Header>Order Status</Message.Header>
      <p>
      Below are your current order status. 
      </p>
    </Message>
    <div></div>
    <Table color= {'orange'}>         
      <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Food - Order</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
          <Table.Body>
              {orderList}
          </Table.Body>
    </Table>
    </div>

  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');

  return { orders: data };
};

export default OrderIndex;
