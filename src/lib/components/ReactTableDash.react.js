import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactTable from "react-table-6";

import 'react-table-6/react-table.css'

/**
 * ReactTableDash is a wrapper for ReactTable v6
 */
export default class ReactTableDash extends Component {

    constructor(props) {
        super(props);
        this.thresholdColor = this.thresholdColor.bind(this);
        this.progressBarCell = this.progressBarCell.bind(this);
        this.decimalCell = this.decimalCell.bind(this);
        this.buttonClicked = this.buttonClicked.bind(this);
      }

    // Return color code given value, list of thresholds and list of colors
    // length(colors) = length(thresholds) + 1 
    thresholdColor(value, thresholds, colors) {
        for (var i = 0; i < thresholds.length; i++) {
            if (value < thresholds[i]) {
                return colors[i];
            }
        }
        return colors[colors.length-1];
    }

    // Return progress bar cell based on row value
    // Value expected to be between 0 and 1
    progressBarCell(row) {
        var thresholds = row.column.customType.thresholds;
        var colors = row.column.customType.colors;
        return (
        <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#dadada',
            borderRadius: '2px'
        }}>
            <div style={{
                width: `${row.value * 100}%`,
                height: '100%',
                backgroundColor: this.thresholdColor(row.value, thresholds, colors),
                borderRadius: '2px',
                transition: 'all .2s ease-out'
                }}
            />
        </div>
    );
    }

    decimalCell(row) {
        return (
            <div>
                {row.value.toFixed(row.column.customType.decimalPlaces)}
            </div>
        )
    }

    buttonClicked(label, data) {
        this.props.setProps({click: {label: label, data: data._index }})
    }

    render() {
        var columns = this.props.columns;
        for(let i = 0; i < columns.length; i++){
            if ('decimals' in columns[i]) {
                columns[i].Cell = row => (this.customCell(row));
            }
            else {
                if ('customType' in columns[i] && 'type' in columns[i].customType) {
                    if (columns[i].customType.type === 'progressBar') {
                        columns[i].Cell = row => (this.progressBarCell(row));
                    }
                    else if (columns[i].customType.type === 'decimal') {
                        columns[i].Cell = row => (this.decimalCell(row));
                    }
                    else if (columns[i].customType.type === 'button') {
                        columns[i].Cell = ({ row }) => (
                            <button 
                                className='react-table-button' 
                                value={columns[i].customType.label} 
                                onClick={() => this.buttonClicked(columns[i].customType.label, row)}>
                                {columns[i].customType.label}
                            </button>
                        )
                    }
                }
            }                     
         }


        return (
            <div id={this.props.id}>
                <ReactTable
                    data={this.props.data}
                    columns={columns}
                    defaultPageSize={this.props.defaultPageSize}
                    style={this.props.style}
                    className={this.props.className}
                    showPagination={this.props.showPagination}
                    showPaginationTop={this.props.showPaginationTop}
                    showPaginationBottom={this.props.showPaginationBottom}
                    showPageSizeOptions={this.props.showPageSizeOptions}
                    pageSizeOptions={this.props.pageSizeOptions}
                    filterable={this.props.filterable}
                />
            </div>
        );
    }
}

ReactTableDash.defaultProps = {};

ReactTableDash.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,
    
    /**
     * Table data
     */
    data: PropTypes.array.isRequired,
    
    /**
     * Table columns
     */
    columns: PropTypes.array.isRequired,

    /**
     * Table class name
     */
    className: PropTypes.string,

    /**
     * Default page size
     */
    defaultPageSize: PropTypes.number,

    /**
     * Styles
     */
    style: PropTypes.object,
    
    /**
     * Showing pagination (bool)
     */
    showPagination: PropTypes.bool,

    /**
     * Showing pagination on top (bool)
     */
    showPaginationTop: PropTypes.bool,
    
    /**
     * Showing pagination at bottom (bool)
     */
    showPaginationBottom: PropTypes.bool,

    /**
     * Page size options (list of integers)
     */
    showPageSizeOptions: PropTypes.bool,

    /**
     * Page size options
     */
    pageSizeOptions: PropTypes.array,

    /**
     * Table is filterable (true/false)
     */
    filterable: PropTypes.bool,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func
};

