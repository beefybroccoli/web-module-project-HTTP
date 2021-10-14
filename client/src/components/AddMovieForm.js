import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";
import { API_URL_MOVIES_ID } from "../constant/constant";
import ContextObject from "../context/context";

const AddMovieForm = (props) => {
  const { push } = useHistory();
  const { id } = useParams();
  const { replaceMovie } = useContext(ContextObject);

  const [movie, setMovie] = useState({
    title: "",
    director: "",
    genre: "",
    metascore: 0,
    description: "",
  });

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const cb_onClickSave = () => {
    axios
      .put(API_URL_MOVIES_ID + id, movie)
      .then((resp) => {
        console.log("resp.data[id] = ", resp.data[id]);
        replaceMovie(resp.data[id]);
        push("/movies/" + id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const { title, director, genre, metascore, description } = movie;

  useEffect(() => {
    console.log("params = ", id);
    axios
      .get(API_URL_MOVIES_ID + id)
      .then((res) => {
        console.log(res.data);
        setMovie(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="col">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <h4 className="modal-title">
              Editing <strong>{movie.title}</strong>
            </h4>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Title</label>
              <input
                value={title}
                onChange={handleChange}
                name="title"
                type="text"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Director</label>
              <input
                value={director}
                onChange={handleChange}
                name="director"
                type="text"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Genre</label>
              <input
                value={genre}
                onChange={handleChange}
                name="genre"
                type="text"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Metascore</label>
              <input
                value={metascore}
                onChange={handleChange}
                name="metascore"
                type="number"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={description}
                onChange={handleChange}
                name="description"
                className="form-control"
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <input
              type="submit"
              className="btn btn-info"
              value="Save"
              onClick={cb_onClickSave}
            />
            <Link to={`/movies/1`}>
              <input type="button" className="btn btn-default" value="Cancel" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovieForm;
