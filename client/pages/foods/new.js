import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import { Form, Button, Message, Segment } from "semantic-ui-react";

const NewFood = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/foods',
    method: 'post',
    body: {
      name, price
    },
    onSuccess: (food) => Router.push('/')
  });

  const onSubmit = (event) => {
    event.preventDefault();

    doRequest();
  }

  const onBlur = () => {
    const value = parseFloat(price);
    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  return (
  <div>
    <div></div>
    <Segment inverted raised color='blue'>
    <Message
     attached
      header='Create Food to Sell'
      content='Enter details about your food in the below form to sell your food'
      color='teal'
   />
  <Form className='attached fluid segment' onSubmit={onSubmit} inverted>
    <Form.Input
      fluid
      label='Food title'
      placeholder='name'
      value={name}
      onChange={(e) =>setName(e.target.value)}
      icon="food"
    />
    <Form.Input
      fluid
      label='Price'
      placeholder='price'
      value={price}
      onBlur={onBlur}
      onChange={(e) =>setPrice(e.target.value)}
      icon="rupee sign"
    />
    {errors}
    <Button basic color='teal'>Submit</Button>
  </Form>
  </Segment>
  </div>
  );
};

export default NewFood;