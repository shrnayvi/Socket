import React from 'react';
import Avatar from './Avatar';

export default (props) => {
  return (
    <ul class="p-0">
      <li>
        <div class="row comments mb-2">
          <div class="col-md-2 col-sm-2 col-3 text-center user-img">
            <Avatar />
          </div>
          <div class="col-md-9 col-sm-9 col-9 comment rounded mb-2">
            <h4 class="m-0"><a href="#">Jacks David</a></h4>
              <time class="text-white ml-3">1 hours ago</time>
              <like></like>
              <p class="mb-0 text-white">Thank you for visiting all the way from New York.</p>
          </div>
        </div>
      </li>
    </ul>
  );
};
