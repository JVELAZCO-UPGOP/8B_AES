import React from "react";
import "./Alert.css";


function Alert(props) {
    return( 
        <div>
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Oops Bitch xp!</strong>  Le falto llenar datos.... ←_←
                        <button 
                        type="button" 
                        className="close" 
                        data-dismiss="alert" 
                        aria-label="Close"
                        onClick={props.alertSwitch}
                        >
                        <span aria-hidden="true">&times;</span>
                        </button>
                </div>
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Oops Bitch xp!</strong>  Algo hizo mal, Vuelva a intentarlo ¯\(°_o)/¯.
                    <button
                    type="button"
                    className="close" 
                    data-dismiss="alert" 
                    aria-label="Close"
                    onClick={props.alertSwitch}
                    >
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div> 
        </div>
    );
}

export default Alert;
