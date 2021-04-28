import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import { Form, Button, Message, Segment } from "semantic-ui-react";

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password
    },
    onSuccess: () => Router.push('/')
  });

  const onSubmit = async event => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <div>
    <div></div>
    <Segment raised color='blue'>
    <Message
    color='purple'
      attached
      header='Welcome to Ayzeys Food Delivery !'
      content='Fill out the form below to Sign-up for a new account'
    />
    <Form className='attached fluid segment' onSubmit={onSubmit}>
      <Form.Input
        fluid
        label='Email Address'
        placeholder='Email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        icon="envelope"
        type='email'
      />
      <Form.Input
        fluid
        label='Password'
        placeholder='Password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        icon={{
          name: "eye",
          circular: true,
          link: true,
          onClick: () => setShowPassword(!showPassword)
        }}
        type={showPassword ? "text" : "password"}
      />
      {errors}
      <Button color='blue'>Sign Up</Button>
    </Form>
    </Segment>
  </div>
  );
};
