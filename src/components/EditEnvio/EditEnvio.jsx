import React, { useEffect, useState } from "react";
import { Container, Form, FormGroup, Row, Col, Button } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import { GrSend } from "react-icons/gr";
import Cookies from "universal-cookie";

import * as API from "../../services/send-services";
import NavbarComponent from "../navbar/Navbar";
import "./EditEnvio.css";

const cookies = new Cookies();

function EditEnvio() {
  const token = cookies.get("TOKEN");
  const { id } = useParams();
  const [send, setSend] = useState({});

  
  const getSent = async () => {
    const configuration = {
      headers: {
        'Authorization': `${token}`,
      },
    };
    try {
      await API.getSendById(id, configuration)
        .then((response) => {
          setSend(response);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      if (error.response.data.message == " Error unauthorized") {
        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {

    setDataForm({
        codeSend: send.codeSend,
        status: send.status,
        colletAddress: send.colletAddress,
        colletCity: send.colletCity,
        idUserDelivery: send.idUserDelivery,
        nameUserDelivery: send.nameUserDelivery,
        addressUserDelivery: send.addressUserDelivery,
        cityUserDelivery: send.cityUserDelivery,
    })
  }, [send]);

  useEffect(() => {
    getSent();
  }, [id]);

  const [dataForm, setDataForm] = useState({});

  const {
    codeSend = "",
    status = "",
    colletAddress = "",
    colletCity = "",
    idUserDelivery = "",
    nameUserDelivery = "",
    addressUserDelivery = "",
    cityUserDelivery = "",
  } = dataForm;

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      codeSend,
      status,
      colletAddress,
      colletCity,
      idUserDelivery,
      nameUserDelivery,
      addressUserDelivery,
      cityUserDelivery,
    };
    try {
      const conf = {
        headers: {
          'Authorization': `${token}`,
        },
      };
      const response = await API.updateSend(id, data, conf);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavbarComponent />
      <Container className="mt-4">
        <h1 className="text-center">Editar Envío</h1>
        <Row className="form-container-edit">
          <Col>
            <Row>
              <div className="image">
                <GrSend className="img" />
              </div>
            </Row>
            <Row>
              <Col>
                <div className="send-info">
                  <p> { send.description } </p>
                  <Row>
                    <Col style={{ width: "200px"}} className="text-center">
                      <p> { send.dateSend } </p>
                    </Col>
                    <Col  style={{ width: "200px"}} className="text-center" >
                        <p> { send.hourSend } </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ width: "200px"}} className="text-center">
                        <p> <strong>Ancho:</strong>  { send.width } cm </p>
                    </Col>
                    <Col style={{ width: "200px"}} className="text-center">
                        <p>  <strong>Alto:</strong> { send.height } cm </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ width: "200px"}} className="text-center">
                        <p> <strong>Largo:</strong>   { send.large } cm </p>
                    </Col>
                    <Col style={{ width: "200px"}} className="text-center">
                        <p>  <strong>Peso:</strong> { send.weight } lb </p>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Col>
          <Col className="form-side">
            <Form className="form-edit-send" onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group controlId="codeSend">
                    <Form.Label> Código de Envío </Form.Label>
                    <Form.Control
                      name="codeSend"
                      defaultValue={codeSend}
                      type="text"
                      placeholder="Codigo de envio"
                      onChange={handleChange}
                      disabled
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup
                    className="input-select mb-3"
                    controlId="input-select"
                  >
                    <Form.Label> Estado </Form.Label>
                    <Form.Select
                      name="status"
                      aria-label="Default select example"
                      value={status}
                      onChange={handleChange}
                    >
                      <option>------</option>
                      <option value={"ENVIADO"}>ENVIADO</option>
                      <option value={"ENTREGADO"}>ENTREGADO</option>
                      <option value={"EN CAMINO"}>EN CAMINO</option>
                      <option value={"EN BODEGA"}>EN BODEGA</option>
                    </Form.Select>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="colletAddress">
                    <Form.Label> Direccion de recogida </Form.Label>
                    <Form.Control
                      name="colletAddress"
                      value={colletAddress}
                      type="text"
                      placeholder="Direccion de recogida"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="colletCity">
                    <Form.Label> Ciudad de recogida </Form.Label>
                    <Form.Control
                      name="colletCity"
                      value={colletCity}
                      type="text"
                      placeholder="Ciudad de recogida"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="idUserDelivery">
                    <Form.Label> C.C del Destinatario </Form.Label>
                    <Form.Control
                      name="idUserDelivery"
                      value={idUserDelivery}
                      type="text"
                      placeholder="Documento del Destinatario"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="nameUserDelivery">
                    <Form.Label> Nombre del Destinatario </Form.Label>
                    <Form.Control
                      name="nameUserDelivery"
                      value={nameUserDelivery}
                      type="text"
                      placeholder="Nombre del Destinatario"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="addressUserDelivery">
                    <Form.Label> Direccion del Destinatario </Form.Label>
                    <Form.Control
                      name="addressUserDelivery"
                      value={addressUserDelivery}
                      type="text"
                      placeholder="Direccion del Destinatario"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="cityUserDelivery">
                    <Form.Label> Ciudad del Destinatario </Form.Label>
                    <Form.Control
                      name="cityUserDelivery"
                      value={cityUserDelivery}
                      type="text"
                      placeholder="Ciudad del Destinatario"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Col>
          <Row className="btn-control text-center mb-3">
            <Col>
              <NavLink to={"/sends"} className="btn btn-back">
                Volver
              </NavLink>
            </Col>
            <Col>
              <Button
                type="submit"
                className="btn btn-save"
                onClick={(e) => handleSubmit(e)}
              >
                Guardar
              </Button>
            </Col>
          </Row>
        </Row>
      </Container>
    </>
  );
}
export default EditEnvio;
