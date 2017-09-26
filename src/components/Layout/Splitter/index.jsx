import React from 'react'
import BaseComponent from '../../BaseComponent';
import PropTypes from 'prop-types';

export default class Splitter extends BaseComponent {
    constructor(...args) {
        super(...args);
        // properties
        this.baseClass = 'splitter';
    }

    componentDidMount() {
        console.log(this.props.children)
    }

    mouseOver(e) {
        console.log('mouseover');
    }

    onMouseEnter(e) {
        console.log('onMouseEnter');
    }

    onMouseLeave(e) {
        console.log('onMouseLeave');
    }

    onMousemove(e) {
        console.log('move');
    }

    onDragStart(e) {
        console.log(e);
    }

    onDragEnd(e) {
        console.log(e);
    }

    onDrag(e) {
        console.log(e);
    }

    render() {
        let {className, children, isVertical} = this.props,
            cls = this.baseClass + (`${isVertical ? ` vertical` : ' horizontal'}`);

        return (
            <div 
                onMouseOver={this.handleEvent.bind(this)}
                onMouseLeave={this.handleEvent.bind(this)}
                onMouseEnter={this.handleEvent.bind(this)}
                onMouseMove={this.handleEvent.bind(this)}
                onDragStart={this.handleEvent.bind(this)}
                onDragEnd={this.handleEvent.bind(this)}
                onDrag={this.handleEvent.bind(this)}
                {...this.props}
                className={cls}>
                </div>
        );
    }
}

Splitter.defaultProps = {
    isVertical: true,
    maxSize: '30%',
    draggable: true
};

Splitter.propTypes = {
    draggable: PropTypes.bool,
    maxSize: PropTypes.string,
    isVertical: PropTypes.bool
};