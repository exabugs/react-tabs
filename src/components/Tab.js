import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';

const DEFAULT_CLASS = 'react-tabs__tab';

class Tab extends Component {
  static defaultProps = {
    className: DEFAULT_CLASS,
    disabledClassName: `${DEFAULT_CLASS}--disabled`,
    focus: false,
    id: null,
    panelId: null,
    selected: false,
    selectedClassName: `${DEFAULT_CLASS}--selected`,
  };

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
    disabled: PropTypes.bool,
    disabledClassName: PropTypes.string,
    focus: PropTypes.bool, // private
    id: PropTypes.string, // private
    panelId: PropTypes.string, // private
    selected: PropTypes.bool, // private
    selectedClassName: PropTypes.string,
    tabRef: PropTypes.func, // private
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.checkFocus();
  }

  componentDidUpdate() {
    this.checkFocus();
  }

  checkFocus() {
    if (this.props.selected && this.props.focus) {
      this.node.focus();
    }
  }

  render() {
    const {
      children,
      className,
      disabled,
      disabledClassName,
      focus, // unused
      id,
      panelId,
      selected,
      selectedClassName,
      tabRef,
      connectDragSource,
      connectDropTarget,
      isDragging,
      tabKey,
      ...attributes
    } = this.props;

    return connectDropTarget(
      connectDragSource(
        <li
          {...attributes}
          className={cx(className, {
            [selectedClassName]: selected,
            [disabledClassName]: disabled,
          })}
          ref={node => {
            this.node = node;
            if (tabRef) tabRef(node);
          }}
          role="tab"
          id={id}
          aria-selected={selected ? 'true' : 'false'}
          aria-disabled={disabled ? 'true' : 'false'}
          aria-controls={panelId}
          tabIndex={selected ? '0' : null}
        >
          {children}
        </li>,
      ),
    );
  }
}

const tabSource = {
  beginDrag(_props, monitor, component) {
    const { decoratedComponentInstance: { props } } = component;
    console.log(`beginDrag tabIndex:${props.tabIndex} id:${props.id} key:${props.key}`);
    console.log(props.selectedClassName);
    console.log(props.checkFocus);
    console.log(props.focus);
    console.log(props.selected);
    console.log(props.id);
    console.log(props.key);
    return {
      id: props.id,
      // originalIndex: props.findTab(props.id).index,
      originalIndex: props.tabIndex,
    };
  },

  endDrag(_props, monitor, component) {
    const { decoratedComponentInstance: { props } } = component;
    const { id: droppedId, originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop();

    console.log('endDrag');

    if (!didDrop) {
      // props.moveTab(droppedId, originalIndex);
      console.log('  -- !didDrop');
    }
  },
};

const tabTarget = {
  canDrop() {
    console.log('canDrop');
    return false;
  },

  hover(props, monitor, component) {
    const { decoratedComponentInstance } = component;
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;

    if (draggedId !== overId) {
      // const { index: overIndex } = props.findTab(overId);
      // props.moveTab(draggedId, overIndex);
      console.log('  -- draggedId !== overId');
    }
  },
};

Tab = DropTarget(ItemTypes.TAB, tabTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(Tab);

Tab = DragSource(ItemTypes.TAB, tabSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(Tab);

export default Tab;
