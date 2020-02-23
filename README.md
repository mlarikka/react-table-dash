# ReactTableDash

## Installation

```
pip install react-table-dash
```

## Usage

Example 

```
import dash
from dash.dependencies import Input, Output, State
import dash_html_components as html
import numpy as np
import pandas as pd
import dash_bootstrap_components as dbc
import dash_core_components as dcc
from react_table_dash import ReactTableDash
from datetime import datetime

app = dash.Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])
app.config.suppress_callback_exceptions = True


def random_data(n_cols, n_rows):
    # Generate dummy data
    alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    df = pd.DataFrame({alphabets[i]: np.random.rand(n_rows).tolist() for i in range(n_cols)})
    if n_cols > 1:
        df.loc[:, 'B'] = df.B - 0.5

    data = df.to_dict(orient='records')
    columns = [{'Header': 'Column {}'.format(c), 'accessor': c} for c in alphabets[:n_cols]]

    # Add custom column
    columns.append({
        'Header': 'Progress A',
        'accessor': 'A',
        'customType': {
            'type': 'progressBar',
            'thresholds': [0.2, 0.4, 0.6, 0.8],
            'colors': ['#2dc937', '#99c140', '#e7b416', '#db7b2b', '#cc3232']
        }
    })

    columns.append({
        'Header': 'Decimal A',
        'accessor': 'A',
        'customType': {
            'type': 'decimal',
            'decimalPlaces': 2
        }
    })

    columns.insert(0, {
        'Header': 'Details',
        'width': 65,
        'customType': {'type': 'button', 'label': 'Details'}
    })

    return data, columns

col_slider = dbc.FormGroup([
    dbc.Label("Columns", html_for="cols"),
    dcc.Slider(id="n_cols", min=1, max=10, step=1, value=3),
])

row_slider = dbc.FormGroup([
    dbc.Label("Rows", html_for="rows"),
    dcc.Slider(id="n_rows", min=100, max=10000, step=100, value=1000),
])

refresh_btn = dbc.Button('Refresh', id='refresh-btn', size='sm')
dev_btn = dbc.Button('Dev', id='dev-btn', size='sm')

app.layout = html.Div([
        dbc.CardDeck([
            dbc.Card([
                dbc.CardBody([
                    col_slider,
                    row_slider,
                    refresh_btn,
                    dev_btn
                ])
            ]),
            dbc.Card([
                dbc.CardHeader([
                    'Info'
                ]),
                dbc.CardBody([
                    html.Div(id='output'),
                    html.Div(id='output2')
                ])
            ])
        ]),
    dbc.Row([
        dbc.Col([
            html.Div(id='tbl-container')
        ], width=12),
    ], id='main-container'),
])


@app.callback(Output('output', 'children'),
            [Input('refresh-btn', 'n_clicks')],
            [State('n_cols', 'value'),
             State('n_rows', 'value')])
def output(n_clicks, n_cols, n_rows):
    return 'columns = {}, rows = {}'.format(n_cols, n_rows)


@app.callback(Output('output2', 'children'),
            [Input('tbl', 'click')])
def output2(tbl_value):
    return 'Clicked row index: {}'.format(tbl_value)

@app.callback(Output('tbl-container', 'children'),
            [Input('refresh-btn', 'n_clicks')],
            [State('n_cols', 'value'),
             State('n_rows', 'value')])
def load_table(n_clicks, n_cols, n_rows):
    data, columns = random_data(n_cols, n_rows)
    text = 'columns = {}, rows = {}'.format(n_cols, n_rows)
    tbl = ReactTableDash(
        id='tbl',
        data=data,
        columns=columns,
        defaultPageSize=100,
        className="-striped -highlight",
        showPagination=True,
        showPaginationTop=False,
        showPaginationBottom=True,
        showPageSizeOptions=True,
        pageSizeOptions=[10, 20, 25, 50, 100, 500],
        style={'height': '400px'},
        filterable=True
    )

    return [
        html.Div(tbl)
    ]

@app.callback([Output('tbl', 'data'), Output('tbl', 'columns')],
            [Input('dev-btn', 'n_clicks')],
            [State('n_cols', 'value'),
             State('n_rows', 'value')])
def load_data(n_clicks, n_cols, n_rows):
    data, columns = random_data(n_cols, n_rows)
    return data, columns

if __name__ == '__main__':
    app.run_server(debug=True)
```