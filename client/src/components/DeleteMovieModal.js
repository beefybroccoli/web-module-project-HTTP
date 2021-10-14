import React, { useContext } from "react";

import ContextObject from "../context/context";

const DeleteMovieModal = (props) => {
  const { deleteMovie } = useContext(ContextObject);
  const { movie } = props;
  const cb_onSubmit = (event) => {
    event.preventDefault();
    deleteMovie(movie.id);
    
  };

  return (
    <div id="deleteMovieModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={cb_onSubmit}>
            <div className="modal-header">
              <h4 className="modal-title">Delete Movie</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to this movie?</p>
              <p>{JSON.stringify(movie)}</p>
              <p className="text-warning">
                <small>This action cannot be undone.</small>
              </p>
            </div>
            <div className="modal-footer">
              <input
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
                value="Cancel"
              />
              <input type="submit" className="btn btn-danger" value="Delete" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteMovieModal;
