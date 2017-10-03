import React from 'react';
import BaseComponent from 'components/BaseComponent';
import PropTypes from 'prop-types';

export default class Button extends BaseComponent {
    init() {
        this.baseClassName = `button`;
    }

   onClick(e) {
        const {onClicked} = this.props;

        if (onClicked) {
            onClicked(e);
        }
    }

    render() {
        const {text, type, title} = this.props;

        return (
            <button type={type} title={title} className={this.className} onClick={this.handleEvent}>{text}</button>
        );
    }
}

Button.defaultProps = {
    text: 'Button',
    type: 'button',
    title: ''
};

Button.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
    onClicked: PropTypes.func
};