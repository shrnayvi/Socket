import React from 'react';

export default props => (
  <div className="col-md-6 offset-md-3 col-sm-6 offset-sm-3 col-12 comments-main pt-4 py-4 rounded">
    <div className="row comment-box-main p-3 rounded-bottom">
      <div className="col-md-9 col-sm-9 col-9 pr-0 comment-box">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Your Name"
          onChange={props.handleChange}
        />
      </div>
      <div className="col-md-3 col-sm-2 col-2 pl-0 text-center send-btn">
        <button id="send" className="btn btn-info" onClick={props.handleUser}>
          Submit
        </button>
      </div>
    </div>
  </div>
);