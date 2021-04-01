import React from "react";
import ModalHeadel from "./ModalHeadel";
import ModalFooter from "./ModalFooter";
import Select from "../Select";
import Input from "../Input";
import "./Modal.css";


const tiposMascotas =[
    { valor:"Perro", etiqueta:"Perro"},
    { valor:"Gato", etiqueta:"Gato"},
    { valor:"Pájaro", etiqueta:"Pájaro"},
    { valor:"Reptil", etiqueta:"Reptil"},
    { valor:" hamster", etiqueta:" hamster"},
    { valor:"huron", etiqueta:"huron" },
    { valor:"Otro", etiqueta:"Otro"},
];

const tiposPropietarios = [
        { valor:"Juan", etiqueta:"Juan"},
        { valor:"Andrea", etiqueta:"Andrea"},
        { valor:"Carlos", etiqueta:"Carlos"},
        { valor:"Karla", etiqueta:"Karla"},
        { valor:" Jose", etiqueta:" Jose"},
        { valor:"Mary", etiqueta:"Mary" },
        { valor:"Jorge", etiqueta:"Jorge" },
        { valor:"Mario", etiqueta:"Mario" },
        { valor:"Brayan", etiqueta:"Brayan"},
        { valor:"Jhon", etiqueta:"Jhon"},
        { valor:"Valery", etiqueta:"Valery"},
    
];

function Modal({ cambiarModal = () => {} }) {
    return(
        <>
        <div className="modal" id="exampleModalCenter" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <ModalHeadel cambiarModal={cambiarModal} />
                            <div className="modal-body">
                                    <form  id="form">
                                                <Select options ={tiposMascotas} nombreCampo="Tipo animal" />
                                            <div/>
                                        <div/>
                                        <div className="form-row">
                                            <div className="col">
                                                <Input tipo="text" nombreCampo="nombre" />
                                            </div>
                                                <div className="col">
                                                    <Select options ={tiposPropietarios} nombreCampo="Propietario" />
                                                </div>
                                        </div>
                                    </form>
                            </div>   
                            <ModalFooter  cambiarModal={cambiarModal} />
                    </div>
                </div>
        </div>
        <div className="modal-backdrop fade show"></div>
    </>
        
    );
}

export default Modal;