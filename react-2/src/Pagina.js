import React, {Component} from "react";
import Nav from "./componentes/Nav";
import ActionMenu from "./componentes/ActionMenu";
import Tabla from "./componentes/Tabla";
import Modal from "./componentes/Modal";

class Pagina extends Component {    //en un componebte de Class siampre //hay que ponerle render esto seria como nuestra funcion 
    constructor (props){
        super(props);
        this.state = {
            mostrarModal: false,
        };
    }
    
    cambiarModal = () => {
        this.setState({ mostrarModal: !this.state.mostrarModal });
    };

    render(){ //el metodo render siempre debe ir a ultimas
        return(  
            <>     
                <div className="container">
                    <Nav/>
                    <ActionMenu cambiarModal={this.cambiarModal} />
                    <Tabla/>
                    {this.state.mostrarModal && <Modal cambiarModal={this.cambiarModal} />}
                </div>
            </>
        );
    }
}

export default Pagina;
