/* eslint no-magic-numbers: 0 */
import React, {Component} from 'react';

import { ReactTableDash } from '../lib';

class App extends Component {

    constructor() {
        super();
        this.state = {
            value: '',
            data: null,
            columns: null,
            style: {'height': '400px'}
        };
        this.setProps = this.setProps.bind(this);
        this.prepData = this.prepData.bind(this);

    }

    componentDidMount() {
        this.prepData();
    }

    setProps(newProps) {
        console.log(newProps);
    }

    prepData() {
        const colNames = ['A', 'B', 'C'];
        const nRows = 50
        var data = []
        for (var i = 0; i < nRows; i++) {
            var obj = {};
            for (var j = 0; j < colNames.length; j++) {
                obj[colNames[j]] = Math.random();
            }
            data.push(obj);
        }
        
        var cols = []
        for (var k = 0; k < colNames.length; k++) {
            var colObj = {};
            colObj.Header = colNames[k]
            colObj.accessor = colNames[k]
            cols.push(colObj);
        }

        cols.push({
            'Header': 'Progress A',
            'accessor': 'A',
            'customType': {
                'type': 'progressBar',
                'thresholds': [0.33, 0.66],
                'colors': ['#99c140', '#e7b416', '#db7b2b']
            }
        })

        cols.push({
            'Header': 'Action',
            'customType': {
                'type': 'button',
                'label': 'click'
            }
        })

        cols.push({
            'Header': 'Decimal A',
            'accessor': 'A',
            'customType': {
                'type': 'decimal',
                'decimalPlaces': 3
            }
        })

        this.setState({'data': data, 'columns': cols});

    }

    render() {
        return (
            <div>
                { !this.state.data ? 'empty' : 
                <ReactTableDash
                    setProps={this.setProps}
                    {...this.state}
                />}
            </div>
            
        )
    }
}

export default App;
