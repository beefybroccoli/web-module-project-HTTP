import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import axios from "axios";
import { API_URL_MOVIES_ID } from "../constant/constant";
import DeleteMovieModal from "./DeleteMovieModal";
import ContextObject from "../context/context";
import { useContext } from "react";

const Movie = (props) => {
  const [movie, setMovie] = useState("");
  const { id } = useParams();
  const { push } = useHistory();
  const [deleteModal, set_deleteModal] = useState(false);
  const { addToFavorites } = useContext(ContextObject);

  useEffect(() => {
    axios
      .get(`${API_URL_MOVIES_ID}${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [id]);

  const cb_onClickDelete = () => {
    set_deleteModal(true);
  };

  const cb_onClickFavorite = () => {
    addToFavorites(movie);
  };

  return (
    <div className="modal-page col">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{movie.title} Details</h4>
          </div>
          <div className="modal-body">
            <div className="flexContainer">
              <section className="movie-details">
                <div>
                  <label>
                    Title: <strong>{movie.title}</strong>
                  </label>
                </div>
                <div>
                  <label>
                    Director: <strong>{movie.director}</strong>
                  </label>
                </div>
                <div>
                  <label>
                    Genre: <strong>{movie.genre}</strong>
                  </label>
                </div>
                <div>
                  <label>
                    Metascore: <strong>{movie.metascore}</strong>
                  </label>
                </div>
                <div>
                  <label>Description:</label>
                  <p>
                    <strong>{movie.description}</strong>
                  </p>
                </div>
              </section>

              <section>
                <span className="m-2 btn btn-dark" onClick={cb_onClickFavorite}>
                  Favorite
                </span>
                <Link
                  to={`/movies/edit/${movie.id}`}
                  className="m-2 btn btn-success"
                >
                  Edit
                </Link>
                <span className="delete">
                  <input
                    type="button"
                    className="m-2 btn btn-danger"
                    value="Delete"
                    onClick={cb_onClickDelete}
                  />
                </span>
              </section>
            </div>
          </div>
        </div>
        {deleteModal && <DeleteMovieModal movie={movie} />}
      </div>
    </div>
  );
};

export default Movie;
