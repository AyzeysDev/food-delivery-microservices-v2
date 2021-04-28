import Link from 'next/link';
import {Table} from 'semantic-ui-react'
import { Header, Icon } from 'semantic-ui-react'

const LandingPage = ({ currentUser, foods }) => {
  const foodList = foods.map((food) => {
    return (
      <Table.Row key={food.id}>
        <Table.Cell>{food.name}</Table.Cell>
        <Table.Cell>{food.price}</Table.Cell>
        <Table.Cell>
          <Link href="/foods/[foodId]" as={`/foods/${food.id}`}>
            <a>View</a>
          </Link>
        </Table.Cell>
      </Table.Row>
    );
  });
  
  
  return (
    <div>
        <Header as='h3' icon textAlign='center'>
          <Icon name='food' circular/>
            Food List
          <Header.Subheader>
            At Ayzeys Delivery, we provide you the Best in Class Home Food...  
          </Header.Subheader>
        </Header>
        <Table color= {'purple'}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Buy</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
          <Table.Body>
              {foodList}
          </Table.Body>
        </Table>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/foods');

  return { foods: data };
};

export default LandingPage;
