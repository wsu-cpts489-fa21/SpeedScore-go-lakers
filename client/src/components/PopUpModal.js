/*************************************************************************
 * File: PopUpModal.js
 * This file defines a React component that implements a pop up dialog.
 ************************************************************************/

 import React from 'react';

/*************************************************************************
 * @class PopUpModal 
 * @Desc 
 * This React component is a pop up dialog.
 *************************************************************************/
 class PopUpModal extends React.Component {

    render() {
        let choicesTemplate = [];
        for(let key in this.props.choices){
            choicesTemplate.push(<button type="button" className="btn btn-primary" key={key} onClick={this.props.choices[key]}>{key}</button>)
        }
        return (
            <div
                className="modal fade pop-up-modal"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div id="popUpModalContent" className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Pop Up Modal
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={this.props.choices[Object.keys(this.props.choices).pop()]}
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                            <div className="modal-body">
                                <form>
                                    <div id="text" className="form-group">
                                        {this.props.text}
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                {choicesTemplate}
                            </div>
                    </div>
                </div>
            </div>

        )
    }

}

export default PopUpModal;