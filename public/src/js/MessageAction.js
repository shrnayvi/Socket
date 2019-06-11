import React from 'react';

export default (props) => (
  <div className="row comment-box-main p-3 rounded-bottom">
    <div className="col-md-9 col-sm-9 col-9 pr-0 comment-box">
      <input
        type="text"
        id="message"
        className="form-control"
        placeholder="Add Message"
      />
    </div>
    <div className="col-md-3 col-sm-2 col-2 pl-0 text-center send-btn">
      <button id="send" className="btn btn-info">
        Send
      </button>
    </div>
  </div>
)