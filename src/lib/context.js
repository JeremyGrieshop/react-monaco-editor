/**
 * Monaco React Context provides the global monaco object
 * via React Context.
 */

import React from "react";

export const MonacoContext = React.createContext();

/* export a HOC for consumers */
export const withMonacoContext = (Component) => (props) => 
    <MonacoContext.Consumer>
        { monaco => <Component monaco={monaco} {...props} /> }
    </MonacoContext.Consumer>;
