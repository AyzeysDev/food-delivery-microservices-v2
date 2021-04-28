import { useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import { Message } from "semantic-ui-react";

export default () => {
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/')
  });

  useEffect(() => {
    doRequest();
  }, []);

  return (<div>
    <div></div>
    <Message yellow>
      <Message.Header>Signing out...</Message.Header>
        <p>
          Come back again
        </p>
    </Message>
  </div>); 
};
