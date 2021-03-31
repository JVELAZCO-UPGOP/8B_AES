import React from "react";

function Modal() {
    return (
        <div classNameName="modal fade" id="exampleModalCenter" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div classNameName="modal-dialog modal-dialog-centered" role="document">
                        <div classNameName="modal-content">
                                <div classNameName="modal-header">
                                    <h5 classNameName="modal-title" id="exampleModalCenterTitle">Nueva Mascota</h5>
                                    <button type="button" classNameName="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                    <div classNameName="modal-body">
                                                <form  id="form">
                                                <input type="hidden" id="indice" ></input>
                                                    <div classNameName="form-row">
                                                        <div classNameName="col">
                                                            <select id="tipo" classNameName="form-control">
                                                                <option>Tipo animal</option>
                                                                <option>Perro</option>
                                                                <option>Gato</option>
                                                                <option>Pájaro</option>
                                                                <option>Reptiles</option>
                                                                <option>hamsters</option>
                                                                <option>hurones</option>
                                                                <option>Otro</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="col">
                                                            <input type="text" id="nombre" name="nombre" className="form-control" placeholder="Nombre">
                                                                </input>
                                                        </div>
                                                        <div className="col">
                                                            <select className="form-control" id="propietarios">
                                                                <option>Propietarios</option>
                                                                <option>Juan</option>
                                                                <option>Andrea</option>
                                                                <option>Carlos</option>
                                                                <option>Karla</option>
                                                                <option>Jose</option>
                                                                <option>Mary</option>
                                                                <option>Jorge</option>
                                                                <option>Mario</option>
                                                                <option>Brayan</option>
                                                                <option>Jhon</option>
                                                                <option>Valery</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </form>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal" id="btn-eliminar">Cerrar</button>
                                                <button type="button" className="btn btn-primary" data-dismiss="modal" id="btn-guardar">Crear</button>
                                            </div>
                                    </div>
                            </div>
                    </div>
            </div>
    );
}

export default Modal;