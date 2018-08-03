import React from 'react';
import DesignationForm from './DesignationForm';
import constants from '../../constants/Constants';

export default class DesignationFormWrapper extends React.Component {
  constructor() {
    super();
    this.state = { validateDesignation: { DesignationName : false } };
    this.saveHandler = this.saveHandler.bind(this);
  }
  checkValidations() {
    var inputs = document.querySelectorAll('input[name]');
    const currentState = this.state.validateDesignation;
    var isValid = false;
    inputs.forEach(input => {
      if(input.value === '') {
        currentState[input.name] = true;
        isValid = true;
      }

      return isValid;
    });

    this.setState({ validateDesignation : currentState });
    return isValid;
  }
  saveHandler(e) {
    e.preventDefault();
    if (!this.checkValidations()) {
      this.refs.form.save();
    }
  }
  render() {
    return (
      <div>
          <div aria-hidden='false' role='dialog' className='slds-modal slds-fade-in-open'>
              <div className='slds-modal__container'>
                  <div className='slds-modal__header'>
                      <h4 className='slds-text-heading--medium header'>{ constants.EDIT_DESIGNATION }</h4>
                  </div>
                  <div className='slds-modal__content'>
                      <DesignationForm ref='form' designation={ this.props.designation } validateDesignation={this.state.validateDesignation} />
                  </div>
                  <div className='slds-modal__footer'>
                      <button className='btn btn-primary slds-button slds-button--neutral slds-button--brand' onClick={ this.saveHandler }>{ constants.UPDATE }</button>
                      <button className='btn MarginLeft1Per' onClick={ this.props.onCancel }>{ constants.CANCEL }</button>
                  </div>
              </div>
          </div>
          <div className='slds-modal-backdrop slds-modal-backdrop--open'></div>
      </div>
    );
  }
}