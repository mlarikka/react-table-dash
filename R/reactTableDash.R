# AUTO GENERATED FILE - DO NOT EDIT

reactTableDash <- function(id=NULL, data=NULL, columns=NULL, className=NULL, defaultPageSize=NULL, style=NULL, showPagination=NULL, showPaginationTop=NULL, showPaginationBottom=NULL, showPageSizeOptions=NULL, pageSizeOptions=NULL, filterable=NULL) {
    
    props <- list(id=id, data=data, columns=columns, className=className, defaultPageSize=defaultPageSize, style=style, showPagination=showPagination, showPaginationTop=showPaginationTop, showPaginationBottom=showPaginationBottom, showPageSizeOptions=showPageSizeOptions, pageSizeOptions=pageSizeOptions, filterable=filterable)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'ReactTableDash',
        namespace = 'react_table_dash',
        propNames = c('id', 'data', 'columns', 'className', 'defaultPageSize', 'style', 'showPagination', 'showPaginationTop', 'showPaginationBottom', 'showPageSizeOptions', 'pageSizeOptions', 'filterable'),
        package = 'reactTableDash'
        )

    structure(component, class = c('dash_component', 'list'))
}
