import React from "react";
import axios from "axios";
import MapView from './MapView';
import { useSelector, useDispatch } from 'react-redux';
import { setPost, setPost2, setPost3, setPost4, setrutaS, setmodal, setmodal2, unsetPost3 } from "../reducers/busSlice"
//import {createStore} from 'redux'

// reactstrap components
import {
  Button,
  Modal,
  Container,
  Row,
  Form,
  FormGroup
} from "reactstrap";

const baseURL = "http://127.0.0.1:5000/rutas";

// core components
// se importa modal para hacer una ventana desplegable y se define su estado para poder sacarlo o incluirlo dentro de la pagina web

function SectionJavaScript() {
  const dispatch = useDispatch();
  const { post, post2, post3, post4, rutaS, modal, modal2} = useSelector(state => state.Section);

  const toggleModal = () => {
    dispatch(unsetPost3())
    dispatch(setmodal({
      modal: !modal
    }))
  };

  const toggleModal2 = () => {

    dispatch(setmodal2({
      modal2: !modal2
    }))
  };

  const toggleMap = (evt) => {
    evt.preventDefault();
    dispatch(setrutaS({
      rutaS: evt.target.rutaz.value
    }))
  };

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      dispatch(setPost({
        post: response.data
      }))
    });
  }, [dispatch])


  console.log(post)

  React.useEffect(() => { // useEffect hook
    setTimeout(() => { // simulate a delay
      axios.get("http://127.0.0.1:5000/micro/" + rutaS)
        .then((response) => {
          //set state
          dispatch(setPost2({
            post2: response.data
          }))
        });
    }, 5000);
  });

  React.useEffect(() => { // useEffect hook
    axios.get("http://127.0.0.1:5000/rutas/"+rutaS)
    .then((response) => {
        //set state
        dispatch(setPost3({
          post3: response.data
        }))
      });
    },[dispatch, rutaS]);

    React.useEffect(() => {
      axios.get("http://127.0.0.1:5000/micro").then((response) => {
        dispatch(setPost4({
          post4: response.data
        }))
      });
    }, [dispatch])

  console.log(post2);
  console.log(post3);
  console.log(post4);

  if (!post) return null;

  const getRutas = () => {
    const rutasType = [];
    post.filter(post => {
      if (post.features[0].properties.nameid.length > 0) {
        return (rutasType.push(post.features[0].properties.nameid));
      }
      return rutasType
    });
    return [...new Set(rutasType)];
  }

  return (
    <>
      <div className="section javascript-components">
        <Container>
          <div id="modals">
            {/* Button trigger modal */}
            <Button
              className="btn-round"
              color="danger"
              outline
              type="button"
              onClick={() => {
                toggleModal();
              }
              }
            >
              Seleccione una ruta
            </Button>
            <Button
              className="btn-round"
              color="danger"
              outline
              type="button"
              onClick={() => {
                toggleModal2();
              }
              }
            >
              Información de linea
            </Button>
            {/* Modal */}
            <Modal isOpen={modal} toggle={toggleModal}>
              <div className="modal-header">
                <button
                  aria-label="Close"
                  className="close"
                  type="button"
                  onClick={toggleModal}
                >
                  <span aria-hidden={true}>×</span>
                </button>
                <h5
                  className="modal-title text-center"
                  id="exampleModalLabel"
                >
                  Seleccion de ruta
                </h5>
              </div>
              <Form onSubmit={toggleMap}>
                <FormGroup>
                  <div className="modal-body">
                    <select className="form-control" name={"rutaz"}>
                      {getRutas().map(rutas => <option key={rutas} name={rutas} value={rutas}>{rutas}</option>)}
                    </select>
                  </div>
                </FormGroup>
                <div className="modal-footer">
                  <div className="left-side">
                    <Button
                      className="btn-round"
                      color="danger"
                      type="submit"
                      onClick={() => {
                        toggleModal();
                      }
                      }
                    >
                      Aceptar
                    </Button>
                  </div>
                  <div className="divider" />
                  <div className="right-side">
                    <Button className="btn-round" color="danger" type="button" onClick={toggleModal}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              </Form>
            </Modal>
            <Modal isOpen={modal2} toggle={toggleModal2}>
              <div className="modal-header">
                <button
                  aria-label="Close"
                  className="close"
                  type="button"
                  onClick={toggleModal2}
                >
                  <span aria-hidden={true}>×</span>
                </button>
                <h5
                  className="modal-title text-center"
                  id="exampleModalLabel"
                >
                  Informacion de linea
                </h5>
              </div>
              <p>ㅤBuses circulando en tiempo real de la linea especifica: {post2.length}</p>
              <p>ㅤBuses totales trabajando: {post4.length} </p>
              <p>ㅤHorario Fijo de funcionamiento: 6:00 - 22:59</p>
              <p>ㅤNumero de contacto Fijo: +56 45223321</p>
            </Modal>
          </div>
        </Container>
      </div>
        <div id="map">
          <MapView/>
        </div>
    </>
  );
}

export default SectionJavaScript;
