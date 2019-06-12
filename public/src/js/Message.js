import React from 'react';
import Avatar from './Avatar';

export default (props) => {
  return (
    <ul className="p-0">
      <li>
        <div className={`row comments mb-2 ${props.messageType === 'send' ? 'message-sent' : ''}`}>

          {
            props.messageType === 'receive' &&
              <div className="col-md-2 col-sm-2 col-3 text-center user-img">
                <Avatar />
              </div>
          }
          <div className="col-md-9 col-sm-9 col-9 comment rounded mb-2">
            <h4 className="m-0"><a href="#">{props.name}</a></h4>
              <p className="mb-0 text-white">{props.message}</p>
          </div>
        </div>
      </li>
    </ul>
  );
};
