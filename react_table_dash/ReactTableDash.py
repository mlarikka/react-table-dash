# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class ReactTableDash(Component):
    """A ReactTableDash component.
ReactTableDash is a wrapper for ReactTable v6

Keyword arguments:
- id (string; optional): The ID used to identify this component in Dash callbacks.
- data (list; required): Table data
- columns (list; required): Table columns
- className (string; optional): Table class name
- defaultPageSize (number; optional): Default page size
- style (dict; optional): Styles
- showPagination (boolean; optional): Showing pagination (bool)
- showPaginationTop (boolean; optional): Showing pagination on top (bool)
- showPaginationBottom (boolean; optional): Showing pagination at bottom (bool)
- showPageSizeOptions (boolean; optional): Page size options (list of integers)
- pageSizeOptions (list; optional): Page size options
- filterable (boolean; optional): Table is filterable (true/false)"""
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, data=Component.REQUIRED, columns=Component.REQUIRED, className=Component.UNDEFINED, defaultPageSize=Component.UNDEFINED, style=Component.UNDEFINED, showPagination=Component.UNDEFINED, showPaginationTop=Component.UNDEFINED, showPaginationBottom=Component.UNDEFINED, showPageSizeOptions=Component.UNDEFINED, pageSizeOptions=Component.UNDEFINED, filterable=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'data', 'columns', 'className', 'defaultPageSize', 'style', 'showPagination', 'showPaginationTop', 'showPaginationBottom', 'showPageSizeOptions', 'pageSizeOptions', 'filterable']
        self._type = 'ReactTableDash'
        self._namespace = 'react_table_dash'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'data', 'columns', 'className', 'defaultPageSize', 'style', 'showPagination', 'showPaginationTop', 'showPaginationBottom', 'showPageSizeOptions', 'pageSizeOptions', 'filterable']
        self.available_wildcard_properties =            []

        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}

        for k in ['data', 'columns']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(ReactTableDash, self).__init__(**args)
